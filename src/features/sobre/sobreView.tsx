"use client";

import {
    Box,
    VStack,
    Heading,
    Text,
    Container,
    Flex,
    Circle,
    Icon,
    SimpleGrid,
    Separator
} from "@chakra-ui/react";
import { FiUsers, FiVideo, FiGlobe, FiCheckCircle } from "react-icons/fi";

export function SobreView() {
    return (
        <Box bg="white" minH="calc(100vh - 64px)" pb={20}>
            {/* 1. Header da Página  */}
            <Box bg="brand.500" py={{ base: 12, md: 16 }}>
                <Container maxW="container.md" textAlign="center">
                    <VStack gap={4}>
                        <Heading size="2xl" color="blue.900" fontWeight="900" letterSpacing="tighter">
                            Sobre o FAQ BB
                        </Heading>
                        <Text color="blue.800" fontSize="lg" fontWeight="medium" maxW="600px">
                            Uma iniciativa de inclusão digital para levar conhecimento bancário a todos os cantos do Brasil, respeitando línguas e culturas.
                        </Text>
                    </VStack>
                </Container>
            </Box>

            {/* 2. Conteúdo Textual  */}
            <Container maxW="container.md" mt={16}>
                <VStack align="start" gap={12}>

                    {/* Seção: O Projeto */}
                    <Box w="full">
                        <Heading size="lg" color="blue.900" mb={4} fontWeight="800">
                            Nossa Missão
                        </Heading>
                        <Text color="gray.700" fontSize="md" lineHeight="tall">
                            O **FAQ BB** nasceu da necessidade de tornar o acesso aos serviços bancários mais humano e compreensível. Sabemos que a tecnologia pode ser uma barreira para muitos, e nossa missão é derrubar essa parede através de vídeos curtos, diretos e narrados pela própria comunidade.
                        </Text>
                    </Box>

                    <Separator borderColor="gray.100" />

                    {/* Seção: Como Funciona  */}
                    <Box w="full">
                        <Heading size="lg" color="blue.900" mb={8} fontWeight="800">
                            Como o sistema funciona?
                        </Heading>
                        <VStack align="start" gap={8}>
                            <Flex gap={4}>
                                <Circle size="40px" bg="blue.50" color="blue.600" flexShrink={0}>
                                    <Icon as={FiVideo} />
                                </Circle>
                                <Box>
                                    <Text fontWeight="bold" color="gray.800">Tutoriais em Vídeo</Text>
                                    <Text color="gray.600" fontSize="sm">Vídeos oficiais demonstrando passo a passo as principais funções do aplicativo e serviços do Banco.</Text>
                                </Box>
                            </Flex>

                            <Flex gap={4}>
                                <Circle size="40px" bg="green.50" color="green.600" flexShrink={0}>
                                    <Icon as={FiUsers} />
                                </Circle>
                                <Box>
                                    <Text fontWeight="bold" color="gray.800">Voz da Comunidade</Text>
                                    <Text color="gray.600" fontSize="sm">Utilizadores reais podem gravar explicações em seus próprios idiomas e dialetos, ajudando outros membros da comunidade.</Text>
                                </Box>
                            </Flex>

                            <Flex gap={4}>
                                <Circle size="40px" bg="orange.50" color="orange.600" flexShrink={0}>
                                    <Icon as={FiGlobe} />
                                </Circle>
                                <Box>
                                    <Text fontWeight="bold" color="gray.800">Diversidade Linguística</Text>
                                    <Text color="gray.600" fontSize="sm">Suporte para Português, Kayapó, Tukano e outras línguas indígenas, garantindo que ninguém fique para trás.</Text>
                                </Box>
                            </Flex>
                        </VStack>
                    </Box>

                    <Separator borderColor="gray.100" />

                    {/* Seção: Valores / Pilares */}
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} w="full">
                        <Box p={6} bg="gray.50" borderRadius="2xl">
                            <Icon as={FiCheckCircle} color="blue.600" mb={2} />
                            <Text fontWeight="bold" mb={2} color="blue.900">Segurança</Text>
                            <Text fontSize="sm" color="gray.600">Informações validadas para garantir que você aprenda a usar o banco de forma protegida.</Text>
                        </Box>
                        <Box p={6} bg="gray.50" borderRadius="2xl">
                            <Icon as={FiCheckCircle} color="blue.600" mb={2} />
                            <Text fontWeight="bold" mb={2} color="blue.900">Acessibilidade</Text>
                            <Text fontSize="sm" color="gray.600">Interface pensada para ser simples, rápida e funcional em qualquer dispositivo móvel.</Text>
                        </Box>
                    </SimpleGrid>

                </VStack>
            </Container>
        </Box>
    );
}