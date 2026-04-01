"use client";

import { useEffect, useState } from "react";
import {
    Box,
    Container,
    Flex,
    Text,
    AspectRatio,
    VStack,
    SimpleGrid,
    chakra,
    Spinner,
    Center,
    NativeSelect
} from "@chakra-ui/react";
import { useSelectionStore } from "@/store/useSelectionStore";
import { api } from "@/lib/api";
import { AudioCard } from "@/components/layout/AudioCard";
import { GravadorAudio } from "@/features/media/components/GravadorAudio";

// 1. O DICIONÁRIO DO MVP (Substitui o BANCO_MOCK)
const MVP_CONFIG = {
    idiomas: ["Português", "Kayapó", "Tukano"],
    processos: {
        "Pagamento": {
            id: 1,
            // IMPORTANTE: Use /embed/ no lugar de watch?v=
            videoUrl: "https://www.youtube.com/embed/98X02Dz6yfI/",
            descricao: "Orientações sobre saques, depósitos e transferências."
        },
        "Serviço": {
            id: 2,
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            descricao: "Informações sobre os serviços disponíveis nas agências."
        },
        "Senha": {
            id: 3,
            videoUrl: "https://www.youtube.com/embed/F-wOvzPQ2DM/",
            descricao: "Passo a passo para recuperação de senhas."
        },
    }
};

// Tipagem(garantia) do audio que vai vir do Spring Boot
interface AudioResponseDTO {
    id: number;
    caminhoArquivo: string;
    dataCriacao: string;
    tutorialId: number;
    votos: number;
    idioma: string;
}

