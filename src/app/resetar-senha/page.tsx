import {Box, Flex, Text} from "@chakra-ui/react";
import React, {Suspense} from "react";
import {ResetarSenhaForm} from "@/features/senhas/ResetarSenhaForm";

export default function ResetarSenhaPage() {
    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.50" p={4}>
            <Box p={6} borderWidth={1} borderRadius="lg" boxShadow="md" bg="white" maxW="400px" w="full">
                {/* O Suspense é obrigatório no Next.js quando usamos useSearchParams no Client Side */}
                <Suspense fallback={<Text>Carregando...</Text>}>
                    <ResetarSenhaForm />
                </Suspense>
            </Box>
        </Flex>
    );
}