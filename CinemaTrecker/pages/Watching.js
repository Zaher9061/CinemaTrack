import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';

const FILMS = [
  { id: 1, progress: 0.7 },
  { id: 2, progress: 0.45 },
  { id: 3, progress: 0.2 },
];

export default function Watching({ navigate }) {
  return (
    <View style={styles.container}>
      <Navigator activeId="Watching" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="ПОКА СМОТРЮ" onBack={() => navigate('Back')} />
        <ScrollView>
          {FILMS.map((film) => (
            <View key={film.id}>
              <View style={styles.card}>
                <Text style={styles.cardText}>ФИЛЬМ</Text>
              </View>
              <View style={styles.barBackground}>
                <View
                  style={[styles.barFill, { width: `${film.progress * 100}%` }]}
                />
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
  card: {
    height: 170,
    backgroundColor: '#00C8D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { color: '#FFFFFF', fontSize: 16 },
  barBackground: {
    height: 30,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  barFill: {
    height: 14,
    backgroundColor: '#F58A1F',
  },
});
