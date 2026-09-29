import React, { useRef, useState } from 'react';
import {
  Alert,
  ImageBackground,
  Linking,
  Pressable,
  ScrollView,
  Share,
  View,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { artwork, habitats, questions } from '../data/catalog';
import {
  Button,
  Card,
  colors,
  Field,
  Hero,
  Label,
  Page,
  Title,
} from '../components/ui';
import { RootStackParams, ScreenProps } from '../navigation/types';
import { FadeIn } from '../components/FadeIn';
import { useLayout } from '../hooks/useLayout';
import { uid, useApp } from '../store/AppStore';
type Nav = { navigation: NativeStackNavigationProp<RootStackParams> };
export function ZooMap({ navigation }: Nav) {
  const { compact } = useLayout();
  const [selected, setSelected] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [width, setWidth] = useState(320);
  const location = habitats.find(h => h.id === selected);
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Page title="Zoo Map" scroll={compact}>
        <Label muted>Tap a habitat to explore · Scroll to discover more</Label>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Pressable
            onPress={() => setZoom(Math.max(1, zoom - 0.5))}
            style={{
              padding: 10,
              backgroundColor: colors.card,
              borderRadius: 12,
            }}
          >
            <Label>− Zoom</Label>
          </Pressable>
          <Pressable
            onPress={() => setZoom(Math.min(2.5, zoom + 0.5))}
            style={{
              padding: 10,
              backgroundColor: colors.card,
              borderRadius: 12,
            }}
          >
            <Label>+ Zoom</Label>
          </Pressable>
          <Label muted>{Math.round(zoom * 100)}%</Label>
        </View>
        <View
          style={{
            flex: compact ? undefined : 1,
            height: compact ? 320 : undefined,
            minHeight: 180,
            borderRadius: 18,
            overflow: 'hidden',
          }}
          onLayout={e => setWidth(e.nativeEvent.layout.width)}
        >
          <ScrollView nestedScrollEnabled>
            <ScrollView horizontal nestedScrollEnabled>
              <ImageBackground
                source={artwork.map}
                style={{
                  width: width * zoom,
                  height: (width * zoom * 1056) / 595,
                }}
              >
                {habitats.map(h => (
                  <Pressable
                    key={h.id}
                    accessibilityLabel={`Explore ${h.name}`}
                    onPress={() => setSelected(h.id)}
                    style={{
                      position: 'absolute',
                      left: `${h.x}%`,
                      top: `${h.y}%`,
                      transform: [{ translateX: -22 }, { translateY: -22 }],
                      alignItems: 'center',
                    }}
                  >
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 24,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor:
                          selected === h.id ? colors.green : '#130b26ed',
                        borderWidth: 2,
                        borderColor: colors.green,
                      }}
                    >
                      <Label style={{ fontSize: 23 }}>{h.emoji}</Label>
                    </View>
                  </Pressable>
                ))}
              </ImageBackground>
            </ScrollView>
          </ScrollView>
        </View>
        {location && (
          <FadeIn key={location.id}>
            <Card>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Title small>
                  {location.emoji} {location.name}
                </Title>
                <Pressable
                  accessibilityLabel="Close location"
                  onPress={() => setSelected(null)}
                  style={{ marginLeft: 'auto', padding: 5 }}
                >
                  <Label>×</Label>
                </Pressable>
              </View>
              <Label style={{ color: colors.green }}>
                {location.kind} Zone
              </Label>
              <Label muted>{location.description.slice(0, 125)}…</Label>
              <Button
                title="View Details & Directions →"
                onPress={() =>
                  navigation.navigate('Location', { id: location.id })
                }
              />
            </Card>
          </FadeIn>
        )}
      </Page>
    </View>
  );
}
export function LocationDetail({ navigation, route }: ScreenProps<'Location'>) {
  const h = habitats.find(l => l.id === route.params.id)!;
  const { state } = useApp();
  const directions = () => {
    if (!state.mapsAddress.trim()) {
      Alert.alert(
        'Add the zoo address',
        'Enter the zoo’s address in Profile so Apple Maps can route you to the correct place.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Add address',
            onPress: () => navigation.navigate('Settings'),
          },
        ],
      );
      return;
    }
    Linking.openURL(
      `https://maps.apple.com/?daddr=${encodeURIComponent(
        state.mapsAddress,
      )}&dirflg=w`,
    ).catch(() => Alert.alert('Maps unavailable', 'Please try again.'));
  };
  return (
    <Page back={() => navigation.goBack()}>
      <Hero
        image={h.image}
        title={h.name}
        subtitle={`${h.emoji} ${h.kind} Zone`}
        height={280}
      />
      <Label muted>{h.description}</Label>
      <Card>
        <Title small>💡 Plan your visit</Title>
        <Label muted>
          Check the information displayed at the habitat for access hours and
          keeper sessions. Follow the zoo signs from the entrance.
        </Label>
      </Card>
      <Button title="↗ Get Directions in Apple Maps" onPress={directions} />
      <Label muted>
        Directions lead to the zoo address saved in your profile. Use this zoo
        map to find the habitat inside.
      </Label>
    </Page>
  );
}
export function Chat() {
  const { compact } = useLayout();
  const { state, update } = useApp();
  const scroll = useRef<ScrollView>(null);
  const [busy, setBusy] = useState(false);
  const ask = async (index: number) => {
    if (busy) {
      return;
    }
    setBusy(true);
    try {
      await update(s => {
        const counts = [...s.answerCounts];
        const answer = questions[index].answers[counts[index] % 3];
        counts[index]++;
        return {
          ...s,
          answerCounts: counts,
          chat: [...s.chat, { id: uid(), question: index, answer }],
        };
      });
    } finally {
      setBusy(false);
    }
  };
  const clear = () =>
    Alert.alert(
      'Clear conversation?',
      'Remove all saved answers from this device?',
      [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => {
            update(s => ({ ...s, chat: [] })).catch(() => {});
          },
        },
      ],
    );
  return (
    <Page scroll={compact}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <LinearGradient
          colors={[colors.green, colors.purple]}
          style={{
            width: 44,
            height: 44,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Label style={{ fontSize: 24 }}>🦁</Label>
        </LinearGradient>
        <View style={{ flex: 1 }}>
          <Title small>Zoo Chat</Title>
          <Label style={{ color: colors.green, fontSize: 12 }}>
            ● Your zoo guide
          </Label>
        </View>
        {!!state.chat.length && (
          <Pressable onPress={clear} style={{ padding: 10 }}>
            <Label muted>Clear</Label>
          </Pressable>
        )}
      </View>
      <ScrollView
        ref={scroll}
        onContentSizeChange={() =>
          scroll.current?.scrollToEnd({ animated: true })
        }
        contentContainerStyle={{ gap: 16, paddingVertical: 12, flexGrow: 1 }}
        style={{
          flex: compact ? undefined : 1,
          height: compact ? 260 : undefined,
        }}
      >
        {state.chat.length ? (
          state.chat.map(m => (
            <FadeIn key={m.id} style={{ gap: 10 }}>
              <View
                style={{
                  alignSelf: 'flex-end',
                  maxWidth: '90%',
                  backgroundColor: '#173036',
                  padding: 14,
                  borderRadius: 18,
                  borderTopRightRadius: 4,
                }}
              >
                <Label style={{ color: colors.green }}>
                  {questions[m.question].question}
                </Label>
              </View>
              <Card>
                <Label>{m.answer}</Label>
              </Card>
              <View style={{ flexDirection: 'row', gap: 22, paddingLeft: 10 }}>
                <Pressable
                  onPress={() => {
                    Share.share({ message: m.answer }).catch(() =>
                      Alert.alert('Could not share', 'Please try again.'),
                    );
                  }}
                >
                  <Label muted>↗ Share</Label>
                </Pressable>
                <Pressable
                  onPress={() => {
                    update(s => ({
                      ...s,
                      chat: s.chat.filter(c => c.id !== m.id),
                    })).catch(() => {});
                  }}
                >
                  <Label muted>Delete</Label>
                </Pressable>
              </View>
            </FadeIn>
          ))
        ) : (
          <View style={{ alignItems: 'center', paddingVertical: 30, gap: 12 }}>
            <Label style={{ fontSize: 48, lineHeight: 60 }}>🌿</Label>
            <Label muted>Ask the Zoo anything!</Label>
          </View>
        )}
      </ScrollView>
      <View style={{ maxHeight: compact ? undefined : '43%', gap: 10 }}>
        <Label muted style={{ fontSize: 11, letterSpacing: 1 }}>
          CHOOSE A QUESTION
        </Label>
        <ScrollView contentContainerStyle={{ gap: 8 }}>
          {questions.map((q, i) => (
            <Pressable
              key={q.question}
              testID={`chat-question-${i}`}
              disabled={busy}
              onPress={() => {
                ask(i).catch(() => {});
              }}
              style={{
                padding: 13,
                backgroundColor: colors.card,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.line,
                flexDirection: 'row',
                gap: 10,
              }}
            >
              <Label>{q.emoji}</Label>
              <Label style={{ flex: 1, fontSize: 13 }}>{q.question}</Label>
              <Label style={{ color: colors.green }}>→</Label>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </Page>
  );
}
export function Settings({ navigation }: ScreenProps<'Settings'>) {
  const { state, update } = useApp();
  const [name, setName] = useState(state.visitorName);
  const [address, setAddress] = useState(state.mapsAddress);
  const [busy, setBusy] = useState(false);
  const save = async () => {
    setBusy(true);
    try {
      await update(s => ({
        ...s,
        visitorName: name.trim(),
        mapsAddress: address.trim(),
      }));
      navigation.goBack();
    } finally {
      setBusy(false);
    }
  };
  return (
    <Page back={() => navigation.goBack()} title="Visitor Details">
      <Label muted>YOUR NAME (OPTIONAL)</Label>
      <Field
        value={name}
        onChange={setName}
        placeholder="Enter your name"
        multiline={false}
      />
      <Label muted>ZOO ADDRESS FOR DIRECTIONS</Label>
      <Field
        value={address}
        onChange={setAddress}
        placeholder="Enter the zoo’s full address"
      />
      <Button
        title="Save Details"
        busy={busy}
        onPress={() => {
          save().catch(() => {});
        }}
      />
    </Page>
  );
}
