"use client";

import React, { Suspense } from 'react';
import { Box, Button, Input, VStack, Heading, Text, Flex } from '@chakra-ui/react';
import { Field } from "@/components/ui/field";
import { useResetarSenha } from '@/features/senhas/hooks/useResetarSenha';

export const ResetarSenhaForm= () => {
    const { token, novaSenha, setNovaSenha, confirmarSenha, setConfirmarSenha, carregando, handleResetar } = useResetarSenha();

    if (!token) {
        return (
            <Text color="red.500" textAlign="center" p={4}>
                Link inválido ou ausente. Por favor, solicite a recuperação de senha novamente.
            </Text>
        );
    }

    return (
        <VStack gap={4} align="stretch" as="form" onSubmit={handleResetar}>
            <Heading size="md" textAlign="center">Criar Nova Senha</Heading>
            <Text fontSize="sm" color="gray.700" fontWeight="bold" textAlign="center" mb={4}>
                Digite a sua nova senha abaixo.
            </Text>

            <Field label="Nova Senha" color="gray.700" fontWeight="bold" required>
                <Input
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                />
            </Field>

            <Field label="Confirmar Nova Senha" color="gray.700" fontWeight="bold" required>
                <Input
                    type="password"
                    placeholder="Repita a nova senha"
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                />
            </Field>

            <Button colorPalette="blue" type="submit" loading={carregando} mt={4}>
                Salvar Nova Senha
            </Button>
        </VStack>
    );
}
