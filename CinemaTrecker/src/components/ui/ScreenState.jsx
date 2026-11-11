import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

export function ScreenState({ isLoading, error, isEmpty, onRetry, emptyMessage = "Здесь пока пусто" }) {
  // 1. Состояние загрузки
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={styles.loadingText}>Загрузка данных...</Text>
      </View>
    );
  }

  // 2. Состояние ошибки (Уровень Б: с кнопкой повтора)
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Упс! Что-то пошло не так.</Text>
        <Text style={styles.errorText}>{error}</Text>
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryButtonText}>Повторить</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  // 3. Состояние пустого списка
  if (isEmpty) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>{emptyMessage}</Text>
      </View>
    );
  }

  // Если ничего из вышеперечисленного — рендерим пустую View (данные отрисует FlatList)
  return null;
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  loadingText: { color: '#94A3B8', marginTop: 12, fontSize: 16 },
  errorTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  errorText: { color: '#F87171', fontSize: 14, textAlign: 'center', marginBottom: 20 },
  retryButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  retryButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  emptyText: { color: '#94A3B8', fontSize: 16, textAlign: 'center' },
});