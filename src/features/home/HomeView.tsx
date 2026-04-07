"use client";

import {
    Container,
    VStack,
    Heading,
    Text,
    Button,
    Box,
    SimpleGrid,
    ButtonGroup
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";


export function HomeView() {
    const router = useRouter();

    return (

        <Box as="main" bg="white" color="gray.800">

            {/* SEÇÃO HERO: O Impacto Principal */}
            <Box bg="blue.800" py={{ base: 16, md: 24 }} color="white">
                <Container maxW="container.lg">
                    <VStack gap={6} textAlign="center">
                        <Heading as="h1" size="3xl" fontWeight="black" letterSpacing="tight">
                            Inclusão Financeira para Todos
                        </Heading>
                        <Text fontSize="xl" maxW="2xl" opacity={0.9}>
                            A primeira plataforma de tutoriais bancários narrados por membros da
                            sua própria comunidade, nos seus idiomas nativos.
                        </Text>
                        <Button
                            size={{base:"xl",md:"lg"}}
                            bg="white"
                            color="black.600"
                            fontWeight="bold"
                            _hover={{ bg: "blue.50", transform: "scale(1.05)" }}
                            onClick={() => router.push("/media")}
                            px={10}
                            mt={4}
                            shadow="xl"
                        >
                            Acessar Tutoriais
                        </Button>
                    </VStack>
                </Container>
            </Box>

            {/* SEÇÃO OBJETIVOS: Os 3 Pilares */}
            <Container maxW="container.xl" py={20}>
                <SimpleGrid columns={{ base: 1, md: 3 }} gap={10}>

                    <VStack align="start" p={8} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
                        <Heading size="md" color="blue.600" mb={2}>Acessibilidade</Heading>
                        <Text color="gray.600">
                            Simplificamos termos bancários complexos para que ninguém fique de fora da economia digital, independente da sua língua materna.
                        </Text>
                    </VStack>

                    <VStack align="start" p={8} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
                        <Heading size="md" color="blue.600" mb={2}>Representatividade</Heading>
                        <Text color="gray.600">
                            O conteúdo não é apenas traduzido, é explicado por pessoas da comunidade, garantindo que a cultura e o contexto sejam respeitados.
                        </Text>
                    </VStack>

                    <VStack align="start" p={8} borderRadius="2xl" border="1px solid" borderColor="gray.100" shadow="sm">
                        <Heading size="md" color="blue.600" mb={2}>Colaboração</Heading>
                        <Text color="gray.600">
                            Uma plataforma viva onde usuários podem gravar suas próprias explicações e ajudar outros membros a navegar com segurança.
                        </Text>
                    </VStack>

                </SimpleGrid>
            </Container>

            {/* SEÇÃO CHAMADA FINAL */}
            <Box bg="gray.50" py={16}>
                <Container maxW="container.md" textAlign="center">
                    <VStack gap={6}>
                        <Heading size="lg" color="blue.900">Como funciona?</Heading>
                        <Text color="gray.600">
                            Escolha um serviço (como Pagamento ou Senha), selecione seu idioma e assista ao vídeo explicativo. Se ainda tiver dúvidas, ouça os áudios da comunidade abaixo do vídeo!
                        </Text>
                        <Button
                            variant="outline"
                            colorScheme="blue"
                            bg="blue.800"
                            borderColor="blue.600"
                            onClick={() => router.push("/media")}
                        >
                            Ver na prática
                        </Button>
                    </VStack>
                </Container>
            </Box>
        </Box>
    );
}