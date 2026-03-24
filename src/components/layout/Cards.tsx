"use client";

import { Button, Card, Image, Text } from "@chakra-ui/react"
import { useRouter } from "next/navigation";

type LanguageCardProps = {
    title: string;
    description: string;
};

export function Cards({ title, description }: LanguageCardProps) {
    return (
        <Card.Root
            width={{ base: "85vw", md: "200px" }}
            minH={{ base: "50px", md: "300px" }}
            overflow="hidden"
            bg="brand.600"
            color="brand.white"
            py="10"
            _hover={{ bg: "brand.white", color: "brand.600", cursor: "pointer" }}
            transition="all 0.3s ease-in-out"
        >
            {/* <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
            /> */}
            <Card.Body
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                textAlign="center"
                gap="4"
            >
                <Card.Title alt={description} fontSize={{ base: "lg", md: "2xl" }}>
                    {title}
                </Card.Title>
            </Card.Body>
        </Card.Root>
    )
}
