import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import App from '../App.render';

describe('App.render', () => {
  test('Markup is rendered correctly', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
