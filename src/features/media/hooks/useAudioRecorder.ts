import { useState, useRef } from "react";
import {toaster} from "@/components/ui/toaster";
import {useSelectionStore} from "@/store/useSelectionStore";
import {AudioService} from "@/services/AudioService";

export function useAudioRecorder(tutorialId: number, idioma: string | null) {
    const [gravando, setGravando] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [enviando, setEnviando] = useState(false);

    const dispararPlayMuted = useSelectionStore((state) => state.dispararPlayMuted);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const pedacosAudioRef = useRef<BlobPart[]>([]);

    const iniciarGravacao = async () => {
        try {
            dispararPlayMuted();
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            let opcoesMimeType = {};
            if (MediaRecorder.isTypeSupported('audio/webm')) {
                opcoesMimeType = { mimeType: 'audio/webm' };
            } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
                opcoesMimeType = { mimeType: 'audio/mp4' };
            } else if (MediaRecorder.isTypeSupported('audio/aac')) {
                opcoesMimeType = { mimeType: 'audio/aac' };
            }

            const recorder = new MediaRecorder(stream, opcoesMimeType);
            mediaRecorderRef.current = recorder;
            pedacosAudioRef.current = [];

            recorder.ondataavailable = (evento) => {
                if (evento.data.size > 0) pedacosAudioRef.current.push(evento.data);
            };

            recorder.onstop = () => {
                const arquivoFinal = new Blob(pedacosAudioRef.current, { type: recorder.mimeType });
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
        const token = localStorage.getItem("token");

        if (!idioma) return toaster.create({ title: "Atenção", description: "Selecione um idioma!", type: "warning" });
        if (!token) return toaster.create({ title: "Acesso restrito", description: "Você precisa estar logado.", type: "error" });

        setEnviando(true);
        const formData = new FormData();
        formData.append("arquivo", audioBlob, "minha_explicacao.webm");
        formData.append("idioma", idioma);

        try {

            await AudioService.enviarAudio(tutorialId, formData);

            toaster.create({ title: "Sucesso!", description: "Sua explicação ajudará outras pessoas.", type: "success" });
            setAudioBlob(null);
        } catch (erro) {
            console.error("Falha na API:", erro);
            alert("Erro ao enviar o áudio. Verifique sua conexão ou faça login novamente.");
        } finally {
            setEnviando(false);
        }
    };

    return { gravando, audioBlob, enviando, iniciarGravacao, pararGravacao, descartarAudio, enviarAudio };
}