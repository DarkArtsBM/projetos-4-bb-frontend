import { useState, useEffect } from "react";
import { useSelectionStore } from "@/store/useSelectionStore";
import { Audio, Tutorial } from "@/types/types"
import {TutorialService} from "@/services/TutorialService";
import {AudioService} from "@/services/AudioService";

// 3. Idiomas fixos no Front (puxar do banco depois)
const IDIOMAS_DISPONIVEIS = ["Português", "Kayapó", "Tukano"];

export function useMediaView() {
    const { selectedLanguage, selectProcess, setLanguage, setProcess } = useSelectionStore();

    // Estados
    const [tutoriais, setTutoriais] = useState<Tutorial[]>([]);
    const [audiosComunidade, setAudiosComunidade] = useState<Audio[]>([]);
    const [carregandoAudios, setCarregandoAudios] = useState(false);

    // EFEITO 1: Busca a lista de Tutoriais
    useEffect(() => {
        async function buscarTutoriais() {
            try {
                // Vai no Java buscar os processos (Pagamento, Serviço, etc)
                const dados = await TutorialService.listarTodos();
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

                const dados = await AudioService.listarPorTutorialEIdioma(conteudoAtual.id, selectedLanguage);
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