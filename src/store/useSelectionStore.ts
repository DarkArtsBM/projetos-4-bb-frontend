import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SelectionState {
    selectedLanguage: string | null;
    selectProcess: string | null;
    gatilhoPlayMuted: number;
    setLanguage: (nome: string) => void;
    setProcess: (nome: string) => void;
    dispararPlayMuted: () => void;
    reset: () => void;
}

export const useSelectionStore = create<SelectionState>()(
    persist(
        (set) => ({
            selectedLanguage: null,
            selectProcess: null,
            gatilhoPlayMuted: 0,

            setLanguage: (nome: any) => set({ selectedLanguage: nome }),
            setProcess: (nome: any) => set({ selectProcess: nome }),
            dispararPlayMuted: () => set({ gatilhoPlayMuted: Date.now() }),
            reset: () => set({ selectedLanguage: null, selectProcess: null }),
        }),
        {
            name: 'selecao-usuario',
            partialize: (state) => ({
                selectedLanguage: state.selectedLanguage,
                selectProcess: state.selectProcess
            }),
        }
    )
);