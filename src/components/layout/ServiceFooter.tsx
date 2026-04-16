"use client";

import { Box, Container, SimpleGrid, Text, VStack, Image, Flex } from "@chakra-ui/react";
import {FOOTER_CONTACTS} from "@/helpers/contacts";

export function ServiceFooter() {
    return (
        <Box bg="gray.50" py={10} borderTop="1px solid" borderColor="gray.200">
            <Container maxW="container.xl">
                <Flex direction={{ base: "column", lg: "row" }} align="center" gap={10}>

                    {/* Grid de Contatos */}
                    <SimpleGrid columns={{ base: 1, md: 3 }} gapX={12} gapY={6} flex="1">
                        {FOOTER_CONTACTS.map((item, index) => (
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