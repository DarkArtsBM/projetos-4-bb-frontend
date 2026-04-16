"use client";

import { Box, Flex, Text, VStack, HStack, IconButton } from "@chakra-ui/react";
import { FiThumbsUp } from "react-icons/fi";
import {AudioCardProps} from "@/types/types";
import { useAudioCard } from "@/hooks/useAudioCard";

export function AudioCard({ audioId, nomeAutor, caminhoArquivo, votosIniciais }: AudioCardProps) {
  const { estados, acoes } = useAudioCard(audioId, votosIniciais);

  const urlFinal = caminhoArquivo.startsWith("http")
      ? caminhoArquivo
      : `http://localhost:8080${caminhoArquivo}`;

  return (
      <Box p={4} borderRadius="xl" border="1px solid" borderColor="gray.200" bg="white" shadow="sm" _hover={{ shadow: "md" }} transition="all 0.2s">
        <VStack align="start" gap={3}>
          <Flex w="full" justify="space-between" align="center">
            <Text fontWeight="bold" fontSize="sm" color="blue.800">{nomeAutor}</Text>

            <HStack gap={2}>
              <Text fontSize="sm" fontWeight="bold" color={estados.jaVotou ? "green.600" : "gray.600"}>
                {estados.votos}
              </Text>
              <IconButton
                  aria-label="Dar Like"
                  variant={estados.jaVotou ? "solid" : "outline"}
                  colorPalette={estados.jaVotou ? "green" : "gray"}
                  onClick={acoes.handleUpvote}
                  disabled={estados.jaVotou || estados.carregando}
                  loading={estados.carregando}
                  rounded="full"
                  size="sm"
                  cursor={estados.jaVotou ? "default" : "pointer"}
              >
                <FiThumbsUp />
              </IconButton>
            </HStack>
          </Flex>

          {/* Player nativo com a URL tratada */}
          <audio controls
                 src={urlFinal}
                 onPlay={acoes.dispararPlayMuted}
                 style={{ width: "100%", height: "32px" }} />
        </VStack>
      </Box>
  );
}