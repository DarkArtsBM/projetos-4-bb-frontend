"use client";

import { Box, VStack, Text, Button, Flex, HStack, IconButton } from "@chakra-ui/react";
import { FiSliders, FiFileText } from "react-icons/fi";
import { PainelFiltrosProps } from "@/types/types";

export function PainelFiltros({
                                  idiomas,
                                  processos,
                                  idiomaSelecionado,
                                  processoSelecionado,
                                  aoMudarIdioma,
                                  aoMudarProcesso
                              }: PainelFiltrosProps) {

    return (
        <Box
            w="full" bg="white" p={{ base: 4, md: 6 }} borderRadius="2xl"
            border="1px solid" borderColor="gray.100"
            position={{ md: "sticky" }} top="20px" shadow="sm"
            css={{
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
            }}
        >
            <VStack align="start" gap={6}>
                {/* FILTRO DE IDIOMA EM CARROSSEL (ESTILO YOUTUBE) */}
                <Box w="full">
                    <HStack
                        w="full"
                        gap={2}
                        overflowX="auto"
                        pb={2}
                        css={{
                            '&::-webkit-scrollbar': { display: 'none' }, // Esconde a barra de scroll
                            '-ms-overflow-style': 'none',
                            'scrollbar-width': 'none'
                        }}
                    >
                        {/* ÍCONE DE FILTRO FIXO (OPCIONAL) */}
                        <IconButton
                            aria-label="Filtros"
                            variant="subtle"
                            colorPalette="gray"
                            borderRadius="lg"
                            size="sm"
                            flexShrink={0} // Impede que o ícone esmague
                        >
                            <FiSliders />
                        </IconButton>

                        {/* BOTÃO "TODOS" OU LISTA DE IDIOMAS */}
                        {idiomas.map((lang) => (
                            <Button
                                key={lang}
                                size="sm"
                                flexShrink={0} // IMPORTANTE: Mantém o tamanho do botão no scroll
                                borderRadius="full" // Formato de pílula igual da imagem
                                variant={idiomaSelecionado === lang ? "solid" : "subtle"}
                                colorPalette={idiomaSelecionado === lang ? "blue" : "gray"}
                                onClick={() => aoMudarIdioma(lang)}
                                px={4}
                                fontWeight="medium"
                            >
                                {lang}
                            </Button>
                        ))}
                    </HStack>
                </Box>

                {/* FILTRO DE PROCESSO (LISTA VERTICAL PARA MOBILE) */}
                <Box w="full">
                    <Flex align="center" gap={2} mb={3} px={1}>
                        <FiFileText color="gray" />
                        <Text fontWeight="bold" fontSize="xs" color="gray.500" textTransform="uppercase">
                            Selecione o Tutorial:
                        </Text>
                    </Flex>

                    <VStack align="stretch" gap={2}>
                        {processos.map((proc) => (
                            <Button
                                key={proc}
                                size="lg"
                                justifyContent="start"
                                variant={processoSelecionado === proc ? "solid" : "ghost"}
                                colorPalette="blue"
                                onClick={() => aoMudarProcesso(proc)}
                                px={4}
                                borderRadius="xl"
                                whiteSpace="normal"
                                textAlign="left"
                                height="auto"
                                py={4}
                                border="1px solid"
                                borderColor={processoSelecionado === proc ? "blue.500" : "gray.50"}
                            >
                                {proc}
                            </Button>
                        ))}
                    </VStack>
                </Box>

            </VStack>
        </Box>
    );
}