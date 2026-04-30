"use client";

import React from 'react';
import { Box, Button, Input, VStack, Heading, Text, Flex } from '@chakra-ui/react';
import { Field } from "@/components/ui/field";
import { useEsqueciSenha } from '@/features/senhas/hooks/useEsqueciSenha';

export const EsqueciSenhaForm = () => {
    const { email, setEmail, carregando, enviado, handleSolicitar } = useEsqueciSenha();

    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.50" p={4}>
            <Box p={6} borderWidth={1} borderRadius="lg" boxShadow="md" bg="white" maxW="400px" w="full">
                {enviado ? (
                    <VStack gap={4} textAlign="center">
                        <Heading size="md" color="green.600">Verifique seu E-mail</Heading>
                        <Text fontSize="sm" color="gray.600">
                            Enviamos as instruções de recuperação para <b>{email}</b>.
                            Lembre-se de verificar a caixa de spam!
                        </Text>
                    </VStack>
                ) : (
                    <VStack gap={4} align="stretch" as="form" onSubmit={handleSolicitar}>
                        <Heading size="md" textAlign="center " color="gray.700" fontWeight="bold">Recuperar Senha</Heading>
                        <Text fontSize="sm" color="gray.500" textAlign="center" mb={4}>
                            Digite o e-mail cadastrado na sua conta para receber um link de recuperação.
                        </Text>

                        <Field label="E-mail" color="gray.700" fontWeight="bold" required>
                            <Input
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Field>

                        <Button
                            colorPalette="blue"
                            type="submit"
                            loading={carregando}
                            mt={4}
                        >
                            Enviar Link
                        </Button>
                    </VStack>
                )}
            </Box>
        </Flex>
    );
};