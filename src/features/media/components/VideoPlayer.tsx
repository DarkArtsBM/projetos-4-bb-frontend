import { Box, AspectRatio, Flex, Text } from "@chakra-ui/react";

// Tipagem: O que essa "TV" precisa para funcionar? Só a URL!
interface VideoPlayerProps {
    urlYoutube?: string;
}

export function VideoPlayer({ urlYoutube }: VideoPlayerProps) {
    return (
        // A Box preta com sombra veio para cá!
        <Box w="full" borderRadius="20px" overflow="hidden" boxShadow="2xl" bg="black">
            <AspectRatio ratio={16 / 9}>
                {urlYoutube ? (
                    <iframe
                        src={urlYoutube}
                        title="YouTube video player"
                        frameBorder="0"
                        allowFullScreen
                        style={{ width: '100%', height: '100%' }}
                    />
                ) : (
                    <Flex align="center" justify="center" bg="gray.800" p={10}>
                        <Text color="white" textAlign="center">
                            Selecione um idioma e um processo ao lado para começar.
                        </Text>
                    </Flex>
                )}
            </AspectRatio>
        </Box>
    );
}