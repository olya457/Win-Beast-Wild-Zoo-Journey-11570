import { NativeStackScreenProps } from '@react-navigation/native-stack';
export type RootStackParams = {
  Main: undefined;
  Onboarding: undefined;
  Tickets: { initial?: boolean } | undefined;
  TicketSuccess: { ids: string[] };
  Ticket: { id: string };
  Event: { id: string };
  Reservation: { eventId: string; reservationId?: string };
  ReservationSuccess: { id: string };
  Dish: { id: string };
  Cart: undefined;
  Order: { id: string; success?: boolean };
  Location: { id: string };
  Settings: undefined;
};
export type ScreenProps<T extends keyof RootStackParams> =
  NativeStackScreenProps<RootStackParams, T>;
