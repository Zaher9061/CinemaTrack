import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  Image, Alert, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Navigator from '../components/navigator/Navigator';
import Header from '../components/header/Header';
import { useUserStore } from '../src/store/userStore';

export default function Settings({ navigate }) {
  const user = useUserStore((s) => s.user);
  const updateProfile = useUserStore((s) => s.updateProfile);

  // Локальные состояния для формы
  const [name, setName] = useState(user?.name || '');
  const [avatarUri, setAvatarUri] = useState(user?.avatarUri || null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Ошибка', 'Нужно разрешение на доступ к галерее!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const saveProfile = async () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Имя не может быть пустым');
      return;
    }
    
    // Используем функцию из вашего стора
    await updateProfile({ name, avatarUri });
    Alert.alert('Успех', 'Профиль обновлен!');
  };

  return (
    <View style={styles.container}>
      <Navigator activeId="Settings" onNavigate={navigate} />
      <View style={styles.content}>
        <Header title="НАСТРОЙКИ" onBack={() => navigate('Back')} />
        
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            
            <Text style={styles.sectionTitle}>Настройки профиля</Text>

            {/* Блок с аватаркой */}
            <View style={styles.avatarContainer}>
              <TouchableOpacity onPress={pickImage} style={styles.avatarButton}>
                {avatarUri ? (
                  <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarPlaceholderText}>+ Фото</Text>
                  </View>
                )}
              </TouchableOpacity>
              <Text style={styles.hintText}>Нажмите, чтобы сменить фото</Text>
            </View>

            {/* Поле ввода имени */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ваше имя</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Введите имя"
                placeholderTextColor="#6B7280"
              />
            </View>

            {/* Кнопка сохранения */}
            <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
              <Text style={styles.saveButtonText}>Сохранить изменения</Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#111827' },
  content: { flex: 1 },
  scrollContent: { padding: 20 },
  
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  
  avatarContainer: { alignItems: 'center', marginBottom: 30 },
  avatarButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  avatarImage: { width: '100%', height: '100%' },
  avatarPlaceholder: { justifyContent: 'center', alignItems: 'center' },
  avatarPlaceholderText: { color: '#9CA3AF', fontSize: 16 },
  hintText: { color: '#6B7280', fontSize: 12, marginTop: 8 },

  inputContainer: { marginBottom: 20 },
  label: { color: '#D1D5DB', fontSize: 14, marginBottom: 8 },
  input: {
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    padding: 12,
    color: '#FFFFFF',
    fontSize: 16,
  },

  saveButton: {
    backgroundColor: '#3B82F6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});