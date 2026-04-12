"use client";

import { useState } from "react";
import { Box, Flex, Text, VStack, HStack, IconButton } from "@chakra-ui/react";
import { FiThumbsUp } from "react-icons/fi";
import { toaster } from "@/components/ui/toaster";
import { api } from "@/lib/api";
import { useSelectionStore } from "@/store/useSelectionStore";

interface AudioCardProps {
  audioId: number;
  nomeAutor?: string;
  caminhoArquivo: string;
  votosIniciais: number;
}

export function AudioCard({ audioId, nomeAutor, caminhoArquivo, votosIniciais }: AudioCardProps) {
  const [votos, setVotos] = useState(votosIniciais);
  const [jaVotou, setJaVotou] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const dispararPlayMuted = useSelectionStore((state) => state.dispararPlayMuted);

  const handleUpvote = async () => {
    if (jaVotou) return;

    const token = localStorage.getItem("token");


    if (!token) {
      toaster.create({
        title: "Acesso restrito",
        description: "Você precisa estar logado para votar.",
        type: "error",
      });
      return;
    }

    setCarregando(true);

    try {
      // 1. TENTA CONEXÃO REAL COM O BACK-END
      const dadosAtualizados = await api.patch<{ votos: number }>(
          `/audio/${audioId}/upvote`,
          {}
      );

      setVotos(dadosAtualizados.votos);
      setJaVotou(true);
      toaster.create({ title: "Voto registrado!", type: "success" });


    } catch (erro: any) {

      toaster.create({
        title: "Erro Back-End",
        description: erro?.response?.data?.message || erro.message || "fail to fetch API",
        type: "error",
      });



    } finally {
      setCarregando(false);
    }
  };


  const urlFinal = caminhoArquivo.startsWith("http")
      ? caminhoArquivo
      : `http://localhost:8080${caminhoArquivo}`;

  return (
      <Box p={4} borderRadius="xl" border="1px solid" borderColor="gray.200" bg="white" shadow="sm" _hover={{ shadow: "md" }} transition="all 0.2s">
        <VStack align="start" gap={3}>
          <Flex w="full" justify="space-between" align="center">
            <Text fontWeight="bold" fontSize="sm" color="blue.800">{nomeAutor}</Text>

            <HStack gap={2}>
              <Text fontSize="sm" fontWeight="bold" color={jaVotou ? "green.600" : "gray.600"}>
                {votos}
              </Text>
              <IconButton
                  aria-label="Dar Like"
                  variant={jaVotou ? "solid" : "outline"}
                  colorPalette={jaVotou ? "green" : "gray"}
                  onClick={handleUpvote}
                  disabled={jaVotou || carregando}
                  loading={carregando}
                  rounded="full"
                  size="sm"
                  cursor={jaVotou ? "default" : "pointer"}
              >
                <FiThumbsUp />
              </IconButton>
            </HStack>
          </Flex>

          {/* Player nativo com a URL tratada */}
          <audio controls
                 src={urlFinal}
                 onPlay={dispararPlayMuted}
                 style={{ width: "100%", height: "32px" }} />
        </VStack>
      </Box>
  );
}