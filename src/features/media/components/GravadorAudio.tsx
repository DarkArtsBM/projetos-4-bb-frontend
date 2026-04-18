"use client";

import { Button, VStack, Text, HStack } from "@chakra-ui/react";
import { FiMic, FiSquare, FiSend, FiTrash2 } from "react-icons/fi";
import { useAudioRecorder } from "@/features/media/hooks/useAudioRecorder";
import {GravadorAudioProps} from "@/types/types";


export function GravadorAudio({ tutorialId, idioma }: GravadorAudioProps) {

    const {
        gravando, audioBlob, enviando,
        iniciarGravacao, pararGravacao, descartarAudio, enviarAudio
    } = useAudioRecorder(tutorialId, idioma);

    return (
        <VStack w="full" p={4} borderWidth="1px" borderRadius="lg" bg="gray.50" align="center" gap={4}>
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
                    {gravando ? "Parar" : "Começar a Gravar"}
                </Button>
            ) : (
                <VStack w="full">

                    {/* URL.createObjectURL ainda é usado aqui no visual para o player */}

                    <audio src={URL.createObjectURL(audioBlob)} controls style={{ width: "100%" }} />

                    <HStack w="full" justify="space-between" mt={2}>
                        <Button variant="ghost" colorPalette="red" onClick={descartarAudio} display="flex" gap="2">
                            <FiTrash2 /> Descartar
                        </Button>

                        <Button
                            colorPalette="green"
                            onClick={enviarAudio}
                            loading={enviando}
                            display="flex" gap="2"
                        >
                            <FiSend /> Enviar
                        </Button>
                    </HStack>
                </VStack>
            )}
        </VStack>
    );
}