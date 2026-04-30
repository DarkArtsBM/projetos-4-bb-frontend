import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toaster } from "@/components/ui/toaster";
import { UsuarioService } from '@/services/UsuarioService';

export const useResetarSenha = () => {
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [carregando, setCarregando] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token'); // Captura o token da URL!

    const handleResetar = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            toaster.create({ title: "Erro", description: "Token inválido ou ausente.", type: "error" });
            return;
        }

        if (novaSenha !== confirmarSenha) {
            toaster.create({ title: "Aviso", description: "As senhas não coincidem.", type: "warning" });
            return;
        }

        setCarregando(true);

        try {
            await UsuarioService.resetarSenha({ token, novaSenha });

            toaster.create({
                title: "Sucesso!",
                description: "Sua senha foi alterada. Você já pode fazer login.",
                type: "success",
                duration: 5000,
            });

            // Redireciona o usuário para a tela de login
            router.push('/login');

        } catch (error: any) {
            toaster.create({
                title: "Erro",
                description: error.message || "O token pode ter expirado. Tente novamente.",
                type: "error",
            });
        } finally {
            setCarregando(false);
        }
    };

    return { token, novaSenha, setNovaSenha, confirmarSenha, setConfirmarSenha, carregando, handleResetar };
};