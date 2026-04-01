import { useState, useRef } from "react";
import { api } from "@/lib/api";
import {toaster} from "@/components/ui/toaster";

export function useAudioRecorder(tutorialId: number, idioma: string | null) {
    const [gravando, setGravando] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [enviando, setEnviando] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const pedacosAudioRef = useRef<BlobPart[]>([]);

    const iniciarGravacao = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            pedacosAudioRef.current = [];

            recorder.ondataavailable = (evento) => {
                if (evento.data.size > 0) pedacosAudioRef.current.push(evento.data);
            };

            recorder.onstop = () => {
                const arquivoFinal = new Blob(pedacosAudioRef.current, { type: "audio/webm" });
                setAudioBlob(arquivoFinal);
                stream.getTracks().forEach(track => track.stop());
            };

            recorder.start();
            setGravando(true);
        } catch (erro) {
            toaster.create({ title: "Microfone bloqueado", description: "Permita o uso do microfone para gravar.", type: "error" });
        }
    };

    const pararGravacao = () => {
        if (mediaRecorderRef.current && gravando) {
            mediaRecorderRef.current.stop();
            setGravando(false);
        }
    };

    const descartarAudio = () => setAudioBlob(null);

    const enviarAudio = async () => {
        if (!audioBlob) return;

        // Trava de segurança
        if (!idioma) {
            toaster.create({ title: "Atenção", description: "Selecione um idioma antes de gravar!", type: "warning" });
            return;
        }

        setEnviando(true);

        const formData = new FormData();
        formData.append("arquivo", audioBlob, "minha_explicacao.webm");
        // Mandamos o idioma direto no FormData para o Spring Boot pegar via @RequestParam
        formData.append("idioma", idioma);

        try {
            // A MÁGICA AQUI: O api.post já pega o Token sozinho e trata os erros!
            // Além disso, a URL corrigida batendo com o seu AudioController
            const resposta = await api.post(`/audio/${tutorialId}`, formData);

            if (resposta) {
                toaster.create({ title: "Sucesso!", description: "Sua explicação ajudará outras pessoas.", type: "success" });
                setAudioBlob(null); // Limpa o áudio da tela
            }
        } catch (erro) {
            // O erro 401/403 (Sessão Expirada) já é tratado dentro do próprio api.ts!
            console.error("Falha na API:", erro);
            alert("Erro ao enviar o áudio. Verifique sua conexão ou faça login novamente.");
        } finally {
            setEnviando(false);
        }
    };
    return {
        gravando,
        audioBlob,
        enviando,
        iniciarGravacao,
        pararGravacao,
        descartarAudio,
        enviarAudio
    };
}