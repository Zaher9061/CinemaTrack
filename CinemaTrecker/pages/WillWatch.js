import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';
import { MovieBlock } from '../src/components/ui';
import { useMoviesStore } from '../src/store/moviesStore';

export default function WillWatch({ navigate }) {
  const items = useMoviesStore((s) => s.items);
  const isLoading = useMoviesStore((s) => s.isLoading);
  const updateMovie = useMoviesStore((s) => s.updateMovie);

  const movies = items.filter((m) => m.status === 'planned');

  return (
    <View style={styles.container}>
      <Navigator activeId="WillWatch" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="БУДУ СМОТРЕТЬ" onBack={() => navigate('Back')} />
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
                style={styles.action}
                onPress={() => updateMovie(movie.id, { status: 'watching' })}
              >
                <Text style={styles.actionText}>НАЧАТЬ СМОТРЕТЬ</Text>
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
  action: {
    height: 30,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: { color: '#34C759', fontSize: 14 },
});
