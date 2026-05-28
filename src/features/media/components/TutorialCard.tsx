import { Box, VStack, Text, HStack, Avatar, IconButton, Flex, AspectRatio } from "@chakra-ui/react";
import { FiMoreVertical, FiPlay } from "react-icons/fi";
import { Tutorial } from "@/types/types";

export function TutorialCard({ tutorial, onClick }: { tutorial: Tutorial; onClick: () => void }) {
    const videoId = tutorial.youtubeUrl.split("embed/")[1]?.split("?")[0];
    const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
        <VStack align="start" gap={3} cursor="pointer" onClick={onClick} w="full" className={"group"}>
            {/* 1. AspectRatio 16/9 garante que o vídeo apareça grande e preencha a largura */}
            <AspectRatio ratio={16 / 9} w="full" borderRadius="xl" overflow="hidden" bg="gray.100" border="1px solid" borderColor="gray.200">
                <Box position="relative">
                    <Box
                        w="full"
                        h="full"
                        bgImage={`url(${thumbUrl})`}
                        bgSize="cover"
                        bgPos="center"
                        transition="transform 0.3s"
                        _groupHover={{ transform: "scale(1.05)" }}
                    />

                    {/* Badge de tempo e Ícone de Play */}
                    <Box position="absolute" bottom="8px" right="8px" bg="blackAlpha.800" color="white" px={1.5} borderRadius="sm" fontSize="xs" fontWeight="bold">
                        15:19
                    </Box>
                    <Flex position="absolute" inset="0" align="center" justify="center" opacity="0" _groupHover={{ opacity: "1" }} bg="blackAlpha.300" transition="0.2s">
                        <FiPlay size="40px" color="white" />
                    </Flex>
                </Box>
            </AspectRatio>

            {/* 2. Informações do Vídeo */}
            <Flex w="full" gap={3} px={1}>
                <Avatar.Root size="sm">
                    <Avatar.Fallback name="BB" bg="blue.600" color="white" />
                </Avatar.Root>

                <VStack align="start" gap={0} flex="1" minW="0">
                    <Text color="black" fontWeight="bold" fontSize="sm" lineHeight="tight" lineClamp={2}>
                        {tutorial.pergunta}
                    </Text>
                    <HStack fontSize="xs" color="gray.600" gap={1} mt={1}>
                        <Text>Comunidade BB</Text>
                        <Text>•</Text>
                        <Text>FAQ Oficial</Text>
                    </HStack>
                </VStack>

                <IconButton variant="ghost" color="gray.400" size="xs" aria-label="Menu">
                    <FiMoreVertical />
                </IconButton>
            </Flex>
        </VStack>
    );
}