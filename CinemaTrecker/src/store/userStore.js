import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { delay } from '../utils/delay';

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      hasHydrated: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),

      login: async (login, password) => {
        set({ isLoading: true, error: null });
        await delay(800);

        if (!login || !password) {
          set({ isLoading: false, error: 'Введите логин и пароль' });
          return false;
        }

        set({
          isLoading: false,
          isAuthenticated: true,
          user: {
            id: 'user-1',
            name: login,
            login,
            avatarUri: null,
          },
        });
        return true;
      },

      logout: () => set({ user: null, isAuthenticated: false, error: null }),

      updateProfile: async (patch) => {
        await delay(300);
        const current = get().user;
        if (!current) return;
        set({ user: { ...current, ...patch } });
      },
    }),
    {
      name: 'cinema-user-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      },
    }
  )
);
