import React from 'react';
import { Alert } from 'react-native';
import Renderer, { act } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppProvider, useApp } from '../src/store/AppStore';
import { Tickets } from '../src/screens/Tickets';
import { Cart } from '../src/screens/Food';
import { Chat } from '../src/screens/Explore';
import { Button, Counter } from '../src/components/ui';
let store: ReturnType<typeof useApp>;
function Probe() {
  store = useApp();
  return null;
}
let root: Renderer.ReactTestRenderer;
const navigation = {
  replace: jest.fn(),
  goBack: jest.fn(),
  reset: jest.fn(),
  navigate: jest.fn(),
};
async function mount(element: React.ReactNode) {
  await act(async () => {
    root = Renderer.create(
      <AppProvider>
        <Probe />
        {element}
      </AppProvider>,
    );
  });
}
beforeEach(async () => {
  await AsyncStorage.clear();
  jest.clearAllMocks();
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
});
afterEach(async () => {
  if (root) {
    await act(async () => root.unmount());
  }
});
test('starts empty and persists user-created data across remounts', async () => {
  await mount(null);
  expect(store!.state.tickets).toEqual([]);
  expect(store!.state.orders).toEqual([]);
  await act(async () => {
    await store!.update(s => ({ ...s, visitorName: 'Alex' }));
  });
  await act(async () => root.unmount());
  await mount(null);
  expect(store!.state.visitorName).toBe('Alex');
});
test('ticket selection creates one unique QR identity per guest', async () => {
  await mount(
    <Tickets
      navigation={navigation as any}
      route={{ params: { initial: true } } as any}
    />,
  );
  const counters = root.root.findAllByType(Counter);
  await act(async () => {
    counters[0].props.onChange(2);
    counters[1].props.onChange(1);
  });
  const confirm = root.root
    .findAllByType(Button)
    .find(b => b.props.title.startsWith('Confirm Tickets'))!;
  expect(confirm.props.title).toContain('$74.70');
  await act(async () => confirm.props.onPress());
  expect(store!.state.tickets).toHaveLength(3);
  expect(new Set(store!.state.tickets.map(t => t.id)).size).toBe(3);
  expect(navigation.replace).toHaveBeenCalledWith(
    'TicketSuccess',
    expect.anything(),
  );
});
test('checkout preserves quantities and notes and clears the cart atomically', async () => {
  await mount(<Cart navigation={navigation as any} route={{} as any} />);
  await act(async () => {
    await store!.update(s => ({
      ...s,
      cart: [{ id: 'line', dishId: 'wrap', quantity: 2, note: 'No cucumber' }],
    }));
  });
  const checkout = root.root
    .findAllByType(Button)
    .find(b => b.props.title.startsWith('Save Order'))!;
  await act(async () => checkout.props.onPress());
  expect(store!.state.cart).toEqual([]);
  expect(store!.state.orders[0]).toMatchObject({
    total: 17,
    status: 'Saved locally',
    minutes: 12,
    items: [{ quantity: 2, note: 'No cucumber', dishId: 'wrap', id: 'line' }],
  });
});
test('chat rotates supplied answers and retains history', async () => {
  await mount(<Chat />);
  const question = root.root.findByProps({ testID: 'chat-question-0' });
  await act(async () => question.props.onPress());
  await act(async () => question.props.onPress());
  expect(store!.state.chat).toHaveLength(2);
  expect(store!.state.chat[0].answer).not.toBe(store!.state.chat[1].answer);
  expect(store!.state.answerCounts[0]).toBe(2);
});
test('failed persistence does not publish unsaved state', async () => {
  await mount(null);
  (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
    new Error('Disk full'),
  );
  await act(async () => {
    await expect(
      store!.update(s => ({ ...s, visitorName: 'Unsaved' })),
    ).rejects.toThrow('Disk full');
  });
  expect(store!.state.visitorName).toBe('');
  expect(Alert.alert).toHaveBeenCalledWith(
    'Could not save',
    expect.any(String),
  );
});

test('queued writes retain independent user actions', async () => {
  await mount(null);
  await act(async () => {
    await Promise.all([
      store!.update(s => ({ ...s, visitorName: 'Visitor' })),
      store!.update(s => ({ ...s, mapsAddress: 'Visitor entered address' })),
    ]);
  });
  expect(store!.state.visitorName).toBe('Visitor');
  expect(store!.state.mapsAddress).toBe('Visitor entered address');
});
