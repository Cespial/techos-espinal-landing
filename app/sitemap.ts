import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/conversion";
import { getAllPosts } from "@/lib/blog-utils";
import { SERVICE_LINE_SEO, MUNICIPALITY_SEO } from "@/lib/seo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts();

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICE_LINE_SEO.map((s) => ({
    url: `${SITE_URL}/servicios/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const coverageEntries: MetadataRoute.Sitemap = MUNICIPALITY_SEO.map((m) => ({
    url: `${SITE_URL}/cobertura/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...serviceEntries,
    ...coverageEntries,
    ...blogEntries,
    {
      url: `${SITE_URL}/terminos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacidad`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}
