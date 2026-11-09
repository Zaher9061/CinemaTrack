import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';
import { AppCard, StatusBadge } from '../src/components/ui';
import { useMoviesStore } from '../src/store/moviesStore';
import { useUserStore } from '../src/store/userStore';
import { PRIORITY_LABELS } from '../src/utils/status';

export default function Profile({ navigate }) {
  const items = useMoviesStore((s) => s.items);
  const isLoading = useMoviesStore((s) => s.isLoading);
  const hasHydrated = useMoviesStore((s) => s.hasHydrated);
  const loadMovies = useMoviesStore((s) => s.loadMovies);
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (hasHydrated) loadMovies();
  }, [hasHydrated]);

  const renderHeader = () => (
    <View>
      <View style={styles.top}>
        <View style={styles.avatar}>
          <View style={styles.avatarHead} />
          <View style={styles.avatarBody} />
        </View>
        <Text style={styles.name}>{user?.name || 'NAME'}</Text>
      </View>

      <Text style={styles.listTitle}>Мои фильмы ({items.length})</Text>
      {isLoading && items.length === 0 ? (
        <Text style={styles.loading}>Загрузка...</Text>
      ) : null}
    </View>
  );

  const renderItem = ({ item }) => (
    <AppCard style={styles.card}>
      <Text style={styles.cardTitle}>
        {item.title} ({item.year})
      </Text>
      <StatusBadge status={item.status} style={styles.badge} />
      <Text style={styles.cardText}>
        {item.director} · Приоритет: {PRIORITY_LABELS[item.priority]}
      </Text>
    </AppCard>
  );

  return (
    <View style={styles.container}>
      <Navigator activeId="Profile" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="ПРОФИЛЬ" onBack={() => navigate('Back')} />
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#111827' },
  content: { flex: 1 },
  list: { paddingBottom: 24 },
  top: { alignItems: 'center', paddingVertical: 24 },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#DCE6FF',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarHead: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4A9BF5',
    marginTop: 22,
  },
  avatarBody: {
    width: 90,
    height: 60,
    borderRadius: 45,
    backgroundColor: '#4A9BF5',
    marginTop: 8,
  },
  name: { color: '#FFFFFF', fontSize: 18, marginTop: 12 },
  listTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#A39274',
    paddingVertical: 8,
    marginBottom: 12,
  },
  loading: { color: '#94A3B8', textAlign: 'center', marginBottom: 12 },
  card: {
    backgroundColor: '#1E293B',
    marginHorizontal: 12,
    marginBottom: 10,
    padding: 12,
  },
  cardTitle: { color: '#FFFFFF', fontSize: 16, marginBottom: 6 },
  badge: { marginBottom: 6 },
  cardText: { color: '#94A3B8', fontSize: 13 },
});