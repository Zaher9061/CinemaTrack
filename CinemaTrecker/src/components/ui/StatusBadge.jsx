import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { radius, spacing } from '../../constants/theme';
import { getStatusConfig } from '../../utils/status';

export default function StatusBadge({ status, style }) {
  const config = getStatusConfig(status);

  return (
    <View style={[styles.badge, { backgroundColor: config.background }, style]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
  },
});
