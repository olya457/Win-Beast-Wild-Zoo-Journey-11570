import React from 'react';
import { FadeIn } from './FadeIn';
import { useLayout } from '../hooks/useLayout';
import {
  ActivityIndicator,
  ImageBackground,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
export const colors = {
  bg: '#0c031b',
  card: '#150b27',
  line: '#2b1c3e',
  green: '#40f49a',
  muted: '#92869f',
  white: '#faf7ff',
  purple: '#b250ff',
};
export const money = (n: number) => `$${n.toFixed(2)}`;
export function Label({
  children,
  muted = false,
  style,
}: {
  children: React.ReactNode;
  muted?: boolean;
  style?: StyleProp<TextStyle>;
}) {
  return <Text style={[s.text, muted && s.muted, style]}>{children}</Text>;
}
export function Title({
  children,
  small = false,
}: {
  children: React.ReactNode;
  small?: boolean;
}) {
  const { compact } = useLayout();
  return (
    <Text style={[s.title, { fontSize: small ? 18 : compact ? 22 : 25 }]}>
      {children}
    </Text>
  );
}
export function Page({
  children,
  back,
  title,
  scroll = true,
  animationKey,
  topInset = true,
}: {
  children?: React.ReactNode;
  back?: () => void;
  title?: string;
  scroll?: boolean;
  animationKey?: string | number;
  topInset?: boolean;
}) {
  const { padding, gap } = useLayout();
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView
      style={s.page}
      edges={topInset ? ['top', 'left', 'right'] : ['left', 'right']}
    >
      <FadeIn style={s.page} replayKey={animationKey} onFocus>
        <KeyboardAvoidingView
          style={s.page}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          {scroll ? (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={[
                s.content,
                {
                  padding,
                  gap,
                  paddingBottom: Math.max(24, insets.bottom + 12),
                },
              ]}
              keyboardDismissMode="on-drag"
            >
              {back && <Back onPress={back} />}
              {title && <Title>{title}</Title>}
              {children}
            </ScrollView>
          ) : (
            <View style={[s.content, { flex: 1, padding, gap }]}>
              {back && <Back onPress={back} />}
              {title && <Title>{title}</Title>}
              {children}
            </View>
          )}
        </KeyboardAvoidingView>
      </FadeIn>
    </SafeAreaView>
  );
}
export function Back({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={s.back}>
      <Label style={{ color: colors.green }}>‹ Back</Label>
    </Pressable>
  );
}
export function Button({
  title,
  onPress,
  secondary = false,
  disabled = false,
  busy = false,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
  busy?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || busy }}
      disabled={disabled || busy}
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        {
          opacity: disabled ? 0.4 : pressed ? 0.75 : 1,
        },
      ]}
    >
      <LinearGradient
        colors={secondary ? ['#192637', '#192031'] : ['#42f397', '#26d1be']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        pointerEvents="none"
        style={StyleSheet.absoluteFill}
      />
      {busy ? (
        <ActivityIndicator color={colors.bg} />
      ) : (
        <Text style={[s.buttonText, secondary && { color: colors.green }]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}
export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { compact } = useLayout();
  return (
    <View style={[s.card, compact && { padding: 13, gap: 10 }, style]}>
      {children}
    </View>
  );
}
export function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.row}>
      <Label muted style={{ flex: 1 }}>
        {label}
      </Label>
      <Label style={{ flex: 1, textAlign: 'right' }}>{value}</Label>
    </View>
  );
}
export function Counter({
  value,
  onChange,
  min = 0,
  max = 99,
}: {
  value: number;
  onChange: (n: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <View style={s.counter}>
      <Pressable
        accessibilityLabel="Decrease quantity"
        accessibilityRole="button"
        disabled={value <= min}
        onPress={() => onChange(value - 1)}
        style={[s.round, { opacity: value <= min ? 0.35 : 1 }]}
      >
        <Label>−</Label>
      </Pressable>
      <Label style={{ fontWeight: '800', minWidth: 22, textAlign: 'center' }}>
        {value}
      </Label>
      <Pressable
        accessibilityLabel="Increase quantity"
        accessibilityRole="button"
        disabled={value >= max}
        onPress={() => onChange(value + 1)}
        style={[
          s.round,
          { backgroundColor: colors.green, opacity: value >= max ? 0.35 : 1 },
        ]}
      >
        <Label style={{ color: colors.bg }}>+</Label>
      </Pressable>
    </View>
  );
}
export function Field({
  value,
  onChange,
  placeholder,
  multiline = true,
}: {
  value: string;
  onChange: (text: string) => void;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <TextInput
      value={value}
      onChangeText={onChange}
      placeholder={placeholder}
      placeholderTextColor="#6f627e"
      multiline={multiline}
      maxLength={multiline ? 1000 : 160}
      style={[
        s.input,
        multiline && { minHeight: 100, textAlignVertical: 'top' },
      ]}
    />
  );
}
export function Segments({
  items,
  value,
  onChange,
}: {
  items: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <View style={s.segments}>
      {items.map(item => (
        <Pressable
          accessibilityRole="tab"
          accessibilityState={{ selected: value === item }}
          key={item}
          onPress={() => onChange(item)}
          style={[
            s.segment,
            item === value && { backgroundColor: colors.green },
          ]}
        >
          <Text
            style={{
              color: item === value ? colors.bg : colors.muted,
              fontWeight: '700',
              fontSize: 13,
              textAlign: 'center',
            }}
          >
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
export function Hero({
  image,
  title,
  subtitle,
  onPress,
  height = 205,
}: {
  image: ImageSourcePropType;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  height?: number;
}) {
  const { compact } = useLayout();
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
    >
      <ImageBackground
        source={image}
        style={{
          minHeight: compact ? Math.min(height, 205) : height,
          justifyContent: 'flex-end',
          overflow: 'hidden',
          borderRadius: 18,
        }}
      >
        <LinearGradient
          colors={['transparent', '#0c031bee']}
          style={{ padding: 18, paddingTop: 65 }}
        >
          {subtitle && (
            <Label style={{ color: colors.green, fontSize: 12 }}>
              {subtitle}
            </Label>
          )}
          <Title small>{title}</Title>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}
export function Empty({
  emoji,
  title,
  text,
  children,
}: {
  emoji: string;
  title: string;
  text: string;
  children?: React.ReactNode;
}) {
  return (
    <Card style={{ alignItems: 'center', paddingVertical: 34, gap: 15 }}>
      <Text style={{ fontSize: 40 }}>{emoji}</Text>
      <Title small>{title}</Title>
      <Label muted style={{ textAlign: 'center' }}>
        {text}
      </Label>
      {children}
    </Card>
  );
}
export function Success({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  const { compact } = useLayout();
  return (
    <View style={{ paddingTop: compact ? 20 : 50, gap: compact ? 16 : 24 }}>
      <View style={s.check}>
        <Label style={{ fontSize: 36, color: colors.green }}>✓</Label>
      </View>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Title>{title}</Title>
        <Label muted style={{ textAlign: 'center' }}>
          {subtitle}
        </Label>
      </View>
      {children}
    </View>
  );
}
export function Icon({
  name,
  color,
  size = 23,
}: {
  name: string;
  color: string;
  size?: number;
}) {
  const paths: Record<string, string> = {
    Home: 'M3 10 12 3l9 7v11h-6v-7H9v7H3Z',
    Events: 'M5 5h14v16H5ZM8 2v6m8-6v6M5 10h14m-10 4h1m4 0h1m-6 3h1',
    Food: 'M4 7h13v10a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4ZM17 8h2a3 3 0 0 1 0 6h-2M7 2v2m4-2v2m4-2v2',
    Map: 'M3 5l6-3 6 3 6-3v17l-6 3-6-3-6 3ZM9 2v17m6-14v17',
    Chat: 'M3 4h18v13H8l-5 4Z',
    Profile: 'M4 22v-3a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v3',
  };
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d={paths[name] || paths.Home} />
      {name === 'Profile' && <Circle cx={12} cy={6} r={4} />}
    </Svg>
  );
}
export const s = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  content: {
    padding: 18,
    paddingBottom: 38,
    gap: 18,
    flexGrow: 1,
    width: '100%',
    maxWidth: 680,
    alignSelf: 'center',
  },
  text: { color: colors.white, fontSize: 14, lineHeight: 21 },
  muted: { color: colors.muted },
  title: {
    color: colors.white,
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: -0.6,
    flexShrink: 1,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 18,
    padding: 17,
    gap: 13,
  },
  button: {
    borderRadius: 14,
    minHeight: 56,
    flexShrink: 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 22,
    flexShrink: 1,
    includeFontPadding: false,
    fontWeight: '800',
    color: '#071521',
    textAlign: 'center',
  },
  back: { minHeight: 38, justifyContent: 'center' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 7,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  round: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.line,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: colors.white,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 14,
    padding: 15,
    fontSize: 14,
  },
  segments: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 12,
    backgroundColor: '#1b102c',
    gap: 4,
  },
  segment: {
    flex: 1,
    paddingVertical: 11,
    paddingHorizontal: 6,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  check: {
    alignSelf: 'center',
    width: 78,
    height: 78,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.green,
    backgroundColor: '#16302c',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.green,
    shadowOpacity: 0.4,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },
});
