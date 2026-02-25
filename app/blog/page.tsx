import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, COMPANY_NAME } from "@/lib/conversion";
import { BLOG_CATEGORIES, type BlogCategory } from "@/lib/blog-data";
import { getAllPosts, getPostsByCategory } from "@/lib/blog-utils";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";
import BlogCard from "@/components/blog/BlogCard";

export const metadata: Metadata = {
  title: "Blog — Consejos de techos, pintura y plomería",
  description:
    "Consejos prácticos sobre techos, pintura y plomería para tu casa o negocio en Medellín. Guías, precios y soluciones del equipo de Espinal Multiservicios.",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: `${SITE_URL}/blog`,
    title: `Blog — Consejos de techos, pintura y plomería | ${COMPANY_NAME}`,
    description:
      "Consejos prácticos sobre techos, pintura y plomería para tu casa o negocio en Medellín.",
    siteName: COMPANY_NAME,
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

type Props = {
  searchParams: Promise<{ categoria?: string }>;
};

export default async function BlogListingPage({ searchParams }: Props) {
  const { categoria } = await searchParams;
  const validCategory =
    categoria && categoria in BLOG_CATEGORIES
      ? (categoria as BlogCategory)
      : null;

  const posts = validCategory
    ? getPostsByCategory(validCategory)
    : getAllPosts();

  const categoryEntries = Object.entries(BLOG_CATEGORIES) as [
    BlogCategory,
    (typeof BLOG_CATEGORIES)[BlogCategory],
  ][];

  const allPosts = getAllPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Blog — ${COMPANY_NAME}`,
    description: metadata.description,
    url: `${SITE_URL}/blog`,
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
    },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: allPosts.map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/blog/${post.slug}`,
      name: post.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <BlogHeader />

      <main id="main-content" className="pt-20 pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Page header */}
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-orange-700">
            BLOG
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Consejos para tu casa o negocio
          </h1>
          <p className="mt-3 max-w-2xl text-base text-slate-600">
            Guías prácticas sobre techos, pintura y plomería. Te ayudamos a
            entender el problema y tomar la mejor decisión.
          </p>

          {/* Category filter chips */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              href="/blog"
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                !validCategory
                  ? "border-orange-300 bg-orange-50 text-orange-700"
                  : "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-700"
              }`}
            >
              Todos
            </Link>
            {categoryEntries.map(([key, cat]) => (
              <Link
                key={key}
                href={`/blog?categoria=${key}`}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                  validCategory === key
                    ? "border-orange-300 bg-orange-50 text-orange-700"
                    : "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-700"
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </div>

          {/* Posts grid */}
          {posts.length > 0 ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="mt-12 text-center text-sm text-slate-500">
              No hay artículos en esta categoría todavía.
            </p>
          )}
        </div>
      </main>

      <BlogFooter />
    </>
  );
}
