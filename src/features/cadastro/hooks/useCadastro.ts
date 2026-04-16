import { useState } from "react";
import { useRouter } from "next/navigation";
import { toaster } from "@/components/ui/toaster";
import { UsuarioService } from "@/services/UsuarioService" ;

export function useCadastro() {
    const router = useRouter();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleCadastro = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!nome || !email || !senha || !confirmarSenha ) {
            toaster.create({ title: "Erro", description: "Preencha todos os campos.", type: "error" });
            return;
        }

        if (senha !== confirmarSenha) {
            toaster.create({ title: "Erro", description: "As senhas não coincidem.", type: "error" });
            return;
        }

        setCarregando(true);
        try {
            await UsuarioService.registrar( {
                nome, email, senha,
            });

            toaster.create({ title: "Sucesso!", description: "Cadastro realizado.", type: "success" });
            router.push("/login");
        } catch (error) {
            console.error("Erro no cadastro:", error);
            toaster.create({ title: "Erro", description: "Tente novamente.", type: "error" });
        } finally {
            setCarregando(false);
        }
    };


    return {
        estados: { nome, email, senha, confirmarSenha,  carregando },
        acoes: { setNome, setEmail, setSenha, setConfirmarSenha,  handleCadastro }
    };
}