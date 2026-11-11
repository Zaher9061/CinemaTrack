import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, FlatList,
  Image, TouchableOpacity, Alert, Button, RefreshControl
} from 'react-native';
import { useMoviesStore } from '../src/store/moviesStore';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';
import { ENDPOINTS } from '../services/omdbConfig';
import { ScreenState } from '../src/components/ui/ScreenState';
import { useFetch } from '../src/hooks/useFetch';

export default function Search({ navigate }) {
  const [query, setQuery] = useState('');
  // Сохраняем URL в стейте, чтобы хук реагировал на изменения
  const [searchUrl, setSearchUrl] = useState('');

  // Используем наш кастомный хук
  const { data: movies, isLoading, isRefreshing, error, refetch, onRefresh } = useFetch(searchUrl);

  const addMovie = useMoviesStore((s) => s.addMovie);

  const handleSearch = () => {
    if (!query.trim()) return;
    // Обновляем URL — хук автоматически сделает новый запрос
    setSearchUrl(ENDPOINTS.search(query));
  };

  const handleAddToStore = async (movie, status) => {
    const movieData = {
      title: movie.Title,
      year: movie.Year,
      type: movie.Type === 'series' ? 'series' : 'movie',
      poster: movie.Poster !== 'N/A' ? movie.Poster : null,
      status: status,
    };
    const result = await addMovie(movieData);
    if (result) {
      Alert.alert('Успех', `"${movie.Title}" успешно добавлен!`);
    } else {
      Alert.alert('Ошибка', 'Не удалось добавить фильм.');
    }
  };

  const handleAddPress = (movie) => {
    Alert.alert(
      'Куда добавить?',
      `Фильм: ${movie.Title}`,
      [
        { text: 'Просмотрено', onPress: () => handleAddToStore(movie, 'watched') },
        { text: 'Смотрю', onPress: () => handleAddToStore(movie, 'watching') },
        { text: 'Буду смотреть', onPress: () => handleAddToStore(movie, 'planned') },
        { text: 'Отмена', style: 'cancel' },
      ]
    );
  };

  const renderMovie = ({ item }) => {
    const poster = item.Poster !== 'N/A' ? item.Poster : null;
    return (
      <View style={styles.card}>
        {poster ? (
          <Image source={{ uri: poster }} style={styles.poster} />
        ) : (
          <View style={[styles.poster, styles.noPoster]}>
            <Text style={styles.noPosterText}>Нет постера</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>{item.Title}</Text>
          <Text style={styles.details}>{item.Year} • {item.Type}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddPress(item)}>
            <Text style={styles.addButtonText}>+ В список</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Пустой ответ (если искали, но ничего не нашли)
  const isEmpty = searchUrl !== '' && !isLoading && !error && movies.length === 0;

  return (
    <View style={styles.container}>
      <Navigator activeId="Search" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="ПОИСК" onBack={() => navigate('Back')} />

        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Название фильма (на англ.)..."
            placeholderTextColor="#6B7280"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <Button title="Найти" onPress={handleSearch} />
        </View>

        {/* Если URL пустой — просто показываем подсказку, без ошибок */}
        {searchUrl === '' && (
          <Text style={styles.hintText}>Введите название и нажмите «Найти»</Text>
        )}

        <ScreenState
          isLoading={isLoading && movies.length === 0}
          error={error}
          isEmpty={isEmpty}
          onRetry={refetch}
          emptyMessage="По вашему запросу ничего не найдено."
        />

        {!isLoading && !error && searchUrl !== '' && (
          <FlatList
            data={movies}
            keyExtractor={(item) => item.imdbID}
            renderItem={renderMovie}
            contentContainerStyle={styles.list}
            // Pull-to-Refresh (Уровень А)
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor="#3B82F6" // Цвет для iOS
                colors={['#3B82F6']} // Цвет для Android
              />
            }
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // ... (ваши стили из прошлого шага + новый hintText)
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#111827' },
  content: { flex: 1 },
  searchRow: { flexDirection: 'row', padding: 16, alignItems: 'center' },
  input: {
    flex: 1,
    borderWidth: 1, borderColor: '#374151', backgroundColor: '#1F2937',
    color: '#FFFFFF', padding: 10, marginRight: 10, borderRadius: 6,
  },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  card: {
    flexDirection: 'row', marginBottom: 12, backgroundColor: '#1F2937',
    borderRadius: 8, overflow: 'hidden',
  },
  poster: { width: 80, height: 120 },
  noPoster: { backgroundColor: '#374151', justifyContent: 'center', alignItems: 'center' },
  noPosterText: { color: '#9CA3AF', fontSize: 10, textAlign: 'center' },
  info: { flex: 1, padding: 10, justifyContent: 'center' },
  title: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  details: { color: '#9CA3AF', fontSize: 12, marginBottom: 8 },
  addButton: {
    backgroundColor: '#3B82F6', paddingVertical: 6, paddingHorizontal: 12,
    borderRadius: 6, alignSelf: 'flex-start',
  },
  addButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 12 },
  hintText: { color: '#6B7280', textAlign: 'center', marginTop: 40, fontSize: 14 },
});