import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';
import { useMoviesStore } from '../src/store/moviesStore';
import { useUserStore } from '../src/store/userStore';
import { STATUS_LIST } from '../src/utils/status';

export default function Profile({ navigate }) {
  const items = useMoviesStore((s) => s.items);
  const user = useUserStore((s) => s.user);

  const counts = STATUS_LIST.map(
    (status) => items.filter((m) => m.status === status).length
  );
  const maxCount = Math.max(1, ...counts);
  const totalMinutes = items
    .filter((m) => m.status === 'watched')
    .reduce((sum, m) => sum + (m.durationMinutes || 0), 0);
  const totalHours = Math.round(totalMinutes / 60);

  return (
    <View style={styles.container}>
      <Navigator activeId="Profile" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="ПРОФИЛЬ" onBack={() => navigate('Back')} />
        <ScrollView>
          <View style={styles.top}>
            <View style={styles.avatar}>
              <View style={styles.avatarHead} />
              <View style={styles.avatarBody} />
            </View>
            <Text style={styles.name}>{user?.name || 'NAME'}</Text>
          </View>

          <View style={styles.stats}>
            <Text style={styles.statsTitle}>statistics</Text>
            <View style={styles.statsRow}>
              <View style={styles.pie} />
              <Text style={styles.statsText}>
                total{'\n'}time{'\n'}watched{'\n'}
                {totalHours} ч
              </Text>
            </View>
          </View>

          <View style={styles.chart}>
            {counts.map((count, i) => (
              <View key={STATUS_LIST[i]} style={styles.barWrap}>
                <Text style={styles.barCount}>{count}</Text>
                <View
                  style={[
                    styles.bar,
                    { height: 12 + (count / maxCount) * 88 },
                  ]}
                />
              </View>
            ))}
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
  stats: { backgroundColor: '#A39274', paddingVertical: 8 },
  statsTitle: { color: '#FFFFFF', textAlign: 'center', fontSize: 16 },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  pie: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#E0B95C',
    borderWidth: 14,
    borderColor: '#2C7A8C',
  },
  statsText: { color: '#FFFFFF', fontSize: 16, textAlign: 'center' },
  chart: {
    height: 150,
    backgroundColor: '#1F4E5F',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingBottom: 8,
  },
  barWrap: { alignItems: 'center', justifyContent: 'flex-end' },
  barCount: { color: '#FFFFFF', fontSize: 12, marginBottom: 2 },
  bar: { width: 22, backgroundColor: '#D9B96A' },
});
