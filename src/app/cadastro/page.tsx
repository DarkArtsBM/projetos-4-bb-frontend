import { Flex } from "@chakra-ui/react";
import { CadastroForm } from "@/components/features/CadastroForm";

export default function CadastroPage() {
    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.100">
            {/* O componente de login fica centralizado */}
            <CadastroForm />
        </Flex>
    );
}