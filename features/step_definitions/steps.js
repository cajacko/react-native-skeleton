const { device, element, by } = require('detox');
const { When, Then } = require('cucumber');

When('the app is reloaded', () => device.reloadReactNative());

Then(
  'an element with an id of {string} {string} visible',
  (id, conditional) => {
    switch (conditional) {
      case 'is':
        return expect(element(by.id(id))).toBeVisible();
      case 'is not':
        return expect(element(by.id(id))).toBeNotVisible();
      default:
        throw new Error('Expected conditional to be "is" or "is not"');
    }
  },
);
