// Importa o tipo Metadata do Next.js.
// Ele é usado para definir informações da página como título e descrição.
import type { Metadata } from "next";

// Importa o Provider que criamos anteriormente.
// Ele será usado para envolver toda a aplicação.
import { Provider } from "@/components/ui/provider";

import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";
import { Frank_Ruhl_Libre } from "next/font/google";
import {Toaster} from "@/components/ui/toaster";
import {Box, Flex} from "@chakra-ui/react";
import {Footer} from "@/components/layout/Footer";
import {ServiceFooter} from "@/components/layout/ServiceFooter";

// 2. Configura a fonte Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Mantém a variável CSS caso você precise usar no Tailwind ou globals.css
});

// Metadata é usada pelo Next.js para configurar informações da página.
// Essas informações são usadas por navegadores, SEO e redes sociais.
export const metadata: Metadata = {
  title: "FAQ",
  description: "FAQ do BB focado em Acessebilidade",
};

// RootLayout é o layout principal da aplicação.
// Todos os componentes e páginas serão renderizados dentro dele.
export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (

    // Define o idioma do documento HTML
    // pt-BR ajuda em SEO e acessibilidade
    <html lang="pt-BR" suppressHydrationWarning className={frank.variable}>
      <body>
        <Provider>
            <Flex direction="column" minH="100vh"> {/* Garante que o footer fique no rodapé */}
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