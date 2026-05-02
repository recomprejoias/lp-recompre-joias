import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Recompre Joias",
        short_name: "Recompre Joias",
        description:
            "Joias em Ouro 18k e Prata 925, seminovas, cuidadosamente selecionadas, com preços acessíveis e autenticidade garantida.",
        start_url: "/",
        display: "standalone",
        background_color: "#F2EFE9",
        theme_color: "#F2EFE9",
        lang: "pt-BR",
        icons: [
            {
                src: "/favicon.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/favicon.png",
                sizes: "192x192",
                type: "image/png",
            },
        ],
    };
}