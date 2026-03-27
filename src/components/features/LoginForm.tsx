"use client";
import { VStack, Input, Button, Text, Box, Heading } from "@chakra-ui/react";
import { useState } from "react";
import {useRouter} from "next/navigation";


export function LoginForm() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        setCarregando(true);
        try {
            const response = await fetch("http://localhost:8080/api/usuarios/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha,
                }),
            });

            if (response.ok) {
                const data = await response.json();


                localStorage.setItem("token", data.token);


                router.push("/");
            } else {
                const errorMsg = await response.text();
                alert(errorMsg || "Erro ao realizar login.");
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            alert("Servidor fora do ar!");
        } finally {
            setCarregando(false);
        }
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