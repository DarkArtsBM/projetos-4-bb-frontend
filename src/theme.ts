// Importa funções do Chakra UI para criar e configurar um sistema de design.
// createSystem -> cria o sistema de tema do Chakra
// defineConfig -> define a configuração personalizada
// defaultConfig -> configuração padrão do Chakra
import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";


// Aqui criamos a configuração personalizada do tema.
// Essa configuração será usada para modificar ou expandir o tema padrão do Chakra.
const config = defineConfig({
  theme: {

    // tokens são variáveis de design (design tokens).
    // Eles representam valores reutilizáveis como cores, espaçamentos, fontes etc.
    tokens: {

      // Definimos cores personalizadas para o projeto.
      colors: {

        // "brand" é um grupo de cores da marca da aplicação.
        // Esse padrão é comum em design systems.
        brand: {

          white:{ value: "#ffffff" },
          100: {value: "gray.50"},
          500: { value: "#FDE100" },

          600: { value: "#003882" },
          610: { value: "#094da5" }
        },
      },
    },
  },
});


// Aqui criamos o "system" do Chakra.
// Esse system junta:
// - a configuração padrão do Chakra (defaultConfig)
// - com nossa configuração personalizada (config)

// Esse objeto final será usado no ChakraProvider
export const system = createSystem(defaultConfig, config);