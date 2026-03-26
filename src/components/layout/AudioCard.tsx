"use client";

import { useState } from "react";
import { Box, Text, HStack, IconButton, VStack, Flex, Badge } from "@chakra-ui/react";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

interface AudioCardProps {
  nome: string;
  url: string;
  initialLikes: number;
  initialDislikes: number;
}

export function AudioCard({ nome, url, initialLikes, initialDislikes }: AudioCardProps) {
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);

  const handleVote = (vote: "like" | "dislike") => {
    setUserVote((prev) => (prev === vote ? null : vote));
  };

  // Lógica para exibir o total "fingindo" que salvou no banco
  const displayLikes = initialLikes + (userVote === "like" ? 1 : 0);
  const displayDislikes = initialDislikes + (userVote === "dislike" ? 1 : 0);

  return (
    <Box p={4} borderRadius="xl" border="1px solid" borderColor="gray.200" bg="white" w="full">
      <VStack align="start" gap={3}>
        <Flex w="full" justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="sm" color="blue.800">{nome}</Text>

          <HStack gap={4}>
            {/* Seção Like */}
            <HStack gap={1}>
              <Text fontSize="xs" fontWeight="bold" color="green.600">{displayLikes}</Text>
              <IconButton
                aria-label="Like"
                variant={userVote === "like" ? "solid" : "outline"}
                colorPalette="green"
                onClick={() => handleVote("like")}
                rounded="full"
                size="xs"
              >
                <FiThumbsUp />
              </IconButton>
            </HStack>

            {/* Seção Dislike */}
            <HStack gap={1}>
              <Text fontSize="xs" fontWeight="bold" color="red.600">{displayDislikes}</Text>
              <IconButton
                aria-label="Dislike"
                variant={userVote === "dislike" ? "solid" : "outline"}
                colorPalette="red"
                onClick={() => handleVote("dislike")}
                rounded="full"
                size="xs"
              >
                <FiThumbsDown />
              </IconButton>
            </HStack>
          </HStack>
        </Flex>

        <audio controls src={url} style={{ width: "100%" }} />
      </VStack>
    </Box>
  );
}