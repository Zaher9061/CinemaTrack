import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';
import { MovieBlock } from '../src/components/ui';
import { useMoviesStore } from '../src/store/moviesStore';

export default function Watching({ navigate }) {
  const items = useMoviesStore((s) => s.items);
  const isLoading = useMoviesStore((s) => s.isLoading);
  const updateMovie = useMoviesStore((s) => s.updateMovie);

  const movies = items.filter((m) => m.status === 'watching');

  const addProgress = (movie) => {
    const next = Math.min(1, (movie.progress || 0) + 0.25);
    if (next >= 1) {
      updateMovie(movie.id, { status: 'watched', progress: 1 });
    } else {
      updateMovie(movie.id, { progress: Number(next.toFixed(2)) });
    }
  };

  return (
    <View style={styles.container}>
      <Navigator activeId="Watching" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="ПОКА СМОТРЮ" onBack={() => navigate('Back')} />
        <ScrollView>
          {isLoading && items.length === 0 ? (
            <Text style={styles.info}>Загрузка...</Text>
          ) : null}
          {!isLoading && movies.length === 0 ? (
            <Text style={styles.info}>Здесь пока пусто</Text>
          ) : null}

          {movies.map((movie) => (
            <View key={movie.id}>
              <MovieBlock movie={movie} />
              <Pressable
                style={styles.barBackground}
                onPress={() => addProgress(movie)}
              >
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.barFill,
                      { width: `${(movie.progress || 0) * 100}%` },
                    ]}
                  />
                </View>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#111827' },
  content: { flex: 1 },
  info: { color: '#94A3B8', textAlign: 'center', marginTop: 24, fontSize: 16 },
  barBackground: {
    height: 30,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  barTrack: { height: 14, backgroundColor: '#000000' },
  barFill: { height: 14, backgroundColor: '#F58A1F' },
});
