export interface Tutorial {
    id: number;
    pergunta: string;
    youtubeUrl: string;
    dataCriacao: string;
}

export interface Audio {
    id: number;
    caminhoArquivo: string;
    dataCriacao: string;
    tutorialId: number;
    votos: number;
    idioma: string;
    nomeAutor?: string;
}

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    cargo: string;
}