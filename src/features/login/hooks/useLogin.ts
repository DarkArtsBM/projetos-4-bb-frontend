import { useState } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { UsuarioService } from "@/services/UsuarioService";

export function useLogin() {
    const router = useRouter();

    // 1. Estados
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);

    // 2. Lógica pesada isolada
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

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
            const data = await UsuarioService.login({ email, senha });

            localStorage.setItem("token", data.token);
            localStorage.setItem("nome", data.nome);
            localStorage.setItem("cargo", data.cargo);

            window.dispatchEvent(new Event("storage"));

            toaster.create({
                title: "Bem-vindo!",
                description: "Login realizado com sucesso.",
                type: "success",
            });

            router.push("/");
        } catch (error: any) {
            toaster.create({
                title: "Erro no login",
                description: "E-mail ou senha incorretos.",
                type: "error",
            });
        } finally {
            setCarregando(false);
        }
    };

    return {
        estados: { email, senha, carregando },
        acoes: { setEmail, setSenha, handleLogin }
    };
}