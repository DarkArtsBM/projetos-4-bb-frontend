import { useState, useEffect } from "react";
import { useSelectionStore } from "@/store/useSelectionStore";
import { api } from "@/lib/api";

// Reutilizamos a tipagem aqui
interface AudioResponseDTO {
    id: number;
    caminhoArquivo: string;
    dataCriacao: string;
    tutorialId: number;
    votos: number;
    idioma: string;
}

// Passamos o MVP_CONFIG para cá (ou importe de um arquivo de constantes)
const MVP_CONFIG = {
    idiomas: ["Português", "Kayapó", "Tukano"],
    processos: {
        "Pagamento": { id: 1, videoUrl: "https://www.youtube.com/embed/98X02Dz6yfI/", descricao: "Orientações sobre saques, depósitos e transferências." },
        "Serviço": { id: 2, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", descricao: "Informações sobre os serviços disponíveis nas agências." },
        "Senha": { id: 3, videoUrl: "https://www.youtube.com/embed/F-wOvzPQ2DM/", descricao: "Passo a passo para recuperação de senhas." },
    }
};

export function useMediaView() {
    const { selectedLanguage, selectProcess, setLanguage, setProcess } = useSelectionStore();
    const [audiosComunidade, setAudiosComunidade] = useState<AudioResponseDTO[]>([]);
    const [carregandoAudios, setCarregandoAudios] = useState(false);

    const processosNomes = Object.keys(MVP_CONFIG.processos);
    const conteudoAtual = selectProcess ? MVP_CONFIG.processos[selectProcess as keyof typeof MVP_CONFIG.processos] : null;

    useEffect(() => {
        async function buscarAudios() {
            if (!selectedLanguage || !conteudoAtual) return;

            setCarregandoAudios(true);
            try {
                const dados = await api.get<AudioResponseDTO[]>(`/audio/${conteudoAtual.id}?idioma=${selectedLanguage}`);
                setAudiosComunidade(dados || []);
            } catch (erro) {
                console.error("Erro ao buscar áudios:", erro);
            } finally {
                setCarregandoAudios(false);
            }
        }

        buscarAudios();
    }, [selectedLanguage, conteudoAtual]);

    return {
        estados: { selectedLanguage, selectProcess, audiosComunidade, carregandoAudios, processosNomes, conteudoAtual },
        acoes: { setLanguage, setProcess },
        configs: { idiomas: MVP_CONFIG.idiomas }
    };
}