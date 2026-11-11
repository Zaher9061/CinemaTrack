import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MovieBlock({ movie, color = '#00C8D8', style }) {
  const info = [movie.year, (movie.genres || []).join(', ')]
    .filter(Boolean)
    .join(' · ');

  return (
    <View style={[styles.block, { backgroundColor: color }, style]}>
      <Text style={styles.title} numberOfLines={2}>
        {movie.title}
      </Text>
      {info ? <Text style={styles.meta}>{info}</Text> : null}
      {movie.director ? <Text style={styles.meta}>{movie.director}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  meta: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2,
  },
});
