"use client";
import { VStack, Input, Button, Text, Box, Heading } from "@chakra-ui/react";
import { useState } from "react";


export function LoginForm() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleLogin = async () => {
        setCarregando(true);
        // Aqui você faria o fetch para o seu backend Java (ex: /api/auth/login)
        console.log("Tentando logar com:", email, senha);
        setCarregando(false);
    };

    return (
        <Box p={8} bg="white" borderRadius="xl" shadow="lg" w="400px">
            <VStack gap={4}>
                <Heading size="md"
                         color="blue.800"
                         fontSize="3xl"
                         fontWeight="black"
                >
                    Seja Bem Vindo!
                </Heading>

                <Input
                    placeholder="E-mail"
                    value={email}
                    _placeholder={{ color: "gray.500", fontWeight: "bold" }}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    placeholder="Senha"
                    type="password"
                    value={senha}
                    _placeholder={{ color: "gray.500", fontWeight: "bold" }}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <Button
                    colorPalette="yellow"
                    w="fit-content"
                    fontWeight="bold"
                    color="blue.800"
                    onClick={handleLogin}
                    loading={carregando}

                >
                    Entrar
                </Button>
                <Text fontSize="sm" color="gray.600">
                    Não tem uma conta?{" "}
                    <Text as="span" color="brand.600" fontWeight="bold" cursor="pointer" _hover={{ textDecoration: "underline" }}>
                        Cadastre-se aqui
                    </Text>
                </Text>
            </VStack>
        </Box>
    );
}