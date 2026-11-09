import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_MOVIES } from '../data/mockMovies';
import { delay } from '../utils/delay';

export const useMoviesStore = create(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,
      error: null,
      hasHydrated: false,

      setHasHydrated: (value) => set({ hasHydrated: value }),

      loadMovies: async () => {
        set({ isLoading: true, error: null });
        try {
          await delay(1000);
          if (get().items.length === 0) {
            set({ items: MOCK_MOVIES });
          }
          set({ isLoading: false });
        } catch (e) {
          set({ isLoading: false, error: 'Не удалось загрузить список' });
        }
      },

      addMovie: async (data) => {
        set({ error: null });
        try {
          await delay(400);
          const now = new Date().toISOString();
          const status = data.status || 'planned';
          const movie = {
            id: `movie-${Date.now()}`,
            title: '',
            year: null,
            type: 'movie',
            genres: [],
            director: '',
            durationMinutes: 0,
            priority: 'medium',
            progress: 0,
            rating: null,
            notes: '',
            recommendedBy: null,
            location: null,
            photos: [],
            ...data,
            status,
            statusHistory: [
              { status, changedAt: now, comment: 'Добавлено в приложение' },
            ],
            createdAt: now,
            updatedAt: now,
          };
          set({ items: [movie, ...get().items] });
          return movie;
        } catch (e) {
          set({ error: 'Не удалось добавить фильм' });
          return null;
        }
      },

      updateMovie: async (id, patch) => {
        set({ error: null });
        try {
          await delay(400);
          const now = new Date().toISOString();
          set({
            items: get().items.map((item) => {
              if (item.id !== id) return item;
              const next = { ...item, ...patch, updatedAt: now };
              if (patch.status && patch.status !== item.status) {
                next.statusHistory = [
                  ...item.statusHistory,
                  {
                    status: patch.status,
                    changedAt: now,
                    comment: 'Статус изменён',
                  },
                ];
              }
              return next;
            }),
          });
          return true;
        } catch (e) {
          set({ error: 'Не удалось обновить фильм' });
          return false;
        }
      },

      removeMovie: async (id) => {
        set({ error: null });
        try {
          await delay(300);
          set({ items: get().items.filter((item) => item.id !== id) });
          return true;
        } catch (e) {
          set({ error: 'Не удалось удалить фильм' });
          return false;
        }
      },

      resetToMock: async () => {
        set({ isLoading: true });
        await delay(500);
        set({ items: MOCK_MOVIES, isLoading: false, error: null });
      },
    }),
    {
      name: 'cinema-movies-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHasHydrated(true);
      },
    }
  )
);
