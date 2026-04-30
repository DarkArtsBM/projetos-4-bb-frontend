"use client";
import React from 'react';
import {
    Box,
    Button,
    Input,
    VStack,
    Heading,
} from '@chakra-ui/react';
import { Field } from "@/components/ui/field";
import { useTrocarSenha } from "@/features/senhas/hooks/useTrocarSenha"

export const TrocarSenhaForm = () => {

    const {
        senhaAtual, setSenhaAtual,
        novaSenha, setNovaSenha,
        confirmarSenha, setConfirmarSenha,
        carregando, handleTrocarSenha
    } = useTrocarSenha();

    return (
        <Box p={6} borderWidth={1} borderRadius="lg" boxShadow="md" bg="white" maxW="400px" w="full">
            <VStack gap={4} align="stretch" as="form" onSubmit={handleTrocarSenha}>
                <Heading size="md" textAlign="center" color="gray.700" fontWeight="bold"
                >Alterar Senha</Heading>

                <Field label="Senha Atual" color="gray.700" fontWeight="bold"required>
                    <Input
                        type="password"
                        placeholder="Digite a sua senha atual"
                        value={senhaAtual}
                        onChange={(e) => setSenhaAtual(e.target.value)}
                    />
                </Field>

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

                <Button
                    colorPalette="blue"
                    type="submit"
                    loading={carregando}
                    loadingText="A guardar..."
                    mt={4}
                >
                    Salvar Nova Senha
                </Button>
            </VStack>
        </Box>
    );
};