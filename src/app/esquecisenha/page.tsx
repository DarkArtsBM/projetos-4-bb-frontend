import React from "react";
import { Flex } from "@chakra-ui/react";
import { EsqueciSenhaForm } from "@/features/senhas/EsqueciSenhaForm";

export default function TrocarSenhaPage() {
    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bg="gray.50"
            p={4}
        >
            <EsqueciSenhaForm />
        </Flex>
    );
}