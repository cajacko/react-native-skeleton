const { AfterAll, BeforeAll } = require('cucumber');
const detox = require('detox');
const packageJSON = require('../../package.json');

BeforeAll({ timeout: 60 * 1000 }, () => detox.init(packageJSON.detox));

AfterAll(() => detox.cleanup());
