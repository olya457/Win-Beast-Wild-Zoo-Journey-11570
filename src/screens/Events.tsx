import React, { useState } from 'react';
import { Alert, Pressable, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Button,
  Card,
  Counter,
  Empty,
  Field,
  Hero,
  Label,
  Page,
  Row,
  Segments,
  Success,
  Title,
} from '../components/ui';
import { events, habitats } from '../data/catalog';
import { RootStackParams, ScreenProps } from '../navigation/types';
import { uid, useApp } from '../store/AppStore';
export function Events({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParams>;
}) {
  const [tab, setTab] = useState('Events');
  const { state } = useApp();
  return (
    <Page title="Zoo Events" animationKey={tab}>
      <Segments
        items={['Events', 'My Reservations']}
        value={tab}
        onChange={setTab}
      />
      {tab === 'Events' ? (
        events.map(event => (
          <Card key={event.id} style={{ padding: 0, overflow: 'hidden' }}>
            <Hero
              image={event.image}
              title={event.name}
              subtitle={
                event.capacity === null
                  ? 'Schedule to be announced'
                  : `${Math.max(
                      0,
                      event.capacity -
                        state.reservations
                          .filter(r => r.eventId === event.id)
                          .reduce((a, r) => a + r.guests, 0),
                    )} places left`
              }
              onPress={() => navigation.navigate('Event', { id: event.id })}
            />
            <View style={{ padding: 14, gap: 12 }}>
              <Label muted style={{ fontSize: 12 }}>
                {event.description.slice(0, 105)}…
              </Label>
              <Label muted>
                📍 {habitats.find(h => h.id === event.habitat)?.name}
              </Label>
              <Button
                title="View Event →"
                secondary
                onPress={() => navigation.navigate('Event', { id: event.id })}
              />
            </View>
          </Card>
        ))
      ) : state.reservations.length ? (
        state.reservations.map(r => {
          const event = events.find(e => e.id === r.eventId)!;
          return (
            <Pressable
              key={r.id}
              onPress={() =>
                navigation.navigate('Reservation', {
                  eventId: r.eventId,
                  reservationId: r.id,
                })
              }
            >
              <Card>
                <Title small>{event.name}</Title>
                <Row
                  label={`${r.guests} guests · ${r.date || 'Date pending'}`}
                  value={r.status}
                />
                <Label muted>View details & edit →</Label>
              </Card>
            </Pressable>
          );
        })
      ) : (
        <Empty
          emoji="🎪"
          title="Your next adventure awaits"
          text="Your saved reservations will appear here."
        />
      )}
    </Page>
  );
}
export function EventDetail({ navigation, route }: ScreenProps<'Event'>) {
  const event = events.find(e => e.id === route.params.id)!;
  const { state } = useApp();
  const remaining =
    event.capacity === null
      ? null
      : Math.max(
          0,
          event.capacity -
            state.reservations
              .filter(r => r.eventId === event.id)
              .reduce((a, r) => a + r.guests, 0),
        );
  return (
    <Page back={() => navigation.goBack()}>
      <Hero image={event.image} title={event.name} height={270} />
      <Card>
        <Row
          label="Date & time"
          value={
            event.startsAt
              ? new Date(event.startsAt).toLocaleString()
              : 'To be announced'
          }
        />
        <Row
          label="Location"
          value={habitats.find(h => h.id === event.habitat)!.name}
        />
        <Row
          label="Availability"
          value={
            remaining === null ? 'Not published' : `${remaining} places left`
          }
        />
      </Card>
      <Title small>About This Event</Title>
      <Label muted>{event.description}</Label>
      <Card>
        <Label muted>
          Follow keeper instructions at all times. Children must be accompanied
          by an adult.
        </Label>
      </Card>
      <Button
        title={remaining === null ? 'Plan a Visit' : 'Reserve a Place'}
        disabled={remaining === 0}
        onPress={() =>
          navigation.navigate('Reservation', { eventId: event.id })
        }
      />
      {remaining === null && (
        <Label muted>
          Save your group and notes now. A confirmed schedule is required for an
          official booking.
        </Label>
      )}
    </Page>
  );
}
export function ReservationForm({
  navigation,
  route,
}: ScreenProps<'Reservation'>) {
  const { state, update } = useApp();
  const existing = state.reservations.find(
    r => r.id === route.params.reservationId,
  );
  const event = events.find(e => e.id === route.params.eventId)!;
  const [guests, setGuests] = useState(existing?.guests || 1);
  const [note, setNote] = useState(existing?.note || '');
  const [date, setDate] = useState(existing?.date || '');
  const [busy, setBusy] = useState(false);
  const maximum =
    event.capacity === null
      ? 99
      : Math.max(
          0,
          event.capacity -
            state.reservations
              .filter(r => r.eventId === event.id && r.id !== existing?.id)
              .reduce((a, r) => a + r.guests, 0),
        );
  const save = async () => {
    if (busy) {
      return;
    }
    setBusy(true);
    try {
      const id = existing?.id || uid();
      await update(s => ({
        ...s,
        reservations: [
          ...s.reservations.filter(r => r.id !== id),
          {
            id,
            eventId: event.id,
            guests,
            note: note.trim(),
            date: date.trim(),
            status: 'Saved locally',
          },
        ],
      }));
      navigation.replace('ReservationSuccess', { id });
    } finally {
      setBusy(false);
    }
  };
  const remove = () =>
    Alert.alert(
      'Delete reservation?',
      'This will remove the saved reservation from this device.',
      [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            update(s => ({
              ...s,
              reservations: s.reservations.filter(r => r.id !== existing?.id),
            }))
              .then(() => navigation.goBack())
              .catch(() => {});
          },
        },
      ],
    );
  return (
    <Page
      back={() => navigation.goBack()}
      title={existing ? 'Your Reservation' : 'Reserve a Place'}
    >
      <Label muted>{event.name}</Label>
      <Card>
        <Label muted>NUMBER OF GUESTS</Label>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            rowGap: 12,
            alignItems: 'center',
          }}
        >
          <Label>Guests attending</Label>
          <Counter value={guests} min={1} max={maximum} onChange={setGuests} />
        </View>
      </Card>
      <Label muted>PREFERRED VISIT DATE (OPTIONAL)</Label>
      <Field
        value={date}
        onChange={setDate}
        placeholder="Your preferred date and time"
        multiline={false}
      />
      <Label muted>NOTES (OPTIONAL)</Label>
      <Field
        value={note}
        onChange={setNote}
        placeholder="Special requests, accessibility needs, etc."
      />
      <Card>
        <Row label="Event" value={event.name} />
        <Row label="Guests" value={String(guests)} />
        <Row
          label="Schedule"
          value={event.startsAt || 'Awaiting zoo schedule'}
        />
      </Card>
      <Button
        title={existing ? 'Save Changes' : 'Save Reservation'}
        disabled={guests > maximum}
        busy={busy}
        onPress={() => {
          save().catch(() => {});
        }}
      />
      {existing && (
        <Button title="Delete Reservation" secondary onPress={remove} />
      )}
    </Page>
  );
}
export function ReservationSuccess({
  navigation,
  route,
}: ScreenProps<'ReservationSuccess'>) {
  const { state } = useApp();
  const reservation = state.reservations.find(r => r.id === route.params.id);
  const event = events.find(e => e.id === reservation?.eventId);
  return (
    <Page>
      <Success
        title="Visit Saved!"
        subtitle="Your group details are saved on this device"
      >
        <Card>
          <Row label="Event" value={event?.name || ''} />
          <Row label="Guests" value={String(reservation?.guests || 0)} />
          <Row
            label="Preferred visit"
            value={reservation?.date || 'Not specified'}
          />
          <Row label="Status" value="Awaiting zoo confirmation" />
        </Card>
        <Button
          title="Back to Events"
          onPress={() => navigation.popTo('Main')}
        />
      </Success>
    </Page>
  );
}
