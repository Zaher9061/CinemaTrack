import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';

const FILMS = [1, 2, 3];

export default function Recommendations({ navigate }) {
  return (
    <View style={styles.container}>
      <Navigator activeId="Recommendations" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="РЕКОМЕНДАЦИИ" onBack={() => navigate('Back')} />
        <ScrollView>
          {FILMS.map((id) => (
            <View key={id}>
              <View style={styles.card}>
                <Text style={styles.cardText}>ФИЛЬМ</Text>
              </View>
              <Pressable style={styles.action}>
                <Text style={styles.actionText}>Добавить</Text>
              </Pressable>
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
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { color: '#FFFFFF', fontSize: 16 },
  action: {
    height: 30,
    backgroundColor: '#D9D9D9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: { color: '#34C759', fontSize: 14 },
});
