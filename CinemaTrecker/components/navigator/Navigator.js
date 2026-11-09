import React, { useRef, useState } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text } from 'react-native';

const ICONS = {
  menu: require('../../assets/menu.png'),
  watched: require('../../assets/watched.png'),
  search: require('../../assets/search.png'),
  watching: require('../../assets/watching.png'),
  settings: require('../../assets/settings.png'),
  profile: require('../../assets/profile.png'),
  back: require('../../assets/back.png'),
};

const ITEMS = [
  { id: 'watched', label: 'Просмотрено', screen: 'Watched', icon: ICONS.watched },
  { id: 'search', label: 'Поиск', screen: 'Search', icon: ICONS.search },
  { id: 'watching', label: 'Пока смотрю', screen: 'Watching', icon: ICONS.watching },
  { id: 'settings', label: 'Настройки', screen: 'Settings', icon: ICONS.settings },
  { id: 'profile', label: 'Профиль', screen: 'Profile', icon: ICONS.profile },
  { id: 'back', label: 'Назад', screen: 'Back', icon: ICONS.back },
];

const COLLAPSED_WIDTH = 68;
const EXPANDED_WIDTH = 260;

export default function Navigator({
  activeId = null,
  onNavigate = () => {},
  startOpen = false,
}) {
  const [open, setOpen] = useState(startOpen);
  const width = useRef(
    new Animated.Value(startOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH)
  ).current;

  const toggle = () => {
    Animated.timing(width, {
      toValue: open ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
      duration: 220,
      useNativeDriver: false,
    }).start();
    setOpen(!open);
  };

  return (
    <Animated.View style={[styles.sidebar, { width }]}>
      <Pressable onPress={toggle} style={styles.menuButton} hitSlop={8}>
        <Image source={ICONS.menu} style={styles.menuIcon} />
      </Pressable>

      {ITEMS.map((item) => {
        const active = item.screen === activeId;
        return (
          <Pressable
            key={item.id}
            onPress={() => onNavigate(item.screen)}
            style={({ pressed }) => [styles.item, pressed && styles.pressed]}
          >
            <Image source={item.icon} style={styles.icon} />
            {open && (
              <Text
                numberOfLines={1}
                style={[styles.label, active && styles.labelActive]}
              >
                {item.label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    height: '100%',
    backgroundColor: '#141B7A',
    borderRightWidth: 2,
    borderRightColor: '#1E90FF',
    paddingTop: 16,
    overflow: 'hidden',
  },
  menuButton: {
    height: 48,
    justifyContent: 'center',
    paddingLeft: 16,
    marginBottom: 12,
  },
  menuIcon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingLeft: 4,
  },
  pressed: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  icon: {
    width: 56,
    height: 56,
    resizeMode: 'contain',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 8,
    flexShrink: 1,
  },
  labelActive: {
    textDecorationLine: 'underline',
    textDecorationColor: '#1E90FF',
  },
});
