import type { MetadataRoute } from "next";
import { SITE_URL, LAST_CONTENT_UPDATE } from "@/lib/conversion";
import { getAllPosts } from "@/lib/blog-utils";
import { SERVICE_LINE_SEO, MUNICIPALITY_SEO, CROSS_PAGE_SEO } from "@/lib/seo-data";

import { SOLUTIONS, SOLUTIONS_UPDATED_AT } from "@/lib/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  const contentDate = new Date(LAST_CONTENT_UPDATE);
  const blogPosts = getAllPosts();

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = SERVICE_LINE_SEO.map((s) => ({
    url: `${SITE_URL}/servicios/${s.slug}`,
    lastModified: contentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const coverageEntries: MetadataRoute.Sitemap = MUNICIPALITY_SEO.map((m) => ({
    url: `${SITE_URL}/cobertura/${m.slug}`,
    lastModified: contentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const crossPageEntries: MetadataRoute.Sitemap = CROSS_PAGE_SEO.map((p) => ({
    url: `${SITE_URL}/servicios/${p.lineSlug}/${p.municipioSlug}`,
    lastModified: contentDate,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: contentDate,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: contentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/cobertura`,
      lastModified: contentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${SITE_URL}/soluciones`, lastModified: new Date(SOLUTIONS_UPDATED_AT), changeFrequency: "monthly", priority: 0.8 },
    ...SOLUTIONS.map((solution) => ({ url: `${SITE_URL}/soluciones/${solution.slug}`, lastModified: new Date(SOLUTIONS_UPDATED_AT), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...serviceEntries,
    ...coverageEntries,
    ...crossPageEntries,
    ...blogEntries,
    {
      url: `${SITE_URL}/nosotros`,
      lastModified: contentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
