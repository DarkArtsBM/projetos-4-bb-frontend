"use client";
import { VStack, Input, Button, Text, Box, Heading,Field } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import {
    PasswordInput,
    PasswordStrengthMeter,
} from "@/components/ui/password-input"
import { useState } from "react";
import {useRouter} from "next/navigation";
import { api } from "@/lib/api";


export function LoginForm() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();

    const handleLogin = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validação básica para o usuario nao enviar nada em branco
        if (!email || !senha) {
            toaster.create({
                title: "Campos obrigatórios",
                description: "Por favor, preencha e-mail e senha.",
                type: "error",
            });
            return;
        }
        setCarregando(true);


        try {
            const data = await api.post<{ token: string }>("/usuarios/login", {
                email,
                senha,
            });

            localStorage.setItem("token", data.token);

            toaster.create({
                title: "Bem-vindo!",
                description: "Login realizado com sucesso.",
                type: "success",
            });

            router.push("/");
        } catch (error: any) {
            // 3. O erro cai aqui automaticamente se o status não for 2xx
            toaster.create({
                title: "Erro no login",
                description: "E-mail ou senha incorretos.",
                type: "error",
            });
        } finally {
            setCarregando(false);
        }
    };


    return (
        <Box
            p={8}
            bg="white"
            borderRadius="2xl"
            shadow="2xl"
            w={{ base: "90vw", md: "400px" }}
            border="1px solid"
            borderColor="gray.100"
        >
            <form onSubmit={handleLogin}>
                <VStack gap={6} align="stretch">
                    <VStack gap={1} mb={2}>
                        <Heading size="xl" color="blue.900" fontWeight="black">
                            Seja Bem-vindo!
                        </Heading>
                        <Text color="gray.500" fontSize="sm">
                            Faça login para acessar os tutoriais
                        </Text>
                    </VStack>

                    {/* Campo de E-mail */}
                    <Field.Root>
                        <Field.Label color="gray.700" fontWeight="bold">E-mail</Field.Label>
                        <Input
                            type="email"
                            placeholder="exemplo@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outline"
                            css={{ "--focus-color": "colors.blue.500" }}
                            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                            color="black"
                        />
                    </Field.Root>

                    {/* Campo de Senha usando o PasswordInput da sua UI */}
                    <Field.Root>
                        <Field.Label color="gray.700" fontWeight="bold">Senha</Field.Label>
                        <PasswordInput
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            color="black"
                        />
                    </Field.Root>

                    <Button
                        type="submit"
                        bg="yellow.400"
                        _hover={{ bg: "yellow.500" }}
                        color="blue.900"
                        fontWeight="bold"
                        size="lg"
                        width="full"
                        loading={carregando}
                        loadingText="Entrando..."
                    >
                        Entrar
                    </Button>

                    <Text fontSize="sm" color="gray.600" textAlign="center">
                        Não tem uma conta?{" "}
                        <Text
                            as="span"
                            color="blue.600"
                            fontWeight="bold"
                            cursor="pointer"
                            _hover={{ textDecoration: "underline" }}
                            onClick={() => router.push("/cadastro")}
                        >
                            Cadastre-se aqui
                        </Text>
                    </Text>
                </VStack>
            </form>
        </Box>
    );
}