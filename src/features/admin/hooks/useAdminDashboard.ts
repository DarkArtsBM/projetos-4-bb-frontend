"use client";

import { useState, useEffect } from "react";
import { toaster } from "@/components/ui/toaster";
import { api } from "@/lib/api";
import { Tutorial, Audio, Usuario } from "@/types/types";
import { formatarUrlYoutube } from "@/utils/youtube";

export function useAdminDashboard() {
    // 1. Estados de Navegação e Dados
    const [abaAtiva, setAbaAtiva] = useState<"TUTORIAIS" | "MODERACAO" | "USUARIOS">("TUTORIAIS");
    const [tutoriais, setTutoriais] = useState<Tutorial[]>([]);
    const [audiosPendentes, setAudiosPendentes] = useState<Audio[]>([]);
    const [usuariosComuns, setUsuariosComuns] = useState<Usuario[]>([]);
    const [audiosAprovados, setAudiosAprovados] = useState<Audio[]>([]);
    // Transformamos o cargo em um estado do React
    const [cargoLogado, setCargoLogado] = useState<string | null>(null);

    // 2. Estados do Formulário
    const [novaPergunta, setNovaPergunta] = useState("");
    const [novaUrl, setNovaUrl] = useState("");
    const [carregandoForm, setCarregandoForm] = useState(false);

    const rebaixarUsuario = async (id: number, nome: string) => {
        if (!window.confirm(`Deseja realmente remover os poderes de Admin de ${nome}?`)) return;
        try {
            await api.patch(`/usuarios/${id}/rebaixar`);
            toaster.create({ title: `${nome} rebaixado para Usuário comum.`, type: "success" });
            buscarUsuariosComuns(); // Recarrega a lista
        } catch (e: any) {
            toaster.create({ title: "Sem permissão!", description: e.response?.data || "Apenas o Super Admin pode fazer isso.", type: "error" });
        }
    };

    // 3. Funções de Busca (GET)
    const buscarTutoriais = async () => {
        try { const res = await api.get<Tutorial[]>("/tutoriais"); setTutoriais(res || []); }
        catch (e) { console.error("Erro ao buscar tutoriais"); }
    };

    const buscarAudiosPendentes = async () => {
        try { const res = await api.get<Audio[]>("/audio/moderacao/pendentes"); setAudiosPendentes(res || []); }
        catch (e) { console.error("Erro ao buscar áudios pendentes"); }
    };

    const buscarUsuariosComuns = async () => {
        try { const res = await api.get<Usuario[]>("/usuarios/comuns"); setUsuariosComuns(res || []); }
        catch (e) { console.error("Erro ao buscar usuários"); }
    };

    const buscarAudiosAprovados = async () => {
        try {
            const res = await api.get<Audio[]>("/audio/aprovados");
            setAudiosAprovados(res || []);
        } catch (e) {
            console.error("Erro ao buscar aprovados:", e);
        }
    };

    // Carrega os dados ao trocar de aba
    useEffect(() => {

        setCargoLogado(localStorage.getItem("cargo"));

        if (abaAtiva === "TUTORIAIS") buscarTutoriais();
        if (abaAtiva === "MODERACAO") {
            buscarAudiosPendentes();
            buscarAudiosAprovados();
        }
        if (abaAtiva === "USUARIOS") buscarUsuariosComuns();
    }, [abaAtiva]);

    // 4. Funções de Ação (POST, PATCH, DELETE)
    const criarTutorial = async () => {
        if (!novaPergunta || !novaUrl) {
            return toaster.create({ title: "Preencha tudo!", type: "warning" });
        }

        setCarregandoForm(true);
        try {
            const urlProntaParaBanco = formatarUrlYoutube(novaUrl);
            await api.post("/tutoriais", {
                pergunta: novaPergunta,
                youtubeUrl: urlProntaParaBanco
            });
            toaster.create({ title: "Tutorial criado!", type: "success" });
            setNovaPergunta("");
            setNovaUrl("");
            buscarTutoriais();
        } catch (e) {
            toaster.create({ title: "Erro ao criar", type: "error" });
        } finally {
            setCarregandoForm(false);
        }
    };

    const deletarTutorial = async (id: number) => {
        if (!window.confirm("🚨 ATENÇÃO: Deletar este tutorial apagará TODOS os áudios associados a ele. Continuar?")) return;
        try {
            await api.delete(`/tutoriais/${id}`);
            toaster.create({ title: "Tutorial demolido!", type: "success" });
            buscarTutoriais();
        } catch (e) { toaster.create({ title: "Erro ao deletar", type: "error" }); }
    };

    const aprovarAudio = async (id: number) => {
        try {
            await api.patch(`/audio/${id}/aprovar`);
            toaster.create({ title: "Áudio aprovado!", type: "success" });
            buscarAudiosPendentes();
            buscarAudiosAprovados();
        } catch (e) { toaster.create({ title: "Erro ao aprovar", type: "error" }); }
    };

    const reprovarAudio = async (id: number) => {
        if (!window.confirm("Tem certeza que deseja apagar permanentemente este áudio?")) return;
        try {
            await api.delete(`/audio/${id}/reprovar`);
            toaster.create({ title: "Áudio apagado.", type: "success" });
            buscarAudiosPendentes();
        } catch (e) { toaster.create({ title: "Erro ao reprovar", type: "error" }); }
    };

    const excluirAudioPostado = async (id: number) => {
        if (!window.confirm("Deseja realmente excluir este áudio que já está publicado?")) return;
        try {
            await api.delete(`/audio/${id}`);
            toaster.create({ title: "Áudio removido do ar!", type: "success" });
            buscarAudiosAprovados();
        } catch (e) {
            toaster.create({ title: "Erro ao excluir", type: "error" });
        }
    };

    const promoverUsuario = async (id: number, nome: string) => {
        if (!window.confirm(`Tem certeza que deseja dar poderes de ADMIN para ${nome}?`)) return;
        try {
            await api.patch(`/usuarios/${id}/promover`);
            toaster.create({ title: `${nome} promovido com sucesso!`, type: "success" });
            buscarUsuariosComuns();
        } catch (e) { toaster.create({ title: "Erro ao promover", type: "error" }); }
    };

    // 5. Retorno ÚNICO E ORGANIZADO para a View
    return {
        estados: {
            abaAtiva,
            tutoriais,
            audiosPendentes,
            usuariosComuns,
            audiosAprovados,
            cargoLogado,
            form: { novaPergunta, novaUrl, carregandoForm }
        },
        acoes: {
            setAbaAtiva,
            setNovaPergunta,
            setNovaUrl,
            criarTutorial,
            deletarTutorial,
            aprovarAudio,
            reprovarAudio,
            promoverUsuario,
            excluirAudioPostado,
            rebaixarUsuario
        }
    };
}