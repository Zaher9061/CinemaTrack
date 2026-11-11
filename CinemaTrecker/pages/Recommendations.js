import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';
import { AppBottomSheet, AppButton, MovieBlock } from '../src/components/ui';
import { useMoviesStore } from '../src/store/moviesStore';

const CATEGORIES = [
  { id: 'watched', label: 'Просмотрено', variant: 'primary', patch: { status: 'watched', progress: 1 } },
  { id: 'watching', label: 'Пока смотрю', variant: 'secondary', patch: { status: 'watching' } },
  { id: 'planned', label: 'Буду смотреть', variant: 'outline', patch: { status: 'planned' } },
];

export default function Recommendations({ navigate }) {
  const items = useMoviesStore((s) => s.items);
  const isLoading = useMoviesStore((s) => s.isLoading);
  const updateMovie = useMoviesStore((s) => s.updateMovie);

  const [selected, setSelected] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  const movies = items.filter((m) => m.status === 'recommended');

  const openSheet = (movie) => {
    setSelected(movie);
    setSheetVisible(true);
  };

  const choose = async (category) => {
    setSheetVisible(false);
    if (selected) await updateMovie(selected.id, category.patch);
  };

  return (
    <View style={styles.container}>
      <Navigator activeId="Recommendations" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="РЕКОМЕНДАЦИИ" onBack={() => navigate('Back')} />
        <ScrollView>
          {isLoading && items.length === 0 ? (
            <Text style={styles.info}>Загрузка...</Text>
          ) : null}
          {!isLoading && movies.length === 0 ? (
            <Text style={styles.info}>Рекомендаций пока нет</Text>
          ) : null}

          {movies.map((movie) => (
            <View key={movie.id}>
              <MovieBlock movie={movie} color="#34C759" />
              <Pressable style={styles.action} onPress={() => openSheet(movie)}>
                <Text style={styles.actionText}>Добавить</Text>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>

      <AppBottomSheet
        visible={sheetVisible}
        onClose={() => setSheetVisible(false)}
        title="Выберите категорию"
      >
        {CATEGORIES.map((category) => (
          <AppButton
            key={category.id}
            title={category.label}
            variant={category.variant}
            onPress={() => choose(category)}
            style={styles.sheetButton}
          />
        ))}
      </AppBottomSheet>
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
  sheetButton: { marginBottom: 12 },
});
