"use client";

import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  AspectRatio,
  VStack,
  SimpleGrid,
  Center,
  CardFooter,
  TableFooter,
} from "@chakra-ui/react";
import { useSelectionStore } from "@/store/useSelectionStore";
import { BANCO_MOCK, AudioItem } from "@/data/content";
import { AudioCard } from "@/components/layout/AudioCard";
import  {GravadorAudio} from "@/components/layout/GravadorAudio";

export default function MediaPage() {
  // 1. Extraindo estados e funções do Zustand (Padrão Inglês)
  const { selectedLanguage, selectProcess, setLanguage, setProcess } =
    useSelectionStore();

  // 2. Lógica Dinâmica para os Selects (pegando as chaves do Banco)
  const availableLanguages = Object.keys(BANCO_MOCK);

  const availableProcesses = selectedLanguage
    ? Object.keys(BANCO_MOCK[selectedLanguage as keyof typeof BANCO_MOCK] || {})
    : [];

  // 3. Pegando os dados do conteúdo atual (Vídeo, Áudios, Descrição)
  // Criamos um tipo para facilitar a leitura do TS
  type BancoKeys = keyof typeof BANCO_MOCK;

  const currentContent =
    selectedLanguage && selectProcess && BANCO_MOCK[selectedLanguage]
      ? BANCO_MOCK[selectedLanguage][selectProcess]
      : null;

  // Estilo padrão para os selects (para evitar repetição)
  const selectStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #E2E8F0",
    backgroundColor: "white",
    fontSize: "14px",
    outline: "none",
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        gap={{ base: 8, md: 12 }}
        align="flex-start"
      >
        {/* COLUNA ESQUERDA: VÍDEO E ÁUDIOS */}
        <Box flex={{ base: "1", md: "5" }} w="full">
          <VStack align="start" gap={8}>
            {/* PLAYER DE VÍDEO */}
            <Box
              w="full"
              borderRadius="20px"
              overflow="hidden"
              boxShadow="2xl"
              bg="black"
              border="1px solid"
              borderColor="gray.200"
            >
              <AspectRatio ratio={16 / 9}>
                {currentContent?.videoUrl ? (
                  <video
                    key={currentContent.videoUrl}
                    controls
                    width="100%"
                    src={currentContent.videoUrl}
                  >
                    Seu navegador não suporta vídeos.
                  </video>
                ) : (
                  <Flex align="center" justify="center" bg="gray.800">
                    <Text color="white">Aguardando seleção de conteúdo...</Text>
                  </Flex>
                )}
              </AspectRatio>
            </Box>
            <Box color="blue.800" mb={2} ml={5}>
              {selectProcess || "Selecione um processo"}
            </Box>

            {/* DESCRIÇÃO, GRAVADOR E ÁUDIOS */}
            {currentContent && (
                <VStack align="start" w="full" gap={6}>

                  {/* 1. CAIXA DE DESCRIÇÃO */}
                  <Box p={4} bg="gray.50" borderRadius="lg" w="full">
                    <Text fontWeight="bold" mb={2}>
                      Sobre este processo:
                    </Text>
                    <Text color="gray.700">{currentContent.descricao}</Text>
                  </Box>

                  {/* 2. O NOSSO GRAVADOR ENTRA AQUI! 🚀 */}
                  {/* Estamos passando tutorialId={1} fixo por enquanto para o Java saber onde salvar */}
                  <Box w="full" mt={2} mb={4}>
                    <GravadorAudio tutorialId={1} />
                  </Box>

                  <Text fontWeight="bold" fontSize="lg" color="gray.700">
                    Explicações da Comunidade:
                  </Text>

                  {/* 3. LISTA DE ÁUDIOS (Adaptada para o novo AudioCard) */}
                  <SimpleGrid columns={{ base: 1, md: 1 }} gap={4} w="full">
                    {currentContent.audios.map(
                        (audio: any, index: number) => (
                            <AudioCard
                                key={index}
                                // Como estamos usando o MOCK, improvisamos os dados para encaixar no novo formato do Card
                                audioId={index + 1}
                                nomeAutor={audio.nome || "Usuário Anônimo"}
                                caminhoArquivo={audio.url}
                                votosIniciais={audio.likes || 0}
                            />
                        ),
                    )}
                  </SimpleGrid>

                </VStack>
            )}
          </VStack>
        </Box>

        {/* COLUNA DIREITA: CONTROLES (Fica no topo no celular) */}
        <Box
          flex={{ base: "1", md: "2" }}
          w="full"
          bg="blue.50"
          p={6}
          borderRadius="2xl"
          border="1px solid"
          borderColor="blue.100"
          position={{ md: "sticky" }}
          top="20px"
        >
          <VStack align="start" gap={6}>
            {/* SELECT DE LÍNGUA */}
            <Box w="full">
              <Text fontWeight="bold" mb={2} fontSize="sm" color="gray.700">
                Língua:
              </Text>
              <select
                value={selectedLanguage || ""}
                onChange={(e) => setLanguage(e.target.value)}
                style={selectStyle}
              >
                <option value="" disabled>
                  Escolha a língua
                </option>
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </Box>

            {/* SELECT DE PROCESSO */}
            <Box w="full">
              <Text fontWeight="bold" mb={2} fontSize="sm" color="gray.700">
                Processo:
              </Text>
              <select
                value={selectProcess || ""}
                onChange={(e) => setProcess(e.target.value)}
                style={selectStyle}
              >
                <option value="" disabled>
                  Escolha o processo
                </option>
                {availableProcesses.map((proc) => (
                  <option key={proc} value={proc}>
                    {proc}
                  </option>
                ))}
              </select>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
}
