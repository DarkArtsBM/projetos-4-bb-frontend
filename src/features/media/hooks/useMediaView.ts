import { useState, useEffect } from "react";
import { useSelectionStore } from "@/store/useSelectionStore";
import { api } from "@/lib/api";


interface AudioResponseDTO {
    id: number;
    caminhoArquivo: string;
    dataCriacao: string;
    tutorialId: number;
    votos: number;
    idioma: string;
}

// MOCKS PARA DEMOSTRAR O FRONT -------------------------------------------------

const MVP_CONFIG = {
    idiomas: ["Português", "Kayapó", "Tukano"],
    processos: {
        "Pagamento": { id: 1, videoUrl: "https://www.youtube.com/embed/98X02Dz6yfI/", descricao: "Orientações sobre saques, depósitos e transferências." },
        "Serviço": { id: 2, videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", descricao: "Informações sobre os serviços disponíveis nas agências." },
        "Senha": { id: 3, videoUrl: "https://www.youtube.com/embed/F-wOvzPQ2DM/", descricao: "Passo a passo para recuperação de senhas." },
    }
};

const AUDIOS_MOCK: AudioResponseDTO[] = [
    {
        id: 101,
        caminhoArquivo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        votos: 15,
        idioma: "Kayapó",
        tutorialId: 1,
        dataCriacao: "2023-10-01"
    },
    {
        id: 102,
        caminhoArquivo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        votos: 8,
        idioma: "Tukano",
        tutorialId: 1,
        dataCriacao: "2023-10-02"
    },
    {
        id: 103,
        caminhoArquivo: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        votos: 22,
        idioma: "Português",
        tutorialId: 2,
        dataCriacao: "2023-10-03"
    }
];


// -----------------------------------------------------------------------

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


                setAudiosComunidade(dados && dados.length > 0 ? dados : AUDIOS_MOCK.filter(a => a.idioma === selectedLanguage));

            } catch (erro) {

                // FILTRO MOCK: Mostra apenas os áudios do idioma selecionado
                console.warn("Back-end offline. Mostrando áudios de teste.");
                const filtrados = AUDIOS_MOCK.filter(a => a.idioma === selectedLanguage);
                setAudiosComunidade(filtrados);

                //-----------------------------------------------------
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