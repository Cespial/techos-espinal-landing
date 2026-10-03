import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL, COMPANY_NAME } from "@/lib/conversion";
import { BLOG_CATEGORIES, type BlogCategory } from "@/lib/blog-data";
import { getAllPosts, getPostsByCategory } from "@/lib/blog-utils";
import SiteHeader from "@/components/local/SiteHeader";
import SiteFooter from "@/components/local/SiteFooter";
import BlogCard from "@/components/blog/BlogCard";
import MobileStickyBar from "@/components/local/MobileStickyBar";

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
    images: [{ url: "/og/og-blog-servicios.png", width: 1200, height: 630, alt: `Blog | ${COMPANY_NAME}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog — Consejos de techos, pintura y plomería | ${COMPANY_NAME}`,
    description:
      "Consejos prácticos sobre techos, pintura y plomería para tu casa o negocio en Medellín.",
    images: ["/og/og-blog-servicios.png"],
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
      <SiteHeader pageType="blog_index" />

      <main id="main-content" className="pb-8">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          {/* Page header */}
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
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
              className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-all duration-200 ${
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
                className={`inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-all duration-200 ${
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
            <p className="mt-12 text-center text-sm text-slate-600">
              No hay artículos en esta categoría todavía.
            </p>
          )}
        </div>
      </main>

      <MobileStickyBar pageType="blog_index" />
      <SiteFooter />
    </>
  );
}
