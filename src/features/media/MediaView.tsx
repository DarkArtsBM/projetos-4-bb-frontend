"use client";

import {
    Box,
    SimpleGrid,
    VStack,
    Text,
    HStack,
    Heading,
    Button,
    Flex,
    IconButton
} from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";

import { TutorialCard } from "./components/TutorialCard";
import { VideoPlayer } from "./components/VideoPlayer";
import { GravadorAudio } from "./components/GravadorAudio";
import { ListaAudios } from "./components/ListaAudios";

import { useMediaView } from "@/features/media/hooks/useMediaView";
import { Tutorial } from "@/types/types";

export function MediaView() {
    const { estados, acoes, configs } = useMediaView();

    // --- VISÃO 1: DETALHES  ---
    if (estados.selectProcess) {
        return (
            <Box bg="white" minH="calc(100vh - 70px)">
                <Flex
                    h="56px"
                    bg="gray.50"
                    px={4}
                    align="center"
                    gap={4}
                    borderBottom="1px solid"
                    borderColor="gray.200"
                    position="sticky"
                    top="0"
                    zIndex="110"
                >
                    {/* BOTÃO VOLTAR */}
                    <IconButton
                        aria-label="Voltar"
                        variant="ghost"
                        color="blue.900" // Azul do Banco do Brasil
                        onClick={() => acoes.setProcess("")}
                        borderRadius="full"
                    >
                        <FiArrowLeft size="20px" />
                    </IconButton>

                    <Text color="black" fontWeight="bold" truncate fontSize="sm">
                        {estados.selectProcess}
                    </Text>
                </Flex>

                <VStack p={4} gap={6} w="full" maxW="md" mx="auto" mt={4}>
                    <VideoPlayer urlYoutube={estados.conteudoAtual?.youtubeUrl} />

                    {/* Card de interação:  */}
                    <Box
                        w="full"
                        bg="white"
                        borderRadius="2xl"
                        p={5}
                        borderWidth="1px"
                        borderColor="gray.200"
                        shadow="sm"
                    >
                        <VStack align="stretch" gap={6}>
                            {estados.conteudoAtual && (
                                <GravadorAudio
                                    tutorialId={estados.conteudoAtual.id}
                                    idioma={estados.selectedLanguage}
                                />
                            )}
                            <Box maxH="300px" overflowY="auto">
                                <ListaAudios
                                    audios={estados.audiosComunidade}
                                    carregando={estados.carregandoAudios}
                                />
                            </Box>
                        </VStack>
                    </Box>
                </VStack>
            </Box>
        );
    }

    // --- VISÃO 2: GALERIA (Grid principal responsiva) ---
    return (
        <Box bg="white" minH="calc(100vh - 70px)">
            <VStack align="start" p={{ base: 4, md: 6 }} gap={6}>

                <Heading size="md" color="blue.900" fontWeight="black">
                    Vídeos em Alta - {estados.selectedLanguage || "Português"}
                </Heading>

                {/* Filtros de Idioma  */}
                <HStack
                    w="full"
                    overflowX="auto"
                    pb={2}
                    css={{
                        scrollbarWidth: "none",
                        "&::-webkit-scrollbar": { display: "none" }
                    }}
                >
                    <Button
                        size="sm"
                        borderRadius="md"
                        bg="gray.100"
                        color="black"
                        _hover={{ bg: "gray.200" }}
                    >
                        Explorar
                    </Button>
                    {configs.idiomas.map((lang) => (
                        <Button
                            key={lang}
                            size="sm"
                            borderRadius="md"
                            flexShrink={0}
                            variant={estados.selectedLanguage === lang ? "solid" : "subtle"}
                            colorPalette={estados.selectedLanguage === lang ? "blue" : "gray"}
                            onClick={() => acoes.setLanguage(lang)}
                        >
                            {lang}
                        </Button>
                    ))}
                </HStack>

                {/* Grid Responsiva: 1 coluna no mobile, até 4 no desktop */}
                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                    gap={{ base: 6, md: 8 }}
                    w="full"
                    pt={2}
                >
                    {estados.tutoriais.map((tut: Tutorial) => (
                        <TutorialCard
                            key={tut.id}
                            tutorial={tut}
                            onClick={() => acoes.setProcess(tut.pergunta)}
                        />
                    ))}
                </SimpleGrid>
            </VStack>
        </Box>
    );
}