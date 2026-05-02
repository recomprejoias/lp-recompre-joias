import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://recomprejoias.com.br",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: ["https://recomprejoias.com.br/open-graph.png"],
    },
  ];
}