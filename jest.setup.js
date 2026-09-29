const { jest } = require('@jest/globals');
jest.mock('@react-native-async-storage/async-storage', () => {
  const data = new Map();
  return {
    getItem: jest.fn(async key => data.get(key) ?? null),
    setItem: jest.fn(async (key, value) => {
      data.set(key, value);
    }),
    clear: jest.fn(async () => data.clear()),
  };
});
jest.mock('react-native-linear-gradient', () => 'LinearGradient');
jest.mock('react-native-webview', () => ({ WebView: 'WebView' }));
jest.mock('react-native-qrcode-svg', () => 'QRCode');
jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);
