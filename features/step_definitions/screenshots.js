const { Then } = require('cucumber');
const { exec } = require('child-process-async');
const { ensureDir } = require('fs-extra');

Then('take a screenshot called {string}', (fileName) => {
  const toPath = string =>
    string
      .toLowerCase()
      .split(' ')
      .join('_');

  const feature = global.feature.name;
  const { pickle } = global.scenario;
  const scenario = toPath(pickle.name);

  const fullPath = `features/screenshots/${feature}.feature/${scenario}`;

  return ensureDir(fullPath).then(() =>
    exec(`xcrun simctl io booted screenshot ${fullPath}/${fileName}.png`));
});
