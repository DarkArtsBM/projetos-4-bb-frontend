"use client";

import { Button } from "@chakra-ui/react";
import { FiShield } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function BotaoAdmin() {
    const router = useRouter();
    const { isAdmin } = useAuth();

    if (!isAdmin) return null;

    return (
        <Button
            colorPalette="purple"
            variant="solid"
            size="md"
            onClick={() => router.push("/admin")}
        >
            <FiShield style={{ marginRight: '8px' }} />
            Painel Admin
        </Button>
    );
}