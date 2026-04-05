import { VStack, Text, Center, Spinner, SimpleGrid } from "@chakra-ui/react";
import { AudioCard } from "@/components/layout/AudioCard";


interface AudioResponseDTO {
    id: number;
    caminhoArquivo: string;
    dataCriacao: string;
    tutorialId: number;
    votos: number;
    idioma: string;
}

interface ListaAudiosComunidadeProps {
    audios: AudioResponseDTO[];
    carregando: boolean;
}

export function ListaAudios({ audios, carregando }: ListaAudiosComunidadeProps) {
    return (
        <VStack align="start" w="full" gap={4}>
            <Text fontWeight="bold" fontSize="lg" color="gray.700">
                Explicações da Comunidade ({audios.length}):
            </Text>

            {carregando ? (
                <Center w="full" py={10}>
                    <Spinner size="xl" color="blue.500" />
                </Center>
            ) : audios.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 1 }} gap={4} w="full">
                    {audios.map((audio) => (
                        <AudioCard
                            key={audio.id}
                            audioId={audio.id}
                            nomeAutor="Usuário da Comunidade"
                            caminhoArquivo={audio.caminhoArquivo}
                            votosIniciais={audio.votos}
                        />
                    ))}
                </SimpleGrid>
            ) : (
                <Text color="gray.500">Nenhum áudio encontrado. Seja o primeiro a gravar!</Text>
            )}
        </VStack>
    );
}