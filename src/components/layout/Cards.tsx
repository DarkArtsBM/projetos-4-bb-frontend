"use client";

import { Card, Text, Icon, VStack, Box } from "@chakra-ui/react";
// Importe um ícone se desejar (ex: Luccide ou React Icons)
// import { FiArrowRight } from "react-icons/fi"; 

interface GenericCardProps {
  title: string;
  description?: string;
  onClick: () => void;
}

export function Cards({ title, description, onClick }: GenericCardProps) {
  return (
    <Card.Root
      onClick={onClick}
      width={{ base: "90vw", md: "240px" }}
      minH={{ base: "80px", md: "260px" }}
      overflow="hidden"
      bg="brand.600"
      color="white"
      borderRadius="2xl"
      border="1px solid"
      borderColor="whiteAlpha.200"
      position="relative"
      role="group"
      transition="all 0.4s cubic-bezier(.17,.67,.83,.67)"
      _hover={{ 
        transform: "translateY(-8px)",
        shadow: "2xl", 
        bg: "brand.610",
        cursor: "pointer",
        borderColor: "brand.300",
        color: "brand.500"
      }}
    >
      <Card.Body
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        p="6"
      >
        <VStack gap="4">
          {/* Elemento Decorativo: Um círculo sutil no fundo */}
          <Box
            position="absolute"
            top="-10%"
            right="-10%"
            bg="whiteAlpha.100"
            w="100px"
            h="100px"
            borderRadius="full"
          />

          <Card.Title
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            letterSpacing="tight"
            _groupHover={{ color: "brand.200" }} // Muda cor do título no hover
          >
            {title}
          </Card.Title> 
        </VStack>
      </Card.Body>
    </Card.Root>
  );
}