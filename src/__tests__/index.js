import { AppRegistry } from 'react-native';
import init, { render } from '..';
import App from '../components/App';

describe('index.js', () => {
  test("Component get's registered", () => {
    const spy = jest.spyOn(AppRegistry, 'registerComponent');
    init();

    const [name, func] = spy.mock.calls[0];

    expect(name).toBe('reactnativeskeleton');
    expect(typeof func).toBe('function');
  });

  test('Render returns the app', () => {
    const app = render();

    expect(app).toBe(App);
  });
});
