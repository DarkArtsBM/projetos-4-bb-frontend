import { create } from 'zustand';

interface SelectionState {
  selectedLanguage: string | null;
  selectProcess: string | null;
  setLanguage: (nome: string) => void;
  setProcess: (nome: string) => void;
  reset: () => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedLanguage: null,
  selectProcess: null,
  setLanguage: (nome) => set({ selectedLanguage: nome }),
  setProcess: (nome) => set({ selectProcess: nome }),
  reset: () => set({ selectedLanguage: null, selectProcess: null }),
}));