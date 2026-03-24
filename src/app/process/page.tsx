"use client";

import { Cards } from "@/components/layout/Cards";
import { Container, SimpleGrid, Button, HStack } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <HStack>
        <Container maxW="container.xl" py={10}>
          <SimpleGrid
            columns={{ base: 1, md: 2}}
            spacing={10}
            gap={1}
            justifyItems="center"
          >
            <Cards
              title="Dinheiro"
              description="Dinheiro"
            />
            <Cards
              title="Serviço"
              description="Serviço"
            />
            <Cards
              title="Senha"
              description="Senha"
            />
          </SimpleGrid>
        </Container>

      </HStack>
    </main>
  );
}

