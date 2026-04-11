"use client";

import { Box, Container, SimpleGrid, Text, VStack, Image, Flex } from "@chakra-ui/react";

const contacts = [
    { label: "Central de Relacionamento BB", value: "4004 0001 / 0800 729 0001" },
    { label: "SAC", value: "0800 729 0722" },
    { label: "Ouvidoria BB", value: "0800 729 5678" },
    { label: "Pessoa com Deficiência Auditiva ou de Fala", value: "0800 729 0088 / Atendimento em Libras" },
    { label: "WhatsApp", value: "61 4004 0001" },
    { label: "Canal de Ética e Denúncias BB", value: "0800 300 4455" },
];

export function ServiceFooter() {
    return (
        <Box bg="gray.50" py={10} borderTop="1px solid" borderColor="gray.200">
            <Container maxW="container.xl">
                <Flex direction={{ base: "column", lg: "row" }} align="center" gap={10}>

                    {/* Grid de Contatos */}
                    <SimpleGrid columns={{ base: 1, md: 3 }} gapX={12} gapY={6} flex="1">
                        {contacts.map((item, index) => (
                            <VStack key={index} align="start" gap={0}>
                                <Text fontSize="xs" color="blue.600" fontWeight="medium">
                                    {item.label}
                                </Text>
                                <Text fontSize="md" color="blue.800" fontWeight="bold">
                                    {item.value}
                                </Text>
                            </VStack>
                        ))}
                    </SimpleGrid>


                    <Box w="200px">
                        <a href="https://www.bb.com.br/site/acesso-a-informacao/" target="_blank" rel="noopener noreferrer">
                            <Image
                                src="/acesso_a_informacao.png"
                                alt="Clique para acessar o portal da Transparência"
                            />
                        </a>
                    </Box>

                </Flex>
            </Container>
        </Box>
    );
}