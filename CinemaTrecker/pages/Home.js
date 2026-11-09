import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Home({ navigate }) {
  return (
    <View style={styles.container}>
      <View style={styles.logo} />
      <Text style={styles.title}>Cinema{'\n'}Tracker</Text>

      <View style={styles.field}>
        <Text style={styles.fieldText}>LOGIN</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.fieldText}>PASSWORD</Text>
      </View>

      <Pressable style={styles.button} onPress={() => navigate('Profile')}>
        <Text style={styles.buttonText}>Войти</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 24,
  },
  logo: {
    width: 110,
    height: 110,
    borderRadius: 8,
    backgroundColor: '#1E3A5F',
    borderWidth: 2,
    borderColor: '#1E90FF',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 44,
    textAlign: 'center',
    marginVertical: 24,
  },
  field: {
    width: '100%',
    height: 40,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  fieldText: {
    color: '#777777',
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 44,
    borderRadius: 22,
    backgroundColor: '#34C759',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});