export function MediaView() {
    const { selectedLanguage, selectProcess, setLanguage, setProcess } = useSelectionStore();

    // 2. NOVOS ESTADOS PARA A API
    const [audiosComunidade, setAudiosComunidade] = useState<AudioResponseDTO[]>([]);
    const [carregandoAudios, setCarregandoAudios] = useState(false);

    // 3. IDENTIFICANDO O CONTEÚDO ATUAL
    const processosNomes = Object.keys(MVP_CONFIG.processos);
    const conteudoAtual = selectProcess ? MVP_CONFIG.processos[selectProcess as keyof typeof MVP_CONFIG.processos] : null;

    // 4. Busca os áudios quando a língua ou processo mudam
    useEffect(() => {
        async function buscarAudios() {
            // Só busca se o usuário já escolheu os dois
            if (!selectedLanguage || !conteudoAtual) return;

            setCarregandoAudios(true);
            try {
                // Usa o nosso novo garçom (api.ts) passando o ID e o Idioma!
                const dados = await api.get<AudioResponseDTO[]>(
                    `/audio/${conteudoAtual.id}?idioma=${selectedLanguage}`
                );

                // Se a API retornar null ou undefined, garante que seja um array vazio
                setAudiosComunidade(dados || []);
            } catch (erro) {
                console.error("Erro ao buscar áudios:", erro);
            } finally {
                setCarregandoAudios(false);
            }
        }

        buscarAudios();
    }, [selectedLanguage, conteudoAtual]); // O React refaz a busca sempre que essas variáveis mudarem

    return (
        <Box bg="white" minH="100vh" color="black">
        <Container maxW="container.xl" py={10} >
            <Flex direction={{ base: "column-reverse", md: "row" }} gap={{ base: 8, md: 12 }} align="flex-start">

                {/* COLUNA ESQUERDA: VÍDEO E ÁUDIOS */}
                <Box flex={{ base: "1", md: "5" }} w="full">
                    <VStack align="start" gap={8}>
                        <Box w="full" borderRadius="20px" overflow="hidden" boxShadow="2xl" bg="black">
                            <AspectRatio ratio={16 / 9}>
                                {conteudoAtual?.videoUrl ? (
                                    <iframe
                                        src={conteudoAtual.videoUrl}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        style={{ width: '100%', height: '100%' }}
                                    />
                                ) : (
                                    <Flex align="center" justify="center" bg="gray.800" p={10}>
                                        <Text color="black" textAlign="center">
                                            Selecione um idioma e um processo ao lado para começar.
                                        </Text>
                                    </Flex>
                                )}
                            </AspectRatio>
                        </Box>

                        <Box color="blue.800" mb={2} ml={5} fontWeight="bold">
                            {selectProcess || "Selecione um processo"}
                        </Box>

                        {conteudoAtual && (
                            <VStack align="start" w="full" gap={6}>
                                <Box p={4} bg="gray.50" borderRadius="lg" w="full">
                                    <Text color= "gray.800" fontWeight="bold" mb={2}>Sobre este processo:</Text>
                                    <Text color="gray.700">{conteudoAtual.descricao}</Text>
                                </Box>

                                <Box w="full" mt={2} mb={4}>
                                    {/* AGORA É DINÂMICO! Passamos o ID real e o idioma para o gravador */}
                                    <GravadorAudio
                                        tutorialId={conteudoAtual.id}
                                        idioma={selectedLanguage}
                                    />
                                </Box>

                                <Text fontWeight="bold" fontSize="lg" color="gray.700">
                                    Explicações da Comunidade ({audiosComunidade.length}):
                                </Text>

                                {/* LISTAGEM REAL DO BANCO DE DADOS */}
                                {carregandoAudios ? (
                                    <Center w="full" py={10}>
                                        <Spinner size="xl" color="blue.500" />
                                    </Center>
                                ) : audiosComunidade.length > 0 ? (
                                    <SimpleGrid columns={{ base: 1, md: 1 }} gap={4} w="full">
                                        {audiosComunidade.map((audio) => (
                                            <AudioCard
                                                key={audio.id}
                                                audioId={audio.id} // Passando o ID real do banco para podermos votar!
                                                nomeAutor="Usuário da Comunidade" // Como ainda não amarramos usuário ao áudio no back
                                                caminhoArquivo={audio.caminhoArquivo}
                                                votosIniciais={audio.votos}
                                            />
                                        ))}
                                    </SimpleGrid>
                                ) : (
                                    <Text color="gray.500">Nenhum áudio encontrado para este idioma. Seja o primeiro a gravar!</Text>
                                )}
                            </VStack>
                        )}
                    </VStack>
                </Box>

                {/* COLUNA DIREITA: CONTROLES */}
                <Box flex={{ base: "1", md: "2" }}
                     w="full" bg="blue.50" p={6} borderRadius="2xl" border="1px solid"
                     borderColor="blue.100" position={{ md: "sticky" }} top="20px">

                    <VStack align="start" gap={6}>

                        <Box w="full">
                            <Text fontWeight="bold" mb={2} fontSize="sm" color="black">
                                Língua:
                            </Text>
                            <NativeSelect.Root size="sm">
                                <NativeSelect.Field
                                    value={selectedLanguage || ""}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    // Força o fundo branco e texto preto no campo fechado
                                    bg="white"
                                    color="black"
                                    borderColor="gray.300"
                                    // Remove o estilo de foco que às vezes puxa o azul/preto do sistema
                                    _focus={{ borderColor: "blue.500", bg: "white" }}
                                >
                                    <option value="" disabled style={{ backgroundColor: 'white', color: 'black' }}>
                                        Escolha a língua
                                    </option>
                                    {MVP_CONFIG.idiomas.map((lang) => (
                                        <option
                                            key={lang}
                                            value={lang}
                                            style={{ backgroundColor: 'white', color: 'black' }} // Força o fundo branco na lista aberta
                                        >
                                            {lang}
                                        </option>
                                    ))}
                                </NativeSelect.Field>
                                <NativeSelect.Indicator color="black" />
                            </NativeSelect.Root>
                        </Box>


                        <Box w="full" mt={4}>
                            <Text fontWeight="bold" mb={2} fontSize="sm" color="black">
                                Processo:
                            </Text>
                            <NativeSelect.Root size="sm">
                                <NativeSelect.Field
                                    value={selectProcess || ""}
                                    onChange={(e) => setProcess(e.target.value)}
                                    bg="white"
                                    border="1px solid"
                                    borderColor="gray.300"
                                    color="black"
                                    _focus={{ borderColor: "blue.500", bg: "white" }}
                                >
                                    {/* Estilo embutido para forçar o fundo branco na lista aberta */}
                                    <option value="" disabled style={{ backgroundColor: 'white', color: 'black' }}>
                                        Escolha o processo
                                    </option>
                                    {processosNomes.map((proc) => (
                                        <option
                                            key={proc}
                                            value={proc}
                                            style={{ backgroundColor: 'white', color: 'black' }}
                                        >
                                            {proc}
                                        </option>
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