"use client";

import { Box, Container, Flex, VStack, Text } from "@chakra-ui/react";
import { VideoPlayer } from "@/features/media/components/VideoPlayer";
import { GravadorAudio } from "@/features/media/components/GravadorAudio";
import { PainelFiltros } from "@/features/media/components/PainelFiltros";
import { ListaAudios } from "@/features/media/components/ListaAudios";
import { useMediaView } from "@/features/media/hooks/useMediaView";

export function MediaView() {
    const { estados, acoes, configs } = useMediaView();

    return (
        <Box bg="white" minH="100vh" color="black">
            <Container maxW="container.xl" py={10}>
                <Flex direction={{ base: "column-reverse", md: "row" }} gap={{ base: 8, md: 12 }} align="flex-start">

                    {/* COLUNA ESQUERDA: O Conteúdo Principal + Audios */}
                    <Box flex={{ base: "1", md: "5" }} w="full">

                        <VStack align="start" gap={8} w="full">

                            <VideoPlayer urlYoutube={estados.conteudoAtual?.youtubeUrl} />

                            <Box color="blue.800" mb={2} ml={5} fontWeight="bold">
                                {estados.selectProcess || "Selecione um processo"}
                            </Box>

                            {estados.conteudoAtual && (
                                <VStack align="start" w="full" gap={6}>
                                    <Box p={4} bg="gray.50" borderRadius="lg" w="full">
                                        <Text color="gray.800" fontWeight="bold" mb={2}>Sobre este processo:</Text>
                                        <Text color="gray.700">{estados.conteudoAtual.descricao}</Text>
                                    </Box>
                                    <GravadorAudio
                                        tutorialId={estados.conteudoAtual.id}
                                        idioma={estados.selectedLanguage}
                                    />
                                    <ListaAudios
                                        audios={estados.audiosComunidade}
                                        carregando={estados.carregandoAudios}
                                    />
                                </VStack>
                            )}
                        </VStack>
                    </Box>

                    {/* COLUNA DIREITA: Os Filtros */}
                    <Box flex={{ base: "1", md: "2" }} w="full">
                        <PainelFiltros
                            idiomas={configs.idiomas}
                            processos={estados.processosNomes}
                            idiomaSelecionado={estados.selectedLanguage}
                            processoSelecionado={estados.selectProcess}
                            aoMudarIdioma={acoes.setLanguage}
                            aoMudarProcesso={acoes.setProcess}
                        />
                    </Box>

                </Flex>
            </Container>
        </Box>
    );
}