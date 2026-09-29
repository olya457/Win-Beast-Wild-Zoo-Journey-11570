import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { artwork } from '../data/catalog';
import { Button, colors, Label, Title } from '../components/ui';
import { ScreenProps } from '../navigation/types';
import { FadeIn } from '../components/FadeIn';
import { useLayout } from '../hooks/useLayout';
import { useApp } from '../store/AppStore';
const html = `<!DOCTYPE html><html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:transparent;color:#9b91a5;font:12px -apple-system,sans-serif}.row{display:flex;justify-content:space-between;margin:12px 0}.track{height:4px;background:#ffffff22;border-radius:8px;overflow:hidden}.fill{height:100%;width:0;background:linear-gradient(90deg,#40f49a,#b250ff);animation:load 4s linear forwards}@keyframes load{to{width:100%}}</style><div class="row"><span>Loading your experience</span><span id="p">0%</span></div><div class="track"><div class="fill"></div></div><script>let start=Date.now();let timer=setInterval(()=>{let n=Math.min(100,Math.floor((Date.now()-start)/40));document.getElementById('p').textContent=n+'%';if(n===100){clearInterval(timer);window.ReactNativeWebView.postMessage('finished')}},40)</script></html>`;
export function Loader({ onComplete }: { onComplete: () => void }) {
  const { height, width } = useWindowDimensions();
  const inset = useSafeAreaInsets();
  useEffect(() => {
    const t = setTimeout(onComplete, 4000);
    return () => clearTimeout(t);
  }, [onComplete]);
  return (
    <ImageBackground source={artwork.onboarding[0]} style={{ flex: 1 }}>
      <LinearGradient
        colors={['#08031677', '#0c031baa', '#0c031bef']}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: inset.top,
        }}
      >
        <Image
          source={artwork.logo}
          style={{
            width: Math.min(width * 0.77, height * 0.42, 320),
            height: Math.min(width * 0.77, height * 0.42, 320),
            borderRadius: 28,
          }}
        />
        <View
          style={{
            marginTop: Math.min(height * 0.07, 70),
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: Math.min(width * 0.085, 36),
              fontWeight: '900',
              color: 'white',
            }}
          >
            WIN BEAST <Text style={{ color: colors.green }}>ZOO</Text>
          </Text>
          <Label muted style={{ letterSpacing: 2.5, marginTop: 6 }}>
            BY WIN BEAST CASINO
          </Label>
        </View>
      </View>
      <View
        style={{
          height: 75,
          marginHorizontal: 16,
          marginBottom: Math.max(inset.bottom, 18),
        }}
      >
        <WebView
          source={{ html }}
          originWhitelist={['*']}
          scrollEnabled={false}
          style={{ backgroundColor: 'transparent' }}
          onMessage={event => {
            if (event.nativeEvent.data === 'finished') {
              onComplete();
            }
          }}
        />
      </View>
    </ImageBackground>
  );
}
const slides = [
  [
    'Welcome to the Zoo',
    'Your premium companion for an unforgettable wildlife experience organized by Win Beast Casino. Discover animals, plan your day, and make memories.',
  ],
  [
    'Discover Zoo Events',
    'Explore exciting events happening every day — feeding shows, guided walks, and exclusive encounters. Reserve your spot instantly and manage bookings on the go.',
  ],
  [
    'Order Food & Drinks',
    'Browse our themed food court — Jungle Bites, Safari Meals, and Wild Treats. Order ahead, skip the queue, and find all your orders in one place.',
  ],
  [
    'Explore the Zoo Map',
    'Navigate the zoo with our interactive map. Discover animal habitats, facilities, event zones, and food spots. Tap any location for details and directions.',
  ],
  [
    'Everything in One Place',
    'Your tickets, QR codes, event reservations, food orders, and zoo information — all in one premium app. Scan at the entrance and enjoy the adventure.',
  ],
];
export function Onboarding({ navigation }: ScreenProps<'Onboarding'>) {
  const [index, setIndex] = useState(0);
  const { update } = useApp();
  const { height, compact, padding } = useLayout();
  const insets = useSafeAreaInsets();
  const finish = async () => {
    await update(s => ({ ...s, onboarded: true }));
    navigation.replace('Tickets', { initial: true });
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        key={index}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <FadeIn replayKey={index} style={{ flex: 1 }}>
          <ImageBackground
            source={artwork.onboarding[index]}
            style={{ height: Math.max(170, height * (compact ? 0.38 : 0.55)) }}
          >
            <LinearGradient
              colors={['#0c031b22', '#0c031b33', colors.bg]}
              style={StyleSheet.absoluteFill}
            />
            <Pressable
              onPress={() => {
                finish().catch(() => {});
              }}
              style={{
                position: 'absolute',
                right: 22,
                top: insets.top + 8,
                padding: 12,
              }}
            >
              <Label muted>Skip</Label>
            </Pressable>
            <View
              style={{
                position: 'absolute',
                left: 22,
                bottom: 20,
                backgroundColor: '#41224488',
                padding: 13,
                borderRadius: 16,
              }}
            >
              <Text style={{ fontSize: 25 }}>🦁</Text>
            </View>
          </ImageBackground>
          <View style={{ padding, gap: compact ? 12 : 18 }}>
            <Title>{slides[index][0]}</Title>
            <Label muted>{slides[index][1]}</Label>
          </View>
        </FadeIn>
      </ScrollView>
      <View
        style={{
          flexShrink: 0,
          paddingHorizontal: padding,
          paddingTop: 12,
          paddingBottom: Math.max(insets.bottom + 8, 20),
          gap: 18,
        }}
      >
        <View
          style={{ flexDirection: 'row', justifyContent: 'center', gap: 6 }}
        >
          {slides.map((_, i) => (
            <View
              key={i}
              style={{
                height: 4,
                width: i === index ? 22 : 5,
                borderRadius: 4,
                backgroundColor: i === index ? colors.green : colors.line,
              }}
            />
          ))}
        </View>
        <Button
          title={index === 4 ? 'Get Started  →' : 'Continue  →'}
          onPress={() => {
            if (index < 4) {
              setIndex(index + 1);
            } else {
              finish().catch(() => {});
            }
          }}
        />
      </View>
    </View>
  );
}
