"use client";

import { useState } from "react";
import { Box, Text, HStack, IconButton, VStack, Flex } from "@chakra-ui/react";
import { FiThumbsUp } from "react-icons/fi";
import {toaster} from "@/components/ui/toaster";

interface AudioCardProps {
  audioId: number; // Precisamos do ID real
  nomeAutor: string;
  caminhoArquivo: string; // O caminho que o Java devolveu (ex: /uploads/audios/123.webm)
  votosIniciais: number;
}

export function AudioCard({ audioId, nomeAutor, caminhoArquivo, votosIniciais }: AudioCardProps) {
  // estado guarda o número real de votos
  const [votos, setVotos] = useState(votosIniciais);

  //  trava simples para votos
  const [jaVotou, setJaVotou] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const handleUpvote = async () => {
    if (jaVotou) return;
    setCarregando(true);


    //  token gerado no Postman
    const meuTokenJWT = localStorage.getItem("token");

    if (!meuTokenJWT) {
      toaster.create({
        title: "Erro",
        description: "Voce precisa estar logado para votar.",
        type: "error",
      });

      setCarregando(false);
      return;
    }

    try {
      const resposta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}tutoriais/audios/${audioId}/upvote`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${meuTokenJWT}`,
          "Content-Type": "application/json"
        }
      });

      if (resposta.ok) {
        const dadosAtualizados = await resposta.json();
        setVotos(dadosAtualizados.votos);
        setJaVotou(true);
      } else if (resposta.status === 403 || resposta.status === 401) {
        toaster.create({
          title: "Sessao Expirada",
          description: "Sua Sessao expirou, faca login novamente.",
          type: "error",
        });
        localStorage.removeItem("token");
      }
    } catch (erro) {
      console.error("Erro ao votar:", erro);
    } finally {
      setCarregando(false);
    }
  };


  // Monta a URL completa para o player de áudio achar o arquivo no Java
  const urlCompletaDoAudio = `http://localhost:8080${caminhoArquivo}`;

  return (
      <Box p={4} borderRadius="xl" border="1px solid" borderColor="gray.200" bg="white" w="full">
        <VStack align="start" gap={3}>
          <Flex w="full" justify="space-between" align="center">
            <Text fontWeight="bold" fontSize="sm" color="blue.800">{nomeAutor}</Text>

            {/* Seção Like */}
            <HStack gap={1}>
              <Text fontSize="xs" fontWeight="bold" color={jaVotou ? "green.600" : "gray.600"}>
                {votos}
              </Text>
              <IconButton
                  aria-label="Upvote"
                  variant={jaVotou ? "solid" : "outline"}
                  colorPalette="green"
                  onClick={handleUpvote}
                  disabled={jaVotou || carregando} // Desabilita enquanto carrega ou se já votou
                  rounded="full"
                  size="xs"
              >
                <FiThumbsUp />
              </IconButton>
            </HStack>
          </Flex>

          <audio controls src={urlCompletaDoAudio} style={{ width: "100%" }} />
        </VStack>
      </Box>
  );
}