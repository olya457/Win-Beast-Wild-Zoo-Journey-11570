import { useWindowDimensions } from 'react-native';

export function useLayout() {
  const { width, height, fontScale } = useWindowDimensions();
  const narrow = width / Math.max(1, fontScale) < 360;
  const compact = narrow || height < 700;
  return {
    width,
    height,
    narrow,
    compact,
    padding: compact ? 12 : 18,
    gap: compact ? 12 : 18,
  };
}
