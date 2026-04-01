"use client";

import { VStack, Input, Button, Text, Box, Heading, Field } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "next/navigation";
import { useCadastro } from "@/features/cadastro/hooks/useCadastro";

export function CadastroForm() {
    const router = useRouter();
    const { estados, acoes } = useCadastro();

    return (
        <Box p={8} bg="white" borderRadius="2xl" shadow="2xl" w={{ base: "90vw", md: "400px" }} border="1px solid" borderColor="gray.100" data-theme="light">
            <form onSubmit={acoes.handleCadastro}>
                <VStack gap={5} w="full" align="stretch">
                    <VStack gap={1} mb={2} align="center">
                        <Heading size="xl" color="blue.900" fontWeight="black">Crie sua conta</Heading>
                    </VStack>

                    <Field.Root>
                        <Field.Label color="gray.700" fontWeight="bold">Nome completo</Field.Label>
                        <Input value={estados.nome}
                               onChange={(e) => acoes.setNome(e.target.value)} color="black" />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label color="gray.700" fontWeight="bold">E-mail</Field.Label>
                        <Input type="email"
                               value={estados.email} onChange={(e) => acoes.setEmail(e.target.value)}
                               color="black" />
                    </Field.Root>


                    <Field.Root>
                        <Field.Label color="gray.700" fontWeight="bold">Senha</Field.Label>
                        <PasswordInput value={estados.senha}
                                       onChange={(e) => acoes.setSenha(e.target.value)} color="black" />
                    </Field.Root>

                    <Field.Root>
                        <Field.Label color="gray.700" fontWeight="bold">Confirmar senha</Field.Label>
                        <PasswordInput value={estados.confirmarSenha}
                                       onChange={(e) => acoes.setConfirmarSenha(e.target.value)} color="black" />
                    </Field.Root>

                    <Button type="submit" bg="yellow.400" color="blue.900" fontWeight="bold" size="lg" mt={4} width="full" loading={estados.carregando}>
                        Cadastrar
                    </Button>

                    <Text fontSize="sm" color="gray.600" textAlign="center" mt={2}>
                        Já tem uma conta? <Text as="span" color="blue.600" fontWeight="bold" cursor="pointer"
                                                onClick={() => router.push("/login")}>Entre aqui</Text>
                    </Text>
                </VStack>
            </form>
        </Box>
    );
}