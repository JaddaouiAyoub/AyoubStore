import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AdminState } from '@/types';

// Credentials admin (en production, utiliser un vrai backend)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'ayoubstore2024';

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      login: (username: string, password: string) => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          set({ isAuthenticated: true });
          return true;
        }
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false });
      }
    }),
    {
      name: 'ayoubstore-admin',
      version: 1
    }
  )
);
