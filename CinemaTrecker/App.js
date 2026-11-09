import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import Home from './pages/DemoScreen';
import Profile from './pages/Profile';
import Watched from './pages/Watched';
import Search from './pages/Search';
import Watching from './pages/Watching';
import Settings from './pages/Settings';
import Recommendations from './pages/Recommendations';
import WillWatch from './pages/WillWatch';

const SCREENS = {
  Home,
  Profile,
  Watched,
  Search,
  Watching,
  Settings,
  Recommendations,
  WillWatch,
};

export default function App() {
  const [history, setHistory] = useState(['Home']);
  const current = history[history.length - 1];

  const navigate = (name) => {
    if (name === 'Back') {
      setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
      return;
    }
    if (name === current) return;
    if (current === 'Home') {
      setHistory([name]);
      return;
    }
    setHistory((h) => [...h, name]);
  };

  const Screen = SCREENS[current];

  return (
    <View style={styles.root}>
      <Screen navigate={navigate} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#111827',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});