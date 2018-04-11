const { Then } = require('cucumber');
const { exec } = require('child-process-async');
const { ensureFile, exists, move } = require('fs-extra');

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

function getIsDiff() {
  return Promise.resolve(false);
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
