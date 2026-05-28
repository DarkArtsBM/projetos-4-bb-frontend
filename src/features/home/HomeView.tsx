"use client";

import { useState } from "react";
import {
    Box, VStack, Heading, Text, SimpleGrid, Icon, Flex, Container, Button, HStack, Circle, Center
} from "@chakra-ui/react";
import {
    FiLock, FiCreditCard, FiSmartphone, FiDollarSign, FiArrowRight, FiHelpCircle, FiGrid
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { TutorialCard } from "@/features/media/components/TutorialCard";
import { useMediaView } from "@/features/media/hooks/useMediaView";
import Link from "next/link";

export function HomeView() {
    const router = useRouter();
    const { estados, acoes } = useMediaView();
    const [filtroAtivo, setFiltroAtivo] = useState<string | null>(null);

    const handleVideoClick = (tutorialPergunta: string) => {
        acoes.setProcess(tutorialPergunta);
        router.push("/media");
    };

    const categoriasBase = [
        { nome: "Senhas", icon: FiLock, color: "blue.500", bg: "blue.50" },
        { nome: "Cartões", icon: FiCreditCard, color: "orange.500", bg: "orange.50" },
        { nome: "App BB", icon: FiSmartphone, color: "green.500", bg: "green.50" },
        { nome: "Pix e Pagos", icon: FiDollarSign, color: "teal.500", bg: "teal.50" },
    ];

    const categoriasComOutros = [
        ...categoriasBase,
        { nome: "Outros", icon: FiGrid, color: "purple.500", bg: "purple.50" }
    ];

    // Lógica de filtragem
    const tutoriaisExibidos = estados.tutoriais.filter((tut) => {
        if (!filtroAtivo) return true;

        if (filtroAtivo === "Outros") {
            const namesBase = categoriasBase.map(c => c.nome);
            return !tut.categoria || !namesBase.includes(tut.categoria);
        }

        return tut.categoria === filtroAtivo;
    });

    return (
        <Box bg="white" minH="calc(100vh - 64px)">
            {/* 1. HERO SECTION */}
            <Box bg="brand.500" pt={12} pb={24} px={4}>
                <Container maxW="container.lg" textAlign="center">
                    <Heading size="2xl" color="blue.900" fontWeight="900" letterSpacing="tighter">
                        Como podemos ajudar?
                    </Heading>
                </Container>
            </Box>

            {/* 2. SEÇÃO DE CATEGORIAS VISUAIS */}
            <Container maxW="container.md" mt="-60px">
                <SimpleGrid columns={5} gap={2}>
                    {categoriasComOutros.map((cat) => {
                        const isAtivo = filtroAtivo === cat.nome;
                        return (
                            <VStack key={cat.nome}>
                                <Circle
                                    size={{ base: "60px", md: "80px" }}
                                    bg={isAtivo ? cat.color : "white"}
                                    color={isAtivo ? "white" : cat.color}
                                    shadow="lg"
                                    cursor="pointer"
                                    transition="all 0.3s"
                                    onClick={() => setFiltroAtivo(isAtivo ? null : cat.nome)}
                                    _hover={{ transform: "scale(1.1)", bg: isAtivo ? cat.color : cat.bg }}
                                >
                                    <Icon as={cat.icon} fontSize={{ base: "24px", md: "30px" }} />
                                </Circle>
                                <Text fontSize="xs" fontWeight="bold" color="blue.900" mt={1}>
                                    {cat.nome}
                                </Text>
                            </VStack>
                        );
                    })}
                </SimpleGrid>
            </Container>

            {/* 3. GRID DE TUTORIAIS */}
            <Container maxW="container.lg" py={20}>
                <Flex justify="space-between" align="end" mb={10} px={2}>
                    <VStack align="start" gap={1}>
                        <HStack gap={2} color="blue.600">
                            <Icon as={FiHelpCircle} />
                            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">
                                {filtroAtivo ? `Categoria: ${filtroAtivo}` : "Sugestões"}
                            </Text>
                        </HStack>
                        <Heading size="lg" color="blue.900" fontWeight="800">
                            Tutoriais em Destaque
                        </Heading>
                    </VStack>

                    <Link href="/media" passHref>
                        <Button variant="ghost" color="blue.600" fontWeight="bold" size="sm" gap="2">
                            Ver todos <FiArrowRight />
                        </Button>
                    </Link>
                </Flex>

                {/* Alterado: Removido o .slice(0, 3) para exibir todos os vídeos da categoria selecionada */}
                {tutoriaisExibidos.length > 0 ? (
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={10}>
                        {tutoriaisExibidos.map((tut) => (
                            <Box key={tut.id} transition="0.3s" _hover={{ opacity: 0.9 }}>
                                <TutorialCard
                                    tutorial={tut}
                                    onClick={() => handleVideoClick(tut.pergunta)}
                                />
                            </Box>
                        ))}
                    </SimpleGrid>
                ) : (
                    <Center py={10} w="full">
                        <Text color="gray.500">Nenhum tutorial encontrado nesta categoria.</Text>
                    </Center>
                )}
            </Container>
        </Box>
    );
}