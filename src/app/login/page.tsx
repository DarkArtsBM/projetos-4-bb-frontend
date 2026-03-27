import { Flex } from "@chakra-ui/react";
import { LoginForm } from "@/components/features/LoginForm";

export default function LoginPage() {
    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.100">
            {/* O componente de login fica centralizado */}
            <LoginForm />
        </Flex>
    );
}