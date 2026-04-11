"use client";

import { useRef } from "react";
import { Box, AspectRatio, Flex, Text } from "@chakra-ui/react";
import { useVideoSync } from "../hooks/useVideoSync";

interface VideoPlayerProps {
    urlYoutube?: string;
}

export function VideoPlayer({ urlYoutube }: VideoPlayerProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    //Logica de Sincronizar os Plays
    useVideoSync(iframeRef);


    const urlFinal = urlYoutube
        ? `${urlYoutube}${urlYoutube.includes('?') ? '&' : '?'}enablejsapi=1`
        : "";

    return (
        <Box w="full" borderRadius="20px" overflow="hidden" boxShadow="2xl" bg="black">
            <AspectRatio ratio={16 / 9}>
                {urlFinal ? (
                    <iframe
                        ref={iframeRef}
                        src={urlFinal}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
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