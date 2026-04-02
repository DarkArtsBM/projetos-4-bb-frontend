import { useState, useEffect } from "react";
import { useSelectionStore } from "@/store/useSelectionStore";
import { api } from "@/lib/api";

// 1. Tipagem dos Áudios
interface AudioResponseDTO {
    id: number;
    caminhoArquivo: string;
    dataCriacao: string;
    tutorialId: number;
    votos: number;
    idioma: string;
}

// 2. Tipagem dos Tutoriais (Processos) vindos do banco
interface TutorialDTO {
    id: number;
    pergunta: string;
    descricao: string;
    youtubeUrl: string;
}

// 3. Idiomas podem continuar fixos no Front (ou vir do banco se preferir)
const IDIOMAS_DISPONIVEIS = ["Português", "Kayapó", "Tukano"];

export function useMediaView() {
    const { selectedLanguage, selectProcess, setLanguage, setProcess } = useSelectionStore();

    // Estados
    const [tutoriais, setTutoriais] = useState<TutorialDTO[]>([]);
    const [audiosComunidade, setAudiosComunidade] = useState<AudioResponseDTO[]>([]);
    const [carregandoAudios, setCarregandoAudios] = useState(false);

    // EFEITO 1: Busca a lista de Tutoriais (Processos) assim que a tela abre
    useEffect(() => {
        async function buscarTutoriais() {
            try {
                // Vai no Java buscar os processos (Pagamento, Serviço, etc)
                const dados = await api.get<TutorialDTO[]>("/tutoriais");
                setTutoriais(dados || []);
            } catch (error) {
                console.error("Erro ao buscar a lista de tutoriais:", error);
            }
        }
        buscarTutoriais();
    }, []);

    // Deriva os dados da tela com base no que veio do banco
    const processosNomes = tutoriais.map(t => t.pergunta);
    const conteudoAtual = tutoriais.find(t => t.pergunta === selectProcess) || null;

    // EFEITO 2: Busca os Áudios quando o usuário escolhe um idioma e um processo
    useEffect(() => {
        async function buscarAudios() {
            // Se não escolheu idioma ou processo ainda, limpa a lista e para por aqui
            if (!selectedLanguage || !conteudoAtual) {
                setAudiosComunidade([]);
                return;
            }

            setCarregandoAudios(true);
            try {

                const dados = await api.get<AudioResponseDTO[]>(`/audio/${conteudoAtual.id}?idioma=${selectedLanguage}`);

                // Se voltar dados, preenche. Se voltar vazio, deixa a lista vazia.
                setAudiosComunidade(dados || []);

            } catch (erro) {
                console.error("Erro ao buscar áudios reais:", erro);
                setAudiosComunidade([]); // Garante que a tela não quebre
            } finally {
                setCarregandoAudios(false);
            }
        }

        buscarAudios();
    }, [selectedLanguage, conteudoAtual]); // Roda de novo se mudar idioma ou processo

    return {
        estados: {
            selectedLanguage,
            selectProcess,
            audiosComunidade,
            carregandoAudios,
            processosNomes,
            conteudoAtual
        },
        acoes: { setLanguage, setProcess },
        configs: { idiomas: IDIOMAS_DISPONIVEIS }
    };
}