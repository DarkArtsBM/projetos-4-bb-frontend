"use client";
import { 
    VStack, Input, Button, Text, Box, Heading, Portal, 
    Select, createListCollection, HStack, RadioGroup 
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/ui/password-input";

export function CadastroForm() {
    // Estados do formulário
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [idioma, setIdioma] = useState([]); // Chakra UI Select usa array
    const [tradutor, setTradutor] = useState("n"); // "n" como padrão (Não)
    
    const [carregando, setCarregando] = useState(false);
    const router = useRouter();

    const tradutorOpcoes = [
        { label: "Sim", value: "y" },
        { label: "Não", value: "n" },
    ];

    const frameworks = createListCollection({
        items: [
            { label: "Português", value: "Portugues" },
            { label: "Kayapo", value: "Kayapo" },
            { label: "Tukano", value: "Tukano" },
        ],
    });

    const handleCadastro = async () => {
        // Validação básica
        if (!nome || !email || !senha || !confirmarSenha) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        setCarregando(true);
        try {
            const response = await fetch("http://localhost:8080/api/usuarios/cadastro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha,
                    idioma: idioma[0] || "", // Pega o primeiro valor do array do select
                    tradutor: tradutor === "y", // Envia como booleano (true/false)
                }),
            });

            if (response.ok) {
                alert("Cadastro realizado com sucesso!");
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
            <VStack gap={4} w="full">
                <Heading 
                    size="md"
                    color="blue.800"
                    fontSize="3xl"
                    fontWeight="black"
                    mb={4}
                >
                    Cadastro
                </Heading>

                <Input
                    placeholder="Nome completo"
                    value={nome}
                    w="full"
                    _placeholder={{ color: "gray.500", fontWeight: "bold" }}
                    onChange={(e) => setNome(e.target.value)}
                />

                {/* SELECT DE IDIOMA */}
                <Select.Root 
                    collection={frameworks} 
                    size="sm" 
                    w="full"
                    value={idioma}
                    onValueChange={(e) => setIdioma(e.value)}
                >
                    <Select.HiddenSelect />
                    <Select.Label fontWeight="bold" color="gray.500" fontSize="sm"> 
                        Selecione o idioma 
                    </Select.Label>
                    <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText placeholder="Selecione idioma" fontWeight="bold" color="gray.500"/>
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

                {/* RADIO GROUP TRADUTOR */}
                <VStack align="start" w="full" gap={2}>
                    <Text fontWeight="bold" color="gray.500" fontSize="sm">
                        Você é tradutor?
                    </Text>
                    <RadioGroup.Root 
                        value={tradutor} 
                        onValueChange={(e) => setTradutor(e.value)}
                    >
                        <HStack gap="6">
                            {tradutorOpcoes.map((item) => (
                                <RadioGroup.Item key={item.value} value={item.value}>
                                    <RadioGroup.ItemHiddenInput />
                                    <RadioGroup.ItemIndicator />
                                    <RadioGroup.ItemText fontWeight="medium" color="gray.700">
                                        {item.label}
                                    </RadioGroup.ItemText>
                                </RadioGroup.Item>
                            ))}
                        </HStack>
                    </RadioGroup.Root>
                </VStack>

                <Input
                    placeholder="E-mail"
                    type="email"
                    value={email}
                    w="full"
                    _placeholder={{ color: "gray.500", fontWeight: "bold" }}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <PasswordInput 
                    placeholder="Senha" 
                    value={senha}
                    w="full"
                    onChange={(e) => setSenha(e.target.value)}
                />
                
                <PasswordInput 
                    placeholder="Confirmar senha" 
                    value={confirmarSenha}
                    w="full"
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                />

                <Button
                    colorPalette="yellow"
                    w="full"
                    mt={2}
                    fontWeight="bold"
                    color="blue.800"
                    onClick={handleCadastro}
                    loading={carregando}
                >
                    Cadastrar
                </Button>
                
                <Text fontSize="sm" color="gray.600" mt={2}>
                    Já tem uma conta?{" "}
                    <Text 
                        as="span" 
                        color="blue.600" 
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