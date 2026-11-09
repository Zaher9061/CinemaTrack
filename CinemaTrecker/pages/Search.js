import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';

export default function Search({ navigate }) {
  return (
    <View style={styles.container}>
      <Navigator activeId="Search" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="ПОИСК" onBack={() => navigate('Back')} />
        <View style={styles.center}>
          <Text style={styles.text}>Экран поиска</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#111827' },
  content: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { color: '#FFFFFF', fontSize: 18 },
});
