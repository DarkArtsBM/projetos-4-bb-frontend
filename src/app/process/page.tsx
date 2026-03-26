"use client";

import { Cards } from "@/components/layout/Cards";
import { useRouter } from "next/navigation";
import { useSelectionStore } from "@/store/useSelectionStore";
import { Container, SimpleGrid, Text, HStack } from "@chakra-ui/react";
import { BANCO_MOCK } from "@/data/content";

export default function HomePage() {
  const router = useRouter();
  const { selectedLanguage, setProcess } = useSelectionStore();

  const processesFromBank = selectedLanguage
    ? Object.keys(BANCO_MOCK[selectedLanguage as keyof typeof BANCO_MOCK] || {})
    : [];

  const handleSelect = (name: string) => {
    setProcess(name);
    router.push("/media");
  };

  return (
    <main className="min-h-dvh grid place-items-center p-6">
      <HStack>
        <Container maxW="container.xl" py={10}>
          <Text mb={4} color="brand.6l00">
            Você selecionou: {selectedLanguage}
          </Text>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            gap={2}
            justifyItems="center"
          >
            {processesFromBank.length > 0 ? (
              processesFromBank.map((proc) => (
                <Cards
                  key={proc}
                  title={proc}
                  description={`Serviços de ${proc}`}
                  onClick={() => handleSelect(proc)}
                />
              ))
            ) : (
              <Text>Nenhum processo encontrado para esta língua.</Text>
            )}
          </SimpleGrid>
        </Container>
      </HStack>
    </main>
  );
}
