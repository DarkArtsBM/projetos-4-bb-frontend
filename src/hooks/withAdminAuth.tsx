"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

export function withAdminAuth<P extends object>(Component: React.ComponentType<P>) {
    return function ProtectedRoute(props: P) {
        const router = useRouter();
        const [autorizado, setAutorizado] = useState(false);

        useEffect(() => {
            const cargo = localStorage.getItem("cargo");

            if (cargo === "ADMIN" || cargo === "SUPER_ADMIN") {
                setAutorizado(true);
            } else {
                router.replace("/");
            }
        }, [router]);

        if (!autorizado) {
            return (
                <Center h="100vh">
                    <VStack gap={4}>
                        <Spinner size="xl" color="blue.500" />
                        <Text fontWeight="bold">Verificando permissões...</Text>
                    </VStack>
                </Center>
            );
        }

        return <Component {...props} />;
    };
}