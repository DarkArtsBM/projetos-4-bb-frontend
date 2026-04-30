import { useState } from 'react';
import { toaster } from "@/components/ui/toaster";
import { UsuarioService } from '@/services/UsuarioService';

export const useEsqueciSenha = () => {
    const [email, setEmail] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [enviado, setEnviado] = useState(false); // Para mudar a tela após o envio

    const handleSolicitar = async (e: React.FormEvent) => {
        e.preventDefault();
        setCarregando(true);

        try {
            await UsuarioService.esqueciSenha({ email });
            setEnviado(true);
            toaster.create({
                title: "E-mail enviado!",
                description: "Se o e-mail existir, você receberá um link em instantes.",
                type: "success",
                duration: 5000,
            });
        } catch (error: any) {
            toaster.create({
                title: "Erro",
                description: error.message || "Ocorreu um erro ao tentar enviar o e-mail.",
                type: "error",
            });
        } finally {
            setCarregando(false);
        }
    };

    return { email, setEmail, carregando, enviado, handleSolicitar };
};