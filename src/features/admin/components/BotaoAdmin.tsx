"use client";

import { useState, useEffect } from "react";
import { Button } from "@chakra-ui/react";
import { FiShield } from "react-icons/fi";
import { useRouter } from "next/navigation";

export function BotaoAdmin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();


    useEffect(() => {

        const cargo = localStorage.getItem("cargo");

        if (cargo === "ADMIN"|| cargo === "SUPER_ADMIN") {
            setIsAdmin(true);
        }else {
            setIsAdmin(false);
        }
    }, []);

    if (!isAdmin) {
        return null;
    }


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