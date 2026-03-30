"use client";
import { VStack, Input, Button, Text, Box, Heading, Portal, Select, createListCollection, HStack, RadioGroup } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Provider } from "@/components/ui/provider"
import { PasswordInput } from "@/components/ui/password-input"








export function CadastroForm() {
    // Novos estados para o cadastro
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();

    const frameworks = createListCollection({
  items: [
    { label: "Português", value: "Portugues" },
    { label: "Kayapo", value: "Kayapo" },
    { label: "Tukano", value: "Tukano" },
    
  ],


})

    const handleCadastro = async () => {
        // Validação básica
        if (!nome || !email || !senha) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        setCarregando(true);
        try {
            // Ajuste a URL abaixo para o endpoint correto da sua API
            const response = await fetch("http://localhost:8080/api/usuarios/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha,
                }),
            });

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
                // Redireciona o usuário para fazer login após se cadastrar
                router.push("/login"); 
            } else {
                const errorMsg = await response.text();
                alert(errorMsg || "Erro ao realizar o cadastro.");
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            alert("Servidor fora do ar!");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <Box p={8} bg="white" borderRadius="xl" shadow="lg" w="400px">
            <VStack gap={4}>
                <Heading size="md"
                         color="blue.800"
                         fontSize="3xl"
                         fontWeight="black"
                >
                    Cadastro
                </Heading>

                <Input
                    placeholder="Nome completo"
                    value={nome}
                    _placeholder={{ color: "gray.500", fontWeight: "bold" }}
                    onChange={(e) => setNome(e.target.value)}
                />



               
                    
               <Select.Root collection={frameworks} size="sm" width="335px" >
      <Select.HiddenSelect />
      <Select.Label  fontWeight="bold" 
    color="gray.500"
    fontSize="sm">Selecione o idioma </Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Selecione idioma"  fontWeight="bold"
        color="gray.500"/>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {frameworks.items.map((framework) => (
              <Select.Item item={framework} key={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>

                

               

                <Input
                    placeholder="E-mail"
                    type="email"
                    value={email}
                    _placeholder={{ color: "gray.500", fontWeight: "bold" }}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <PasswordInput placeholder="Senha" />

                <Button
                    colorPalette="yellow"
                    w="fit-content"
                    fontWeight="bold"
                    color="blue.800"
                    onClick={handleCadastro}
                    loading={carregando}
                >
                    Cadastrar
                </Button>
                
                <Text fontSize="sm" color="gray.600">
                    Já tem uma conta?{" "}
                    <Text 
                        as="span" 
                        color="brand.600" 
                        fontWeight="bold" 
                        cursor="pointer" 
                        _hover={{ textDecoration: "underline" }}
                        onClick={() => router.push("/login")}
                    >
                        Entre aqui
                    </Text>
                </Text>
            </VStack>
        </Box>
    );
}