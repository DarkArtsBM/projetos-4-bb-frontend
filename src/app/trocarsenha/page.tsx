import React from "react";
import { Flex } from "@chakra-ui/react";
import { TrocarSenhaForm } from "@/features/senhas/TrocarSenhaForm";

export default function TrocarSenhaPage() {
    return (
        <Flex
            minH="100vh"
            align="center"
            justify="center"
            bg="gray.50"
            p={4}
        >
            <TrocarSenhaForm />
        </Flex>
    );
}