import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import { loaderHtml } from '../data/loaderHtml';
import { Button, colors, Label, Title } from '../components/ui';
import { ScreenProps } from '../navigation/types';
import { FadeIn } from '../components/FadeIn';
import { useLayout } from '../hooks/useLayout';
import { useApp } from '../store/AppStore';
const loaderSource = { html: loaderHtml };
export function Loader({ onComplete }: { onComplete: () => void }) {
  const { height, width } = useWindowDimensions();
  const inset = useSafeAreaInsets();
  const completed = useRef(false);
  const finish = useCallback(() => {
    if (!completed.current) {
      completed.current = true;
      onComplete();
    }
  }, [onComplete]);
  useEffect(() => {
    const timeout = setTimeout(finish, 12000);
    return () => clearTimeout(timeout);
  }, [finish]);
  const logoSize = Math.min(width * 0.77, height * 0.4, 320);
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
        <View
          style={[
            loaderStyles.logoFrame,
            { width: logoSize, height: logoSize },
          ]}
        >
          <LinearGradient
            pointerEvents="none"
            colors={['#40f49a99', '#a851eacc', '#23d5b188']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Image source={artwork.logo} style={loaderStyles.logo} />
        </View>
        <View
          style={{
            marginTop: Math.min(height * 0.13, 110),
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
            Zoo <Text style={{ color: colors.green }}>Adventure</Text>
          </Text>
          <Label muted style={{ letterSpacing: 2.5, marginTop: 6 }}>
            EXPLORE THE WILD
          </Label>
        </View>
      </View>
      <View
        style={{
          height: 56,
          flexShrink: 0,
          marginHorizontal: 14,
          marginBottom: Math.max(inset.bottom + 8, 24),
        }}
      >
        <WebView
          source={loaderSource}
          javaScriptEnabled
          opaque={false}
          bounces={false}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          contentInsetAdjustmentBehavior="never"
          containerStyle={loaderStyles.webContainer}
          originWhitelist={['*']}
          scrollEnabled={false}
          style={loaderStyles.webView}
          onMessage={event => {
            if (event.nativeEvent.data === 'finished') {
              finish();
            }
          }}
        />
      </View>
    </ImageBackground>
  );
}
const slides = [
  [
    'Welcome to Zoo Adventure',
    'Your premium companion for an unforgettable wildlife experience at Zoo Adventure. Discover animals, plan your day, and make memories.',
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
  const { height, width, compact, padding } = useLayout();
  const [imageWidth, setImageWidth] = useState(width);
  const insets = useSafeAreaInsets();
  const heroHeight = Math.max(240, height * (compact ? 0.38 : 0.55));
  const imageHeight = (imageWidth * 852) / 394;
  const logoCenters = [295, 270, 210, 130, 160];
  const logoTarget = Math.max(insets.top + 80, heroHeight * 0.46);
  const imageTop = Math.max(
    heroHeight - imageHeight,
    Math.min(0, logoTarget - (logoCenters[index] * imageWidth) / 394),
  );
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
          <View
            onLayout={event => setImageWidth(event.nativeEvent.layout.width)}
            style={{ height: heroHeight, overflow: 'hidden' }}
          >
            <Image
              source={artwork.onboarding[index]}
              resizeMode="cover"
              style={{
                position: 'absolute',
                left: 0,
                top: imageTop,
                width: imageWidth,
                height: imageHeight,
              }}
            />
            <LinearGradient
              colors={['#103d2b18', '#103d2b18', colors.bg]}
              locations={[0, 0.6, 1]}
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
          </View>
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

const loaderStyles = StyleSheet.create({
  logoFrame: { padding: 1.5, borderRadius: 29, overflow: 'hidden' },
  logo: { width: '100%', height: '100%', borderRadius: 27.5 },
  webContainer: { flex: 1, backgroundColor: 'transparent' },
  webView: { flex: 1, height: 56, backgroundColor: 'transparent' },
});
