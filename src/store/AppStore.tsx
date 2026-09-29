import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
export type Ticket = {
  id: string;
  kind: 'Adult' | 'Child';
  price: number;
  createdAt: string;
};
export type CartItem = {
  id: string;
  dishId: string;
  quantity: number;
  note: string;
};
export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  minutes: number;
  note: string;
  createdAt: string;
  status: 'Saved locally' | 'Cancelled';
};
export type Reservation = {
  id: string;
  eventId: string;
  guests: number;
  note: string;
  date: string;
  status: 'Saved locally' | 'Confirmed';
};
export type ChatMessage = { id: string; question: number; answer: string };
export type State = {
  onboarded: boolean;
  tickets: Ticket[];
  cart: CartItem[];
  orders: Order[];
  reservations: Reservation[];
  chat: ChatMessage[];
  answerCounts: number[];
  visitorName: string;
  mapsAddress: string;
};
const initial: State = {
  onboarded: false,
  tickets: [],
  cart: [],
  orders: [],
  reservations: [],
  chat: [],
  answerCounts: [0, 0, 0, 0, 0],
  visitorName: '',
  mapsAddress: '',
};
const key = '@winbeast/state/v1';
export const uid = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
const Context = createContext<{
  state: State;
  ready: boolean;
  storageError: boolean;
  retry: () => void;
  update: (fn: (s: State) => State) => Promise<void>;
}>({
  state: initial,
  ready: false,
  storageError: false,
  retry: () => {},
  update: async () => {},
});
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(initial);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const current = useRef(initial);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const hydrate = useCallback(() => {
    setStorageError(false);
    AsyncStorage.getItem(key)
      .then(raw => {
        if (raw) {
          const parsed = JSON.parse(raw);
          if (
            ![
              'tickets',
              'orders',
              'cart',
              'reservations',
              'chat',
              'answerCounts',
            ].every(field => Array.isArray(parsed[field]))
          ) {
            throw new Error('Invalid storage');
          }
          current.current = { ...initial, ...parsed };
          setState(current.current);
        }
        setReady(true);
      })
      .catch(() => setStorageError(true));
  }, []);
  useEffect(hydrate, [hydrate]);
  const update = (fn: (s: State) => State) => {
    const job = queue.current.then(async () => {
      const next = fn(current.current);
      try {
        await AsyncStorage.setItem(key, JSON.stringify(next));
        current.current = next;
        setState(next);
      } catch (error) {
        Alert.alert(
          'Could not save',
          'Please free up device storage and try again.',
        );
        throw error;
      }
    });
    queue.current = job.catch(() => {});
    return job;
  };
  return (
    <Context.Provider
      value={{ state, ready, storageError, retry: hydrate, update }}
    >
      {children}
    </Context.Provider>
  );
}
export const useApp = () => useContext(Context);
