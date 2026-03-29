// src/hooks/useAudioRecorder.ts
import { useState, useRef } from "react";

export function useAudioRecorder(tutorialId: number) {
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
            alert("Precisamos de permissão para usar o microfone!");
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
        setEnviando(true);

        const formData = new FormData();
        formData.append("arquivo", audioBlob, "minha_explicacao.webm");

        const meuTokenJWT = "COLE_SEU_TOKEN_AQUI";

        try {
            const resposta = await fetch(`http://localhost:8080/api/audio/${tutorialId}/audios`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${meuTokenJWT}` },
                body: formData,
            });

            if (resposta.ok) {
                alert("Áudio enviado com sucesso!");
                setAudioBlob(null);
            } else {
                alert("Erro ao enviar. Verifique o Token.");
            }
        } catch (erro) {
            console.error("Falha na API:", erro);
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