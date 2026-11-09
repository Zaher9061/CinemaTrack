import React, { useState } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';

export default function Settings({ navigate }) {
  const [notifications, setNotifications] = useState(true);
  const [openProfile, setOpenProfile] = useState(true);

  return (
    <View style={styles.container}>
      <Navigator activeId="Settings" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="НАСТРОЙКИ" onBack={() => navigate('Back')} />

        <View style={styles.row}>
          <Text style={styles.label}>🔔  Уведомления</Text>
          <Switch value={notifications} onValueChange={setNotifications} />
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Открытый профиль</Text>
          <Switch value={openProfile} onValueChange={setOpenProfile} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#000000' },
  content: { flex: 1 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  label: { color: '#FFFFFF', fontSize: 16 },
});
