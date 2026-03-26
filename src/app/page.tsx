"use client";

import { Cards } from "@/components/layout/Cards";
import { Container, SimpleGrid, Button, HStack } from "@chakra-ui/react";
import { BANCO_MOCK } from "@/data/content";
import { useSelectionStore } from "@/store/useSelectionStore";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const setLanguage = useSelectionStore((s) => s.setLanguage);
  const linguasDisponiveis = Object.keys(BANCO_MOCK);

  const handleSelect = (nome: string) => {
    setLanguage(nome);
    router.push("/process");
  };
  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <HStack>
        <Container maxW="container.xl" py={10}>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={2}
            justifyItems="center"
          >
            {linguasDisponiveis.map((lingua) => (
              <Cards
                key={lingua}
                title={lingua}
                description={`Conteúdo disponível em ${lingua}`}
                onClick={() => handleSelect(lingua)}
              />
            ))}
            {/* <Cards
              title="PORTUGUÊS"
              description="Linguas Brasileira"
              onClick={() => handleSelect("PORTUGUES")}
            />
            <Cards
              title="TUKANO"
              description="Linguas dos tukano"
              onClick={() => handleSelect("TUKANO")}
            />
            <Cards
              title="KAYAPÓ"
              description="Linguas dos kayapó"
              onClick={() => handleSelect("KAYAPO")}
            /> */}
          </SimpleGrid>
        </Container>
      </HStack>
    </main>
  );
}
