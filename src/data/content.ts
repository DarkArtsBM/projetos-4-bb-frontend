// src/data/content.ts

export interface AudioItem {
  nome: string;
  url: string;
  likes: number;
  dislikes: number;
}
export interface ProcessContent {
  videoUrl: string;
  audios: AudioItem[];
  descricao: string;
}

// Define que cada língua é um objeto que contém processos
export interface LanguageData {
  [processName: string]: ProcessContent;
}
export const BANCO_MOCK: Record<string, LanguageData> = {
  Português: {
    Dinheiro: {
      videoUrl: "/videos/pt-dinheiro.mp4",
      audios: [
        {
          nome: "Explicação Inicial",
          url: "/audios/pt_dinheiro_intro.mp3",
          likes: 5,
          dislikes: 0,
        },
        {
          nome: "Dicas de Segurança",
          url: "/audios/pt_dinheiro_dicas.mp3",
          likes: 5,
          dislikes: 0,
        },
      ],
      descricao:
        "Orientações sobre saques, depósitos e transferências em conta corrente.",
    },
    Serviço: {
      videoUrl: "/videos/pt-servico.mp4",
      audios: [
        {
          nome: "Atendimento ao cliente",
          url: "/audios/atendimento.mp3",
          likes: 5,
          dislikes: 0,
        },
        {
          nome: "Horários da agência",
          url: "/audios/horarios.mp3",
          likes: 5,
          dislikes: 0,
        },
      ],
      descricao:
        "Informações sobre os serviços disponíveis nas agências físicas e digitais.",
    },
    Senha: {
      videoUrl: "/videos/pt-senha.mp4",
      audios: [
        { nome: "Audio 1", url: "/audios/audio1.mp3", likes: 10, dislikes: 2 },
        { nome: "Audio 2", url: "/audios/horarios.mp3", likes: 5, dislikes: 0 },
      ],
      descricao:
        "Passo a passo para recuperação e alteração de senhas com segurança.",
    },
  },
  Kayapó: {
    Dinheiro: {
      videoUrl: "/videos/kp-dinheiro.mp4",
      audios: [
        {
          nome: "Explicação Inicial",
          url: "/audios/pt_dinheiro_intro.mp3",
          likes: 5,
          dislikes: 0,
        },
        {
          nome: "Dicas de Segurança",
          url: "/audios/pt_dinheiro_dicas.mp3",
          likes: 5,
          dislikes: 0,
        },
      ],
      descricao:
        "Explicação em Kayapó sobre o uso do dinheiro e cartões no banco.",
    },
    Serviço: {
      videoUrl: "/videos/kp-servico.mp4",
      audios: [
        {
          nome: "Atendimento ao cliente",
          url: "/audios/atendimento.mp3",
          likes: 5,
          dislikes: 0,
        },
        {
          nome: "Horários da agência",
          url: "/audios/horarios.mp3",
          likes: 5,
          dislikes: 0,
        },
      ],
      descricao: "Como solicitar serviços e ajuda em língua Kayapó.",
    },
    Senha: {
      videoUrl: "/videos/kp-senha.mp4",
      audios: [
        { nome: "Audio 1", url: "/audios/audio1.mp3", likes: 5, dislikes: 0 },
        { nome: "Audio 2", url: "/audios/horarios.mp3", likes: 5, dislikes: 0 },
      ],
      descricao: "Orientações de segurança e proteção de senhas em Kayapó.",
    },
  },
  Tukano: {
    Dinheiro: {
      videoUrl: "/videos/tk-dinheiro.mp4",
      audios: [
        {
          nome: "Explicação Inicial",
          url: "/audios/pt_dinheiro_intro.mp3",
          likes: 5,
          dislikes: 0,
        },
        {
          nome: "Dicas de Segurança",
          url: "/audios/pt_dinheiro_dicas.mp3",
          likes: 5,
          dislikes: 0,
        },
      ],
      descricao: "Informações financeiras explicadas na língua Tukano.",
    },
    Serviço: {
      videoUrl: "/videos/tk-servico.mp4",
      audios: [
        {
          nome: "Atendimento ao cliente",
          url: "/audios/atendimento.mp3",
          likes: 5,
          dislikes: 0,
        },
        {
          nome: "Horários da agência",
          url: "/audios/horarios.mp3",
          likes: 5,
          dislikes: 0,
        },
      ],
      descricao: "Serviços bancários explicados para a comunidade Tukano.",
    },
    Senha: {
      videoUrl: "/videos/tk-senha.mp4",
      audios: [
        { nome: "Audio 1", url: "/audios/audio1.mp3", likes: 5, dislikes: 0 },
        { nome: "Audio 2", url: "/audios/horarios.mp3", likes: 5, dislikes: 0 },
      ],
      descricao: "Proteção de dados e criação de senhas em Tukano.",
    },
  },
};
