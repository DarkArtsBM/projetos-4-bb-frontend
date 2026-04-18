import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {SelectionState} from "@/types/types";

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