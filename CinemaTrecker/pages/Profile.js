import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';
import { useMoviesStore } from '../src/store/moviesStore';
import { useUserStore } from '../src/store/userStore';

export default function Profile({ navigate }) {
  const items = useMoviesStore((s) => s.items);
  const user = useUserStore((s) => s.user);

  const watchedItems = items.filter((m) => m.status === 'watched');
  const watchedMoviesCount = watchedItems.filter((m) => m.type === 'movie').length;
  const watchedSeriesCount = watchedItems.filter((m) => m.type === 'series').length;
  
  const totalMinutes = watchedItems.reduce((sum, m) => sum + (m.durationMinutes || 0), 0);
  const totalHours = Math.round(totalMinutes / 60);

  return (
    <View style={styles.container}>
      <Navigator activeId="Profile" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="ПРОФИЛЬ" onBack={() => navigate('Back')} />
        <ScrollView>
          {/* Шапка профиля */}
          <View style={styles.top}>
            {/* Если есть аватарка — показываем её, иначе заглушку */}
            {user?.avatarUri ? (
              <Image source={{ uri: user.avatarUri }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <View style={styles.avatarHead} />
                <View style={styles.avatarBody} />
              </View>
            )}
            <Text style={styles.name}>{user?.name || 'NAME'}</Text>
          </View>

          {/* Статистика */}
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Статистика просмотра</Text>
            
            <View style={styles.cardsRow}>
              <View style={styles.statCard}>
                <Text style={styles.cardIcon}>🎬</Text>
                <Text style={styles.cardValue}>{watchedMoviesCount}</Text>
                <Text style={styles.cardLabel}>Фильмов</Text>
              </View>

              <View style={styles.statCard}>
                <Text style={styles.cardIcon}>📺</Text>
                <Text style={styles.cardValue}>{watchedSeriesCount}</Text>
                <Text style={styles.cardLabel}>Сериалов</Text>
              </View>
            </View>

            {totalHours > 0 && (
              <View style={styles.timeBlock}>
                <Text style={styles.timeText}>Общее время: ~{totalHours} ч</Text>
              </View>
            )}
          </View>

        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#111827' },
  content: { flex: 1 },
  
  top: { alignItems: 'center', paddingVertical: 24 },
  
  // Стили для заглушки (если нет фото)
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#DCE6FF',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarHead: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#4A9BF5', marginTop: 22,
  },
  avatarBody: {
    width: 90, height: 60, borderRadius: 45,
    backgroundColor: '#4A9BF5', marginTop: 8,
  },

  // Стиль для реального фото
  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#3B82F6',
  },

  name: { color: '#FFFFFF', fontSize: 18, marginTop: 12 },

  statsContainer: {
    padding: 20,
    backgroundColor: '#1F2937',
    marginHorizontal: 16,
    borderRadius: 12,
  },
  statsTitle: {
    color: '#FFFFFF', fontSize: 18, fontWeight: 'bold',
    textAlign: 'center', marginBottom: 16,
  },
  cardsRow: { flexDirection: 'row', justifyContent: 'space-around' },
  statCard: {
    flex: 1, backgroundColor: '#374151', borderRadius: 10,
    padding: 16, alignItems: 'center', marginHorizontal: 6,
  },
  cardIcon: { fontSize: 28, marginBottom: 8 },
  cardValue: { color: '#34C759', fontSize: 28, fontWeight: 'bold', marginBottom: 4 },
  cardLabel: { color: '#9CA3AF', fontSize: 14 },
  
  timeBlock: {
    marginTop: 16, alignItems: 'center', paddingTop: 12,
    borderTopWidth: 1, borderTopColor: '#4B5563',
  },
  timeText: { color: '#E5E7EB', fontSize: 15 },
});