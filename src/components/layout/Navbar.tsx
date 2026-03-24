"use client";

import { Box, Flex, Button, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
    return (
        <Box
            as="nav"
            bg="brand.500"
            className="w-full border-b px-4 py-3 shadow-sm"
        >
            <Flex className="w-full items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <Box position="relative" width="255px" height="68px">
                        <Image
                            src="/bb-logo.png"
                            alt="Logo do Banco do Brasil"
                            fill // Faz a imagem preencher o Box pai
                            style={{ objectFit: "contain" }} // Garante que a logo não estique
                            priority // Carrega a logo mais rápido por ser o topo da página
                        />
                    </Box>
                </Link>

                {/* Botão de Ação / Login */}
                <HStack>
                    <Button
                        colorScheme="blue"
                        size="sm"
                        variant="outline"
                        color="brand.600"
                        bg="brand.white"
                        _hover={{ bg: "blue.700", color: "white" }}
                        fontWeight="bold"
                        mr={3}
                        >
                        Entrar
                    </Button>
                    {/* Aqui você poderia colocar um ícone de menu hambúrguer para mobile futuramente */}
                </HStack>
            </Flex>
        </Box>
    );
};