const { Then } = require('cucumber');
const { exec } = require('child-process-async');
const { ensureFile, exists, move } = require('fs-extra');
const looksSame = require('looks-same');
const Jimp = require('jimp');

function getScreenshotPaths(fileName) {
  const toPath = string =>
    string
      .toLowerCase()
      .split(' ')
      .join('_');

  const feature = global.feature.name;
  const { pickle } = global.scenario;
  const scenario = toPath(pickle.name);

  return `features/screenshots/${feature}/${scenario}/${fileName}.png`;
}

function saveScreenshot(fullPath) {
  return ensureFile(fullPath).then(() =>
    exec(`xcrun simctl io booted screenshot ${fullPath}`));
}

function getExistingScreenshot(fullPath) {
  return exists(fullPath);
}

function getImageBufferForDiff(imgPath) {
  // Adjust until can't see the status bar. As the time and battery on it
  // makes the screenshot tests always fail
  const offset = 30;

  return new Promise((resolve, reject) =>
    Jimp.read(imgPath).then(image =>
      image
        .crop(0, offset, image.bitmap.width, image.bitmap.height - offset)
        .getBuffer('image/png', (err, buffer) => {
          if (err) {
            reject(err);
          } else {
            // Use this to check the status bar is not visible
            // image.write(`tmp/${imgPath}`);
            resolve(buffer);
          }
        })));
}

function getImageBuffersForDiff(originalScreenshot, newScreenshot) {
  return Promise.all([
    getImageBufferForDiff(originalScreenshot),
    getImageBufferForDiff(newScreenshot),
  ]);
}

function getIsDiff(originalScreenshot, newScreenshot) {
  return getImageBuffersForDiff(originalScreenshot, newScreenshot).then(([originalImg, newImg]) =>
    new Promise((resolve, reject) => {
      looksSame(originalImg, newImg, (err, equal) => {
        if (err) {
          reject(err);
        } else {
          resolve(!equal);
        }
      });
    }));
}

function compareAndOverwrite(fullPath) {
  const tempPath = `tmp/${fullPath}`;

  return saveScreenshot(tempPath).then(() =>
    getIsDiff(fullPath, tempPath).then((isDiff) => {
      if (!isDiff) return Promise.resolve();

      return move(tempPath, fullPath, { overwrite: true }).then(() => {
        throw new Error('Screenshots are different, check git diff to see and accept');
      });
    }));
}

Then('take a screenshot called {string}', (fileName) => {
  const fullPath = getScreenshotPaths(fileName);

  return saveScreenshot(fullPath);
});

Then('the current screen matches the {string} screenshot', (fileName) => {
  const fullPath = getScreenshotPaths(fileName);

  return getExistingScreenshot(fullPath).then(doesExist =>
    (doesExist ? compareAndOverwrite(fullPath) : saveScreenshot(fullPath)));
});
