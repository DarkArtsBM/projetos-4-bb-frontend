"use client";

import {
    Box,
    VStack,
    Heading,
    Text,
    SimpleGrid,
    Icon,
    Flex,
    Container,
    Button,
    HStack,
    Circle
} from "@chakra-ui/react";
import {
    FiLock,
    FiCreditCard,
    FiSmartphone,
    FiDollarSign,
    FiArrowRight,
    FiHelpCircle
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { TutorialCard } from "@/features/media/components/TutorialCard";
import { useMediaView } from "@/features/media/hooks/useMediaView";
import Link from "next/link";

export function HomeView() {
    const router = useRouter();
    const { estados, acoes } = useMediaView();

    const handleVideoClick = (tutorialPergunta: string) => {
        acoes.setProcess(tutorialPergunta);
        router.push("/media");
    };

    const categorias = [
        { nome: "Senhas", icon: FiLock, color: "blue.500", bg: "blue.50" },
        { nome: "Cartões", icon: FiCreditCard, color: "orange.500", bg: "orange.50" },
        { nome: "App BB", icon: FiSmartphone, color: "green.500", bg: "green.50" },
        { nome: "Pix e Pagos", icon: FiDollarSign, color: "teal.500", bg: "teal.50" },
    ];

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

            {/* 2. CATEGORIAS MINIMALISTAS */}
            <Container maxW="container.md" mt="-60px">
                <SimpleGrid columns={4} gap={4}>
                    {categorias.map((cat) => (
                        <VStack key={cat.nome}>
                            <Circle
                                size={{ base: "70px", md: "90px" }}
                                bg="white"
                                color={cat.color}
                                shadow="lg"
                                cursor="pointer"
                                transition="all 0.3s"
                                _hover={{ transform: "scale(1.1)", bg: cat.bg }}
                            >
                                <Icon as={cat.icon} fontSize={{ base: "28px", md: "34px" }} />
                            </Circle>
                        </VStack>
                    ))}
                </SimpleGrid>
            </Container>

            {/* 3. TUTORIAIS EM DESTAQUE FUNCIONAIS */}
            <Container maxW="container.lg" py={20}>
                <Flex justify="space-between" align="end" mb={10} px={2}>
                    <VStack align="start" gap={1}>
                        <HStack gap={2} color="blue.600">
                            <Icon as={FiHelpCircle} />
                            <Text fontSize="xs" fontWeight="bold" textTransform="uppercase" letterSpacing="widest">
                                Sugestões
                            </Text>
                        </HStack>
                        <Heading size="lg" color="blue.900" fontWeight="800">
                            Tutoriais em Destaque
                        </Heading>
                    </VStack>

                    <Link href="/media" passHref>
                        <Button
                            variant="ghost"
                            color="blue.600"
                            fontWeight="bold"
                            size="sm"
                            gap="2"
                        >
                            Ver todos <FiArrowRight />
                        </Button>
                    </Link>
                </Flex>

                {/* Grid de Vídeos Reais com clique funcional */}
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={10}>
                    {estados.tutoriais.slice(0, 3).map((tut) => (
                        <Box key={tut.id} transition="0.3s" _hover={{ opacity: 0.9 }}>
                            <TutorialCard
                                tutorial={tut}
                                onClick={() => handleVideoClick(tut.pergunta)}
                            />
                        </Box>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}