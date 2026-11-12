import React, { useState, useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';
import { AppBottomSheet, AppButton, MovieBlock } from '../src/components/ui';
import { useMoviesStore } from '../src/store/moviesStore';
import { API_KEY } from '../services/omdbConfig'; // Импортируем ключ

const CATEGORIES = [
  { id: 'watched', label: 'Просмотрено', variant: 'primary', patch: { status: 'watched', progress: 1 } },
  { id: 'watching', label: 'Пока смотрю', variant: 'secondary', patch: { status: 'watching' } },
  { id: 'planned', label: 'Буду смотреть', variant: 'outline', patch: { status: 'planned' } },
];

// Набор разных слов для создания "случайной" подборки
const RANDOM_KEYWORDS = ['star', 'dark', 'love', 'war', 'night', 'man', 'life', 'world', 'king', 'day'];

export default function Recommendations({ navigate }) {
  const updateMovie = useMoviesStore((s) => s.updateMovie);

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selected, setSelected] = useState(null);
  const [sheetVisible, setSheetVisible] = useState(false);

  // Функция загрузки 20 "случайных" фильмов
  const loadRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Выбираем 2 случайных слова из списка
      const shuffled = [...RANDOM_KEYWORDS].sort(() => 0.5 - Math.random());
      const selectedKeywords = shuffled.slice(0, 2);

      // Делаем 2 запроса параллельно (по 10 результатов каждый = 20 итого)
      const requests = selectedKeywords.map(keyword =>
        fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}&type=movie`)
          .then(res => res.json())
      );

      const responses = await Promise.all(requests);
      
      // Собираем все фильмы в один массив
      let allMovies = [];
      responses.forEach(json => {
        if (json.Response === 'True' && json.Search) {
          allMovies = [...allMovies, ...json.Search];
        }
      });

      // Берем ровно 20 (на случай, если где-то было меньше 10)
      setMovies(allMovies.slice(0, 20));
    } catch (e) {
      setError('Не удалось загрузить рекомендации');
    } finally {
      setIsLoading(false);
    }
  };

  // Загружаем при монтировании экрана
  useEffect(() => {
    loadRecommendations();
  }, []);

  const openSheet = (movie) => {
    setSelected(movie);
    setSheetVisible(true);
  };

  const choose = async (category) => {
    setSheetVisible(false);
    if (selected) {
      // ВАЖНО: добавляем фильм в стор, а не обновляем существующий
      // Здесь мы используем addMovie, а не updateMovie, так как этих фильмов еще нет в вашем трекере
      // Но так как у вас в сторе уже есть addMovie, вызовем его
      // (Если в вашем сторе нет addMovie, используйте updateMovie, передав данные фильма)
      await useMoviesStore.getState().addMovie({
        title: selected.Title,
        year: selected.Year,
        type: selected.Type === 'series' ? 'series' : 'movie',
        poster: selected.Poster !== 'N/A' ? selected.Poster : null,
        status: category.id,
      });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Navigator activeId="Recommendations" onNavigate={navigate} />
        <View style={styles.content}>
          <Header title="РЕКОМЕНДАЦИИ" onBack={() => navigate('Back')} />
          <ActivityIndicator size="large" color="#3B82F6" style={{ marginTop: 50 }} />
          <Text style={styles.info}>Подбираем фильмы...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Navigator activeId="Recommendations" onNavigate={navigate} />
        <View style={styles.content}>
          <Header title="РЕКОМЕНДАЦИИ" onBack={() => navigate('Back')} />
          <Text style={styles.info}>{error}</Text>
          <Pressable style={styles.action} onPress={loadRecommendations}>
            <Text style={styles.actionText}>Попробовать снова</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Navigator activeId="Recommendations" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="РЕКОМЕНДАЦИИ" onBack={() => navigate('Back')} />
        <ScrollView>
          {movies.length === 0 ? (
            <Text style={styles.info}>Рекомендаций пока нет</Text>
          ) : null}

          {movies.map((movie) => (
            <View key={movie.imdbID}>
              <MovieBlock 
                movie={{
                  title: movie.Title,
                  year: movie.Year,
                  poster: movie.Poster !== 'N/A' ? movie.Poster : null,
                }} 
                color="#34C759" 
              />
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
    marginBottom: 12,
  },
  actionText: { color: '#34C759', fontSize: 14 },
  sheetButton: { marginBottom: 12 },
});