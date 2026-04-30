import { Flex } from "@chakra-ui/react";
import { LoginForm } from "@/features/login/LoginForm";

export default function LoginPage() {
    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.100">
            <LoginForm />
        </Flex>
    );
}