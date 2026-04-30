"use client";
import { VStack, Input, Button, Text, Box, Heading, Field, chakra } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { useLogin } from "@/features/login/hooks/useLogin";

export function LoginForm() {
    const router = useRouter();

    const { estados, acoes } = useLogin();

    return (
        <Box
            p={8} bg="white" borderRadius="2xl" shadow="2xl"
            w={{ base: "90vw", md: "400px" }} border="1px solid" borderColor="gray.100"
        >
            <form onSubmit={acoes.handleLogin}>
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
                            value={estados.email}
                            onChange={(e) => acoes.setEmail(e.target.value)}
                            variant="outline"
                            css={{ "--focus-color": "colors.blue.500" }}
                            _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                            color="black"
                        />
                    </Field.Root>

                    {/* Campo de Senha */}
                    <Field.Root>
                        <Field.Label color="gray.700" fontWeight="bold">Senha</Field.Label>
                        <PasswordInput
                            placeholder="Senha"
                            value={estados.senha}
                            onChange={(e) => acoes.setSenha(e.target.value)}
                            color="black"
                        />
                    </Field.Root>

                    <Button
                        type="submit" bg="yellow.400" _hover={{ bg: "yellow.500" }}
                        color="blue.900" fontWeight="bold" size="lg" width="full"
                        loading={estados.carregando} loadingText="Entrando..."
                    >
                        Entrar
                    </Button>

                    <VStack gap={2} mt={4}>
                        {/* Primeira Linha */}
                        <Text fontSize="sm" color="gray.600" textAlign="center">
                            Não tem uma conta?{" "}
                            <chakra.span
                                color="blue.600"
                                fontWeight="bold"
                                cursor="pointer"
                                _hover={{ textDecoration: "underline" }}
                                onClick={() => router.push("/cadastro")}
                            >
                                Cadastre-se aqui
                            </chakra.span>
                        </Text>

                        {/* Segunda Linha - Agora como um parágrafo irmão, não filho */}
                        <Text fontSize="sm" color="gray.600" textAlign="center">
                            Esqueceu a senha?{" "}
                            <chakra.span
                                color="blue.600"
                                fontWeight="bold"
                                cursor="pointer"
                                _hover={{ textDecoration: "underline" }}
                                onClick={() => router.push("/esquecisenha")}
                            >
                                Trocar Senha
                            </chakra.span>
                        </Text>
                    </VStack>
                </VStack>
            </form>
        </Box>
    );
}