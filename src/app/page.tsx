"use client";

import { Cards } from "@/components/layout/Cards";
import { Container, SimpleGrid, Button, HStack } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <HStack>
        <Container maxW="container.xl" py={10}>
          <SimpleGrid
            columns={{ base: 1, md: 3}}
            gap={2}
            justifyItems="center"
          >
            <Cards
              title="PORTUGUÊS"
              description="Linguas Brasileira"
            />
            <Cards
              title="TUKANO"
              description="Linguas dos tukano"
            />
            <Cards
              title="KAYAPÓ"
              description="Linguas dos kayapó"
            />
          </SimpleGrid>
        </Container>

      </HStack>
    </main>
  );
}

