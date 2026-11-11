import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList, ActivityIndicator,
  StyleSheet, Button, Image, TouchableOpacity
} from 'react-native';
import { ENDPOINTS } from '../services/omdbConfig';

export default function OmdbSearchScreen() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Универсальная функция поиска
  const searchMovies = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(ENDPOINTS.search(query));
      const json = await response.json();

      // OMDb возвращает Response: "False" при ошибке (например, ничего не найдено)
      if (json.Response === 'False') {
        throw new Error(json.Error || 'Ничего не найдено');
      }

      // Результаты поиска лежат в поле 'Search'
      setMovies(json.Search || []);
    } catch (e) {
      setError(e.message);
      setMovies([]); // Очищаем список при ошибке
    } finally {
      setLoading(false);
    }
  };

  // Заглушка для добавления в список
  const addToList = (movie) => {
    console.log('Добавлено в трекер:', movie.Title, movie.imdbID);
    // Здесь логика сохранения movie.imdbID в AsyncStorage
  };

  // Рендер карточки (поля в OMDb с большой буквы: Title, Year, Poster, imdbID)
  const renderMovie = ({ item }) => {
    const poster = item.Poster !== 'N/A' ? item.Poster : null;

    return (
      <TouchableOpacity style={styles.card} onPress={() => addToList(item)}>
        {poster ? (
          <Image source={{ uri: poster }} style={styles.poster} />
        ) : (
          <View style={[styles.poster, styles.noPoster]}>
            <Text>Нет постера</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>{item.Title}</Text>
          <Text style={styles.details}>{item.Year} • {item.Type}</Text>
          <Button title="+ В список" onPress={() => addToList(item)} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Поисковая строка */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Название фильма (на англ.)..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={searchMovies}
        />
        <Button title="Найти" onPress={searchMovies} />
      </View>

      {/* Индикатор загрузки */}
      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {/* Ошибка (включая "не найдено") */}
      {error && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Список фильмов */}
      {!loading && !error && (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.imdbID}
          renderItem={renderMovie}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchRow: { flexDirection: 'row', marginBottom: 16 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, marginRight: 10, borderRadius: 5 },
  list: { paddingBottom: 20 },
  card: { flexDirection: 'row', marginBottom: 12, backgroundColor: '#f9f9f9', borderRadius: 8, overflow: 'hidden' },
  poster: { width: 80, height: 120 },
  noPoster: { backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' },
  info: { flex: 1, padding: 10, justifyContent: 'center' },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  details: { color: '#666', fontSize: 12, marginBottom: 8 },
  errorBox: { padding: 20, alignItems: 'center' },
  errorText: { color: 'red', textAlign: 'center' },
});