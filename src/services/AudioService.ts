import { api } from "@/lib/api";
import { Audio } from "@/types/types";

export const AudioService = {
    listarPendentes: () => api.get<Audio[]>("/audio/moderacao/pendentes"),
    listarAprovados: () => api.get<Audio[]>("/audio/aprovados"),
    aprovar: (id: number) => api.patch(`/audio/${id}/aprovar`),
    reprovar: (id: number) => api.delete(`/audio/${id}/reprovar`),
    deletarPostado: (id: number) => api.delete(`/audio/${id}`),
    votar: (audioId: number) => api.patch<{ votos: number }>(`/audio/${audioId}/upvote`),
    enviarAudio: (tutorialId: number, formData: FormData) => api.post(`/audio/${tutorialId}`, formData),
    listarPorTutorialEIdioma: (tutorialId: number, idioma: string) => api.get<Audio[]>(`/audio/${tutorialId}?idioma=${idioma}`),
};