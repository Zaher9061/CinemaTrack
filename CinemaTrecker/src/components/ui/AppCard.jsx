import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../../constants/colors';
import { radius, shadows, spacing } from '../../constants/theme';

export default function AppCard({ children, onPress, style }) {
  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.card, style]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.SURFACE,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadows.cardShadow,
  },
});
