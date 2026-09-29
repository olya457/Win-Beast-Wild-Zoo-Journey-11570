import React, { useState } from 'react';
import { Pressable, View, useWindowDimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {
  Button,
  Card,
  Counter,
  colors,
  Label,
  money,
  Page,
  Row,
  Success,
  Title,
} from '../components/ui';
import { ScreenProps } from '../navigation/types';
import { Ticket, uid, useApp } from '../store/AppStore';
export function TicketQR({
  ticket,
  size = 110,
}: {
  ticket: Ticket;
  size?: number;
}) {
  return (
    <View
      style={{
        alignSelf: 'center',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12,
      }}
    >
      <QRCode
        value={JSON.stringify({
          v: 1,
          issuer: 'WinBeastZoo',
          id: ticket.id,
          type: ticket.kind,
          issued: ticket.createdAt,
        })}
        size={size}
        color="#0c031b"
        backgroundColor="white"
      />
    </View>
  );
}
export function Tickets({ navigation, route }: ScreenProps<'Tickets'>) {
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [busy, setBusy] = useState(false);
  const { update } = useApp();
  const total = (adult * 2990 + child * 1490) / 100;
  const finish = () =>
    route.params?.initial ? navigation.replace('Main') : navigation.goBack();
  const confirm = async () => {
    if (busy || !total) {
      return;
    }
    setBusy(true);
    try {
      const list: Ticket[] = [
        ...Array.from({ length: adult }, () => ({
          id: uid(),
          kind: 'Adult' as const,
          price: 29.9,
          createdAt: new Date().toISOString(),
        })),
        ...Array.from({ length: child }, () => ({
          id: uid(),
          kind: 'Child' as const,
          price: 14.9,
          createdAt: new Date().toISOString(),
        })),
      ];
      await update(s => ({ ...s, tickets: [...s.tickets, ...list] }));
      navigation.replace('TicketSuccess', { ids: list.map(t => t.id) });
    } finally {
      setBusy(false);
    }
  };
  return (
    <Page
      title="🎟️ Select Tickets"
      back={route.params?.initial ? undefined : finish}
    >
      <Label muted>Choose tickets or continue without them</Label>
      <View style={{ height: 15 }} />
      {[
        {
          name: 'Adult',
          subtitle: 'Ages 13 and above',
          price: 29.9,
          value: adult,
          set: setAdult,
          emoji: '👨',
        },
        {
          name: 'Child',
          subtitle: 'Ages 3–12',
          price: 14.9,
          value: child,
          set: setChild,
          emoji: '👧',
        },
      ].map(t => (
        <Card key={t.name}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Label style={{ fontSize: 28 }}>{t.emoji}</Label>
            <View style={{ flex: 1 }}>
              <Title small>{t.name} Ticket</Title>
              <Label muted>{t.subtitle}</Label>
            </View>
            <Label style={{ color: colors.green, fontWeight: '900' }}>
              {money(t.price)}
            </Label>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              rowGap: 12,
              alignItems: 'center',
            }}
          >
            <Label muted>Quantity</Label>
            <Counter value={t.value} onChange={t.set} max={20} />
          </View>
        </Card>
      ))}
      <Card>
        <Label muted>ORDER SUMMARY</Label>
        {adult > 0 && (
          <Row label={`Adult × ${adult}`} value={money(adult * 29.9)} />
        )}
        {child > 0 && (
          <Row label={`Child × ${child}`} value={money(child * 14.9)} />
        )}
        <Row label="Total" value={money(total)} />
      </Card>
      <Button
        title={`Confirm Tickets — ${money(total)}`}
        busy={busy}
        disabled={!total}
        onPress={() => {
          confirm().catch(() => {});
        }}
      />
      <Pressable onPress={finish} style={{ alignItems: 'center', padding: 15 }}>
        <Label muted>Continue Without Tickets</Label>
      </Pressable>
    </Page>
  );
}
export function TicketSuccess({
  navigation,
  route,
}: ScreenProps<'TicketSuccess'>) {
  const { state } = useApp();
  const tickets = state.tickets.filter(t => route.params.ids.includes(t.id));
  return (
    <Page>
      <Success
        title="Tickets Registered!"
        subtitle="Your tickets are saved on this device"
      >
        <Card>
          <Label style={{ color: colors.green }}>WIN BEAST ZOO</Label>
          <Title small>Admission Tickets</Title>
          <Row label="Guests" value={String(tickets.length)} />
          <Row
            label="Total"
            value={money(tickets.reduce((a, t) => a + t.price, 0))}
          />
          {tickets[0] && <TicketQR ticket={tickets[0]} />}
          <Label muted style={{ textAlign: 'center' }}>
            Open Profile to view each guest’s QR code
          </Label>
        </Card>
        <Button
          title="Explore the Zoo →"
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: 'Main' }] })
          }
        />
      </Success>
    </Page>
  );
}
export function TicketDetail({ navigation, route }: ScreenProps<'Ticket'>) {
  const { state } = useApp();
  const ticket = state.tickets.find(t => t.id === route.params.id);
  const { width } = useWindowDimensions();
  return (
    <Page back={() => navigation.goBack()}>
      {ticket && (
        <View style={{ paddingTop: 45 }}>
          <Card>
            <Label style={{ color: colors.green }}>WIN BEAST ZOO</Label>
            <Title>{ticket.kind} Ticket</Title>
            <Row label="Quantity" value="1 guest" />
            <Row label="Ticket value" value={money(ticket.price)} />
            <Label muted>
              Registered on {new Date(ticket.createdAt).toLocaleDateString()}
            </Label>
            <View style={{ paddingVertical: 25 }}>
              <TicketQR ticket={ticket} size={Math.min(width - 120, 260)} />
            </View>
            <Label muted style={{ textAlign: 'center' }}>
              Show this QR code to the entrance staff
            </Label>
          </Card>
        </View>
      )}
    </Page>
  );
}
