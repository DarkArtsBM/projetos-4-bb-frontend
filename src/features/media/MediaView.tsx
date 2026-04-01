"use client";

import { Box, Container, Flex, Text, AspectRatio, VStack, SimpleGrid, Spinner, Center } from "@chakra-ui/react";
import { NativeSelect } from "@chakra-ui/react"
import { AudioCard } from "@/components/layout/AudioCard";
import { GravadorAudio } from "@/features/media/components/GravadorAudio";
import { useMediaView } from "@/features/media/hooks/useMediaView"; // Importamos o Hook

export function MediaView() {
    // Puxamos toda a inteligência do nosso Hook de uma vez só!
    const { estados, acoes, configs } = useMediaView();

    return (
        <Box bg="white" minH="100vh" color="black">
            <Container maxW="container.xl" py={10}>
                <Flex direction={{ base: "column-reverse", md: "row" }} gap={{ base: 8, md: 12 }} align="flex-start">

                    {/* COLUNA ESQUERDA */}
                    <Box flex={{ base: "1", md: "5" }} w="full">
                        <VStack align="start" gap={8}>
                            <Box w="full" borderRadius="20px" overflow="hidden" boxShadow="2xl" bg="black">
                                <AspectRatio ratio={16 / 9}>
                                    {estados.conteudoAtual?.videoUrl ? (
                                        <iframe src={estados.conteudoAtual.videoUrl} title="YouTube video player"
                                                frameBorder="0" allowFullScreen style={{ width: '100%', height: '100%' }} />
                                    ) : (
                                        <Flex align="center" justify="center" bg="gray.800" p={10}>
                                            <Text color="white" textAlign="center">Selecione um idioma e um processo ao lado para começar.</Text>
                                        </Flex>
                                    )}
                                </AspectRatio>
                            </Box>

                            <Box color="blue.800" mb={2} ml={5} fontWeight="bold">
                                {estados.selectProcess || "Selecione um processo"}
                            </Box>

                            {estados.conteudoAtual && (
                                <VStack align="start" w="full" gap={6}>
                                    <Box p={4} bg="gray.50" borderRadius="lg" w="full">
                                        <Text color="gray.800" fontWeight="bold" mb={2}>Sobre este processo:</Text>
                                        <Text color="gray.700">{estados.conteudoAtual.descricao}</Text>
                                    </Box>

                                    <Box w="full" mt={2} mb={4}>
                                        <GravadorAudio tutorialId={estados.conteudoAtual.id} idioma={estados.selectedLanguage} />
                                    </Box>

                                    <Text fontWeight="bold" fontSize="lg" color="gray.700">
                                        Explicações da Comunidade ({estados.audiosComunidade.length}):
                                    </Text>

                                    {estados.carregandoAudios ? (
                                        <Center w="full" py={10}><Spinner size="xl" color="blue.500" /></Center>
                                    ) : estados.audiosComunidade.length > 0 ? (
                                        <SimpleGrid columns={{ base: 1, md: 1 }} gap={4} w="full">
                                            {estados.audiosComunidade.map((audio) => (
                                                <AudioCard key={audio.id} audioId={audio.id} nomeAutor="Usuário da Comunidade"
                                                           caminhoArquivo={audio.caminhoArquivo} votosIniciais={audio.votos} />
                                            ))}
                                        </SimpleGrid>
                                    ) : (
                                        <Text color="gray.500">Nenhum áudio encontrado. Seja o primeiro a gravar!</Text>
                                    )}
                                </VStack>
                            )}
                        </VStack>
                    </Box>

                    {/* COLUNA DIREITA */}
                    <Box flex={{ base: "1", md: "2" }}
                         w="full" bg="blue.50" p={6} borderRadius="2xl" border="1px solid" borderColor="blue.100"
                         position={{ md: "sticky" }} top="20px">
                        <VStack align="start" gap={6}>
                            {/* SELECT DE IDIOMA */}
                            <Box w="full">
                                <Text fontWeight="bold" mb={2} fontSize="sm" color="black">Língua:</Text>
                                <NativeSelect.Root size="sm">
                                    <NativeSelect.Field
                                        value={estados.selectedLanguage || ""}
                                        onChange={(e) => acoes.setLanguage(e.target.value)}
                                        bg="white" color="black" borderColor="gray.300">
                                        <option value="" disabled style={{ backgroundColor: 'white', color: 'black' }}>Escolha a língua</option>
                                        {configs.idiomas.map((lang) => (
                                            <option key={lang} value={lang} style={{ backgroundColor: 'white', color: 'black' }}>{lang}</option>
                                        ))}
                                    </NativeSelect.Field>
                                    <NativeSelect.Indicator color="black" />
                                </NativeSelect.Root>
                            </Box>

                            {/* SELECT DE PROCESSO */}
                            <Box w="full" mt={4}>
                                <Text fontWeight="bold" mb={2} fontSize="sm" color="black">Processo:</Text>
                                <NativeSelect.Root size="sm">
                                    <NativeSelect.Field
                                        value={estados.selectProcess || ""}
                                        onChange={(e) => acoes.setProcess(e.target.value)}
                                        bg="white" color="black" borderColor="gray.300">
                                        <option value="" disabled style={{ backgroundColor: 'white', color: 'black' }}>Escolha o processo</option>
                                        {estados.processosNomes.map((proc) => (
                                            <option key={proc} value={proc} style={{ backgroundColor: 'white', color: 'black' }}>{proc}</option>
                                        ))}
                                    </NativeSelect.Field>
                                    <NativeSelect.Indicator color="black" />
                                </NativeSelect.Root>
                            </Box>
                        </VStack>
                    </Box>
                </Flex>
            </Container>
        </Box>
    );
}