import { useState } from 'react';
import { toaster } from "@/components/ui/toaster";
import { UsuarioService } from '@/services/UsuarioService';

export const useTrocarSenha = () => {
    const [senhaAtual, setSenhaAtual] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [carregando, setCarregando] = useState(false);

    const handleTrocarSenha = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validação local
        if (novaSenha !== confirmarSenha) {
            toaster.create({
                title: "As senhas não coincidem",
                description: "A confirmação da nova senha está diferente.",
                type: "warning",
                duration: 4000,
            });
            return;
        }

        setCarregando(true);

        try {
            await UsuarioService.trocarSenha({
                senhaAtual,
                novaSenha
            });

            toaster.create({
                title: "Senha alterada!",
                description: "A sua senha foi atualizada com sucesso.",
                type: "success",
                duration: 4000,
            });

            setSenhaAtual('');
            setNovaSenha('');
            setConfirmarSenha('');

        } catch (error: any) {
            toaster.create({
                title: "Erro ao trocar senha",
                description: error.message || "Verifique a sua senha atual e tente novamente.",
                type: "error",
                duration: 5000,
            });
        } finally {
            setCarregando(false);
        }
    };

    return {
        senhaAtual, setSenhaAtual,
        novaSenha, setNovaSenha,
        confirmarSenha, setConfirmarSenha,
        carregando,
        handleTrocarSenha
    };
};