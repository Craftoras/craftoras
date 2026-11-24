import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

jest.mock('socket.io-client', () => {
  return jest.fn(() => ({
    on: jest.fn(),
    emit: jest.fn(),
    off: jest.fn(),
    disconnect: jest.fn(),
  }));
});

test('renders frontend App without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
