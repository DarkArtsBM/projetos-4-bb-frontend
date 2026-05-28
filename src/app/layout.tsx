import type { Metadata } from "next";


import { Provider } from "@/components/ui/provider";

import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Frank_Ruhl_Libre, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Box, Flex } from "@chakra-ui/react";
import { Footer } from "@/components/layout/Footer";
import { ServiceFooter } from "@/components/layout/ServiceFooter";


const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const frankRuhl = Frank_Ruhl_Libre({
    subsets: ["latin"],
    variable: "--font-frank-ruhl",
});

export const metadata: Metadata = {
    title: "FAQ-BB",
    description: "FAQ do BB focado em Acessibilidade",
    manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="pt-BR"
            suppressHydrationWarning
            className={`${inter.variable} ${frankRuhl.variable}`}
        >
        <body>
        <Provider>
            <Flex direction="column" minH="100vh">
                <Navbar />
                <Box as="main" flex="1">
                    {children}
                </Box>
                <Toaster/>
                <ServiceFooter />
                <Footer />
            </Flex>
        </Provider>
        </body>
        </html>
    );
}