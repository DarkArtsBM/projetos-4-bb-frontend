"use client";

import { Box, Flex, Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    // Verifica se o usuário está logado ao carregar o componente
    useEffect(() => {
        // Função que verifica o token
        const checkToken = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        };

        // Verifica ao carregar
        checkToken();

        // Fica ouvindo se o storage mudou (login/logout em outras abas ou eventos manuais)
        window.addEventListener("storage", checkToken);

        return () => {
            window.removeEventListener("storage", checkToken);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/login"); // Redireciona para o login após sair
        router.refresh();      // Garante que a página atualize os dados
    };

    return (
        <Box
            as="nav"
            bg="brand.500"
            w="full"
            borderBottom="1px"
            borderColor="whiteAlpha.200"
            px={{ base: "4", md: "8", lg: "12" }}
            py={3}
            shadow="sm"
        >
            <Flex
                w="full"
                alignItems="center"
                justifyContent="space-between"
                maxW="1440px"
                mx="auto"
            >
                {/* Logo */}
                <Link href="/">
                    <Box
                        position="relative"
                        width={{ base: "140px", md: "255px" }}
                        height={{ base: "40px", md: "68px" }}
                    >
                        <Image
                            src="/bb-logo.png"
                            alt="Logo do Banco do Brasil"
                            fill
                            style={{ objectFit: "contain" }}
                            priority
                        />
                    </Box>
                </Link>

                {/* Botões Dinâmicos */}
                <HStack gap={{ base: 2, md: 4 }}>
                    {isLoggedIn ? (
                        /* --- VISÃO LOGADO --- */
                        <Button
                            onClick={handleLogout}
                            size={{ base: "xs", md: "sm" }}
                            variant="solid"
                            colorScheme="red" // Cor de destaque para sair
                            bg="red.500"
                            color="white"
                            _hover={{ bg: "red.600" }}
                            fontWeight="bold"
                        >
                            Sair
                        </Button>
                    ) : (
                        /* --- VISÃO DESLOGADO --- */
                        <>
                            <Link href="/login" style={{ textDecoration: 'none' }}>
                                <Button
                                    size={{ base: "xs", md: "sm" }}
                                    variant="outline"
                                    color="brand.600"
                                    bg="white"
                                    _hover={{ bg: "blue.50" }}
                                    fontWeight="bold"
                                >
                                    Entrar
                                </Button>
                            </Link>
                            <Link href="/cadastro" style={{ textDecoration: 'none' }}>
                                <Button
                                    size={{ base: "xs", md: "sm" }}
                                    variant="outline"
                                    color="brand.600"
                                    bg="white"
                                    _hover={{ bg: "blue.50" }}
                                    fontWeight="bold"
                                >
                                    Cadastre-se
                                </Button>
                            </Link>
                        </>
                    )}
                </HStack>
            </Flex>
        </Box>
    );
};