import React, { useContext, useEffect, useRef } from 'react';
import {
  AccessibilityInfo,
  Animated,
  Easing,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';

export function FadeIn({
  children,
  style,
  replayKey,
  onFocus = false,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  replayKey?: string | number;
  onFocus?: boolean;
}) {
  const progress = useRef(new Animated.Value(1)).current;
  const navigation = useContext(NavigationContext);
  useEffect(() => {
    let active = true;
    let reduced = false;
    const show = () => {
      progress.stopAnimation();
      if (reduced) {
        progress.setValue(1);
        return;
      }
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: 320,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    };
    AccessibilityInfo.isReduceMotionEnabled()
      .then(value => {
        if (active) {
          reduced = value;
          show();
        }
      })
      .catch(() => {
        if (active) {
          show();
        }
      });
    const motion = AccessibilityInfo.addEventListener(
      'reduceMotionChanged',
      value => {
        reduced = value;
        if (value) {
          progress.stopAnimation();
          progress.setValue(1);
        }
      },
    );
    const unsubscribe = onFocus
      ? navigation?.addListener('focus', show)
      : undefined;
    return () => {
      active = false;
      progress.stopAnimation();
      motion.remove();
      unsubscribe?.();
    };
  }, [navigation, onFocus, progress, replayKey]);
  return (
    <Animated.View
      style={[
        style,
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 0],
              }),
            },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
