import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppButton, AppInput } from '../src/components/ui';
import { useUserStore } from '../src/store/userStore';

export default function DemoScreen({ navigate }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const doLogin = useUserStore((s) => s.login);

  const handleLogin = () => {
    doLogin(login.trim() || 'NAME', password || 'password');
    navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo} />

      <Text style={styles.title}>Cinema{'\n'}Tracker</Text>

      <View style={styles.form}>
        <AppInput
          placeholder="LOGIN"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
          boxStyle={styles.field}
        />
        <AppInput
          placeholder="PASSWORD"
          value={password}
          onChangeText={setPassword}
          isPassword
          autoCapitalize="none"
          boxStyle={styles.field}
        />
      </View>

      <AppButton title="Войти" onPress={handleLogin} style={styles.button} />
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
  form: {
    width: '100%',
  },
  field: {
    backgroundColor: '#D9D9D9',
    borderRadius: 4,
    minHeight: 40,
  },
  button: {
    width: '100%',
    height: 44,
    borderRadius: 22,
    backgroundColor: '#34C759',
    borderColor: '#34C759',
    marginTop: 8,
  },
});