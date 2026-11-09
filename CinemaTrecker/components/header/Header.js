import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Header({ title, onBack }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <Pressable onPress={onBack} hitSlop={10}>
        <Image source={require('../../assets/back.png')} style={styles.back} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 48,
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 22,
    flexShrink: 1,
  },
  back: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
});
