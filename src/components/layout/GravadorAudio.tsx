"use client";

import { useState, useRef } from "react";
import {  Button,VStack, Text, HStack } from "@chakra-ui/react";
import { FiMic, FiSquare, FiSend, FiTrash2 } from "react-icons/fi";


interface GravadorAudioProps {
    tutorialId: number;
}

export function GravadorAudio({ tutorialId }: GravadorAudioProps) {
    const [gravando, setGravando] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [enviando, setEnviando] = useState(false);


    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const pedacosAudioRef = useRef<BlobPart[]>([]);

    // Ligar o Microfone
    const iniciarGravacao = async () => {
        try {

            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            pedacosAudioRef.current = [];


            recorder.ondataavailable = (evento) => {
                if (evento.data.size > 0) {
                    pedacosAudioRef.current.push(evento.data);
                }
            };


            recorder.onstop = () => {
                const arquivoFinal = new Blob(pedacosAudioRef.current, { type: "audio/webm" });
                setAudioBlob(arquivoFinal);


                stream.getTracks().forEach(track => track.stop());
            };

            recorder.start();
            setGravando(true);
        } catch (erro) {
            console.error("Erro ao acessar o microfone:", erro);
            alert("Precisamos de permissão para usar o microfone!");
        }
    };

    //  Parar
    const pararGravacao = () => {
        if (mediaRecorderRef.current && gravando) {
            mediaRecorderRef.current.stop();
            setGravando(false);
        }
    };

    //  Descartar
    const descartarAudio = () => {
        setAudioBlob(null);
    };

    //  Enviar para o Java
    const enviarAudio = async () => {
        console.log("ID do Tutorial:", tutorialId);
        if (!audioBlob) return;
        setEnviando(true);

        const formData = new FormData();
        formData.append("arquivo", audioBlob, "minha_explicacao.webm");

        // Token que você gerado
        const meuTokenJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJmYXEtYXBpIiwic3ViIjoidGVzdGVAdGVzdGUuY29tIiwiaWQiOjEsImV4cCI6MTc3NDUwODAwM30.nAeFeug-Im81eVIy31iQFcJE135wE3kSwt6qzyueK6Y";

        try {
            const resposta = await fetch(`http://localhost:8080/api/audio/${tutorialId}/audios`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${meuTokenJWT}`,

                },
                body: formData,
            });

            if (resposta.ok) {
                alert("Áudio enviado com sucesso para o servidor!");
                setAudioBlob(null);

            } else {
                alert("Erro ao enviar. Verifique se você está logado e se o Token está correto.");
            }
        } catch (erro) {
            console.error("Falha na comunicação com a API:", erro);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <VStack p={4} borderWidth="1px" borderRadius="lg" bg="gray.50" align="center" gap={4}>
            <Text fontWeight="bold" color="gray.700">Grave sua explicação</Text>

            {!audioBlob ? (
                <Button
                    colorPalette={gravando ? "red" : "blue"}
                    onClick={gravando ? pararGravacao : iniciarGravacao}
                    animation={gravando ? "pulse 1.5s infinite" : "none"}
                    display="flex"
                    gap="2"
                >
                    {gravando ? <FiSquare /> : <FiMic />}
                    {gravando ? "Parar Gravação" : "Começar a Gravar"}
                </Button>
            ) : (
                <VStack w="full">
                    <audio src={URL.createObjectURL(audioBlob)} controls style={{ width: "100%" }} />

                    <HStack w="full" justify="space-between" mt={2}>
                        <Button variant="ghost" colorPalette="red" onClick={descartarAudio} display="flex" gap="2">
                            <FiTrash2 />
                            Descartar
                        </Button>

                        <Button
                            colorPalette="green"
                            onClick={enviarAudio}
                            loading={enviando}
                            display="flex"
                            gap="2"
                        >
                            <FiSend />
                            Enviar
                        </Button>
                    </HStack>
                </VStack>
            )}
        </VStack>
    );
}