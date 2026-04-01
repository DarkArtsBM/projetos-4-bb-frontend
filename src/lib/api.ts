const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

export const api = {
    async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {

        // 1. Pega o token salvo no login (se o usuário estiver logado)
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

        const headers: Record<string, string> = {
            ...options.headers,
        };

        // 2. Coloca o token no envelope automaticamente
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }

        // 3. Se não for envio de arquivo (FormData), avisa que é JSON
        if (!(options.body instanceof FormData) && !headers["Content-Type"]) {
            headers["Content-Type"] = "application/json";
        }

        // 4. Faz a requisição para o Spring Boot
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
        });

        // 5. Tratamento de erro global
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                console.error("Sessão expirada.");
                if (typeof window !== "undefined") {
                    localStorage.removeItem("token");
                }
            }
            throw new Error(`Erro na API: ${response.status}`);
        }

        // 6. Devolve os dados prontos
        try {
            return await response.json();
        } catch (e) {
            return null as T;
        }
    },

    // Atalhos práticos
    get<T>(endpoint: string, options?: FetchOptions) {
        return this.request<T>(endpoint, { ...options, method: "GET" });
    },

    post<T>(endpoint: string, body: any, options?: FetchOptions) {
        const isFormData = body instanceof FormData;
        return this.request<T>(endpoint, {
            ...options,
            method: "POST",
            body: isFormData ? body : JSON.stringify(body),
        });
    },

    patch<T>(endpoint: string, options?: FetchOptions) {
        return this.request<T>(endpoint, { ...options, method: "PATCH" });
    },
};