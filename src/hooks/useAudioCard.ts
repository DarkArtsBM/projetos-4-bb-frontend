import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import { AudioService } from "@/services/AudioService";
import { useSelectionStore } from "@/store/useSelectionStore";

export function useAudioCard(audioId: number, votosIniciais: number) {
    const [votos, setVotos] = useState(votosIniciais);
    const [jaVotou, setJaVotou] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const dispararPlayMuted = useSelectionStore((state) => state.dispararPlayMuted);

    const handleUpvote = async () => {
        if (jaVotou) return;

        const token = localStorage.getItem("token");

        if (!token) {
            toaster.create({
                title: "Acesso restrito",
                description: "Você precisa estar logado para votar.",
                type: "error",
            });
            return;
        }

        setCarregando(true);

        try {
            // Chamamos o serviço em vez da api diretamente
            const dadosAtualizados = await AudioService.votar(audioId);

            setVotos(dadosAtualizados.votos);
            setJaVotou(true);
            toaster.create({ title: "Voto registrado!", type: "success" });

        } catch (erro: any) {
            toaster.create({
                title: "Erro no Voto",
                description: erro?.message || "Falha ao registrar voto.",
                type: "error",
            });
        } finally {
            setCarregando(false);
        }
    };

    return {
        estados: { votos, jaVotou, carregando },
        acoes: { handleUpvote, dispararPlayMuted }
    };
}