import React from 'react';
import Renderer, { act } from 'react-test-renderer';
import { WebView } from 'react-native-webview';
import { Loader } from '../src/screens/Welcome';

test('waits for WebView animation and completes only once', async () => {
  jest.useFakeTimers();
  const onComplete = jest.fn();
  let root: Renderer.ReactTestRenderer;
  try {
    await act(async () => {
      root = Renderer.create(<Loader onComplete={onComplete} />);
    });
    act(() => jest.advanceTimersByTime(4000));
    expect(onComplete).not.toHaveBeenCalled();
    const webview = root!.root.findByType(WebView);
    act(() => {
      webview.props.onMessage({ nativeEvent: { data: 'finished' } });
      webview.props.onMessage({ nativeEvent: { data: 'finished' } });
      jest.advanceTimersByTime(12000);
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  } finally {
    await act(async () => root!.unmount());
    jest.useRealTimers();
  }
});
