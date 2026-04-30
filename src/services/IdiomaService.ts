import { api } from "@/lib/api";

export const IdiomaService = {
    listarTodos: async () => {
        return await api.get<any>("/idiomas");
    },
    criar: async (dados: { nome: string; codigo: string }) => {
        return await api.post<any>("/idiomas", dados);
    },
    deletar: async (id: number) => {
        await api.delete(`/idiomas/${id}`);
    }
};