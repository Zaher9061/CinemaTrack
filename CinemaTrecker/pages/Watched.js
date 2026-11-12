import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';
import { MovieBlock } from '../src/components/ui';
import { useMoviesStore } from '../src/store/moviesStore';

export default function Watched({ navigate }) {
  const items = useMoviesStore((s) => s.items);
  const isLoading = useMoviesStore((s) => s.isLoading);
  const updateMovie = useMoviesStore((s) => s.updateMovie);
  const removeMovie = useMoviesStore((s) => s.removeMovie); // Получаем функцию удаления

  const movies = items.filter((m) => m.status === 'watched');

  return (
    <View style={styles.container}>
      <Navigator activeId="Watched" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="ПРОСМОТРЕНО" onBack={() => navigate('Back')} />
        <ScrollView>
          {isLoading && items.length === 0 ? (
            <Text style={styles.info}>Загрузка...</Text>
          ) : null}
          {!isLoading && movies.length === 0 ? (
            <Text style={styles.info}>Здесь пока пусто</Text>
          ) : null}

          {movies.map((movie) => (
            <View key={movie.id} style={styles.itemContainer}>
              <MovieBlock movie={movie} />
              <View style={styles.actionsRow}>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => updateMovie(movie.id, { status: 'watching', progress: 0 })}
                >
                  <Text style={styles.actionText}>ПЕРЕСМОТРЕТЬ</Text>
                </Pressable>
                <Pressable
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => removeMovie(movie.id)}
                >
                  <Text style={styles.deleteText}>УДАЛИТЬ</Text>
                </Pressable>
              </View>
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
  itemContainer: { marginBottom: 12 },
  actionsRow: { flexDirection: 'row', height: 30 },
  actionButton: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  deleteButton: { backgroundColor: '#7F1D1D' }, // Темно-красный
  actionText: { color: '#34C759', fontSize: 12, fontWeight: 'bold' },
  deleteText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
});