import React, { useState } from 'react';
import {
  StyleSheet, Text, View, TextInput, FlatList,
  ActivityIndicator, Image, TouchableOpacity, Alert, Button
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Импортируем AsyncStorage
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';
import { ENDPOINTS } from '../services/omdbConfig';

export default function Search({ navigate }) {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchMovies = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(ENDPOINTS.search(query));
      const json = await response.json();
      if (json.Response === 'False') {
        throw new Error(json.Error || 'Ничего не найдено');
      }
      setMovies(json.Search || []);
    } catch (e) {
      setError(e.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Функция сохранения фильма в выбранный список
  const saveToStorage = async (movie, listType) => {
    try {
      // Получаем текущий список из хранилища (или пустой массив, если там ничего нет)
      const existingData = await AsyncStorage.getItem(listType);
      const list = existingData ? JSON.parse(existingData) : [];

      // Проверяем, нет ли уже этого фильма в списке
      if (list.some(item => item.imdbID === movie.imdbID)) {
        Alert.alert('Внимание', 'Этот фильм уже есть в данном списке.');
        return;
      }

      // Добавляем новый фильм и сохраняем обратно
      list.push(movie);
      await AsyncStorage.setItem(listType, JSON.stringify(list));
      
      Alert.alert('Успех', `Фильм "${movie.Title}" добавлен в список!`);
    } catch (e) {
      Alert.alert('Ошибка', 'Не удалось сохранить фильм: ' + e.message);
    }
  };

  // Обработчик нажатия на кнопку добавления
  const handleAddPress = (movie) => {
    Alert.alert(
      'Куда добавить?',
      `Фильм: ${movie.Title}`,
      [
        {
          text: 'Просмотрено',
          onPress: () => saveToStorage(movie, '@watched_list'),
        },
        {
          text: 'Смотрю',
          onPress: () => saveToStorage(movie, '@watching_list'),
        },
        {
          text: 'Буду смотреть',
          onPress: () => saveToStorage(movie, '@will_watch_list'),
        },
        {
          text: 'Отмена',
          style: 'cancel',
        },
      ],
      { cancelable: true }
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
          {/* Заменили кнопку на TouchableOpacity для красивого вида */}
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => handleAddPress(item)}
          >
            <Text style={styles.addButtonText}>+ В список</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

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
            onSubmitEditing={searchMovies}
            returnKeyType="search"
          />
          <Button title="Найти" onPress={searchMovies} />
        </View>

        {loading && <ActivityIndicator size="large" color="#FFFFFF" style={{ marginTop: 20 }} />}

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && !error && (
          <FlatList
            data={movies}
            keyExtractor={(item) => item.imdbID}
            renderItem={renderMovie}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#111827' },
  content: { flex: 1 },
  searchRow: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#374151',
    backgroundColor: '#1F2937',
    color: '#FFFFFF',
    padding: 10,
    marginRight: 10,
    borderRadius: 6,
  },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    overflow: 'hidden',
  },
  poster: { width: 80, height: 120 },
  noPoster: {
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPosterText: { color: '#9CA3AF', fontSize: 10, textAlign: 'center' },
  info: { flex: 1, padding: 10, justifyContent: 'center' },
  title: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  details: { color: '#9CA3AF', fontSize: 12, marginBottom: 8 },
  
  // Стили для новой кнопки добавления
  addButton: {
    backgroundColor: '#3B82F6', // Синий цвет
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  errorBox: { padding: 20, alignItems: 'center' },
  errorText: { color: '#F87171', textAlign: 'center' },
});