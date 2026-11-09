import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../constants/colors';
import { radius, spacing } from '../../constants/theme';

const VARIANTS = {
  primary: { bg: colors.PRIMARY, border: colors.PRIMARY, text: colors.WHITE },
  secondary: { bg: colors.PRIMARY_LIGHT, border: colors.PRIMARY_LIGHT, text: colors.PRIMARY },
  outline: { bg: 'transparent', border: colors.PRIMARY, text: colors.PRIMARY },
  danger: { bg: colors.ERROR, border: colors.ERROR, text: colors.WHITE },
};

const SIZES = {
  sm: { height: 36, paddingHorizontal: spacing.md, fontSize: 13 },
  md: { height: 48, paddingHorizontal: spacing.lg, fontSize: 15 },
  lg: { height: 56, paddingHorizontal: spacing.xl, fontSize: 17 },
};

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon = null,
  style,
}) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  const s = SIZES[size] || SIZES.md;
  const blocked = disabled || loading;

  const handlePress = () => {
    if (blocked) return;
    if (onPress) onPress();
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={blocked}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: v.bg,
          borderColor: v.border,
          height: s.height,
          paddingHorizontal: s.paddingHorizontal,
        },
        pressed && !blocked && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
    >
      <View style={[styles.content, loading && styles.hidden]}>
        {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
        <Text style={[styles.text, { color: v.text, fontSize: s.fontSize }]}>
          {title}
        </Text>
      </View>

      {loading && (
        <View style={styles.spinner}>
          <ActivityIndicator color={v.text} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { opacity: 0.8 },
  disabled: { opacity: 0.5 },
  content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  hidden: { opacity: 0 },
  icon: { marginRight: spacing.sm },
  text: { fontWeight: '600' },
  spinner: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
