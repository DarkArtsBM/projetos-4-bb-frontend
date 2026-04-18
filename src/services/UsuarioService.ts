import { api } from "@/lib/api";
import {LoginResponseDTO, Usuario} from "@/types/types";

export const UsuarioService = {
    registrar: (dados: any) => api.post("/usuarios/cadastro", dados),
    login: (dados: any) => api.post<LoginResponseDTO>("/usuarios/login", dados),
    listarComuns: () => api.get<Usuario[]>("/usuarios/comuns"),
    promover: (id: number) => api.patch(`/usuarios/${id}/promover`),
    rebaixar: (id: number) => api.patch(`/usuarios/${id}/rebaixar`),
};