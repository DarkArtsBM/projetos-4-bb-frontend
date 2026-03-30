// Importa o tipo Metadata do Next.js.
// Ele é usado para definir informações da página como título e descrição.
import type { Metadata } from "next";

// Importa o Provider que criamos anteriormente.
// Ele será usado para envolver toda a aplicação.
import { Provider } from "@/components/ui/provider";

// Importa o CSS global da aplicação.
import "./globals.css";

import { Navbar } from "@/components/layout/Navbar";

// 1. Importa a fonte Inter do Google Fonts
import { Inter } from "next/font/google";

// 2. Configura a fonte Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Mantém a variável CSS caso você precise usar no Tailwind ou globals.css
});

// Metadata é usada pelo Next.js para configurar informações da página.
// Essas informações são usadas por navegadores, SEO e redes sociais.
export const metadata: Metadata = {
  title: "Aula Componentização",
  description: "Exemplo com Chakra UI v3",
};

// RootLayout é o layout principal da aplicação.
// Todos os componentes e páginas serão renderizados dentro dele.
export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (

    // Define o idioma do documento HTML
    // pt-BR ajuda em SEO e acessibilidade
    // 3. Aplica a classe da fonte Inter globalmente
    <html lang="pt-BR" suppressHydrationWarning className={inter.className}>

      <body>

        <Provider>
          <Navbar />

          {/* children representa o conteúdo da página atual */}
          {children}

        </Provider>

      </body>

    </html>
  );
}