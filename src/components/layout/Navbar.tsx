"use client";

import { Box, Flex, Button, HStack } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
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

                {/* Botões */}
                <HStack gap={{ base: 2, md: 4 }}>
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

                </HStack>
            </Flex>
        </Box>
    );
};