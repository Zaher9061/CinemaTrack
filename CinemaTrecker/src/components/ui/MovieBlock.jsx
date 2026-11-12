import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function MovieBlock({ movie, color = '#00C8D8', style }) {
  const info = [movie.year, (movie.genres || []).join(', ')]
    .filter(Boolean)
    .join(' · ');

  // Проверяем, есть ли постер (и не пустая ли это строка 'N/A')
  const hasPoster = movie.poster && movie.poster !== 'N/A';

  return (
    <View style={[styles.block, { backgroundColor: color }, style]}>
      {/* Левая часть: постер */}
      {hasPoster && (
        <Image source={{ uri: movie.poster }} style={styles.poster} />
      )}

      {/* Правая часть: текст */}
      <View style={[styles.textContainer, !hasPoster && styles.textContainerNoImage]}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        {info ? <Text style={styles.meta}>{info}</Text> : null}
        {movie.director ? <Text style={styles.meta}>{movie.director}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 170,
    flexDirection: 'row', // Теперь элементы стоят в ряд (постер слева, текст справа)
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    overflow: 'hidden',
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 6,
    marginRight: 16,
    resizeMode: 'cover',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  // Если постера нет, текст растягивается на всю ширину
  textContainerNoImage: {
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'left', // Выравниваем по левому краю, так как теперь есть картинка
  },
  meta: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 2,
    opacity: 0.9,
  },
});