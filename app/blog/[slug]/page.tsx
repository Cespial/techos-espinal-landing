import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SITE_URL, COMPANY_NAME } from "@/lib/conversion";
import { BLOG_CATEGORIES, BLOG_POSTS } from "@/lib/blog-data";
import { getPostBySlug, getAllPosts, extractHeadings } from "@/lib/blog-utils";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogFooter from "@/components/blog/BlogFooter";
import Breadcrumbs from "@/components/blog/Breadcrumbs";
import BlogContent from "@/components/blog/BlogContent";
import BlogCTA from "@/components/blog/BlogCTA";
import TableOfContents from "@/components/blog/TableOfContents";
import RelatedPosts from "@/components/blog/RelatedPosts";
import ShareButtons from "@/components/blog/ShareButtons";
import MobileStickyBarGlobal from "@/components/sections/MobileStickyBarGlobal";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: [post.targetKeyword, ...post.secondaryKeywords],
    openGraph: {
      type: "article",
      locale: "es_CO",
      url: `${SITE_URL}/blog/${post.slug}`,
      title: post.title,
      description: post.metaDescription,
      siteName: COMPANY_NAME,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: [
        {
          url: post.ogImage,
          width: 1200,
          height: 630,
          alt: post.featuredImageAlt,
        },
      ],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.ogImage],
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.body);
  const allPosts = getAllPosts();
  const relatedPosts = post.relatedSlugs
    .map((s) => allPosts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => p != null);

  const categoryLabel = BLOG_CATEGORIES[post.category].label;
  const primaryServiceLine = post.serviceLines[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE_URL}${post.ogImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo-espinal.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: [post.targetKeyword, ...post.secondaryKeywords].join(", "),
    wordCount: post.body.split(/\s+/).length,
    articleSection: categoryLabel,
    inLanguage: "es-CO",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHeader />

      <main id="main-content" className="pt-20 pb-20 md:pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumbs */}
          <Breadcrumbs category={post.category} postTitle={post.title} />

          {/* Article header */}
          <div className="mt-6">
            <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
              {categoryLabel}
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
              <span>{post.author}</span>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("es-CO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden="true">&middot;</span>
              <span>{post.readingTimeMinutes} min de lectura</span>
            </div>
          </div>

          {/* Featured image */}
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          </div>

          {/* Grid: content + sidebar */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
            {/* Main content */}
            <article>
              <BlogContent body={post.body} />
              <BlogCTA
                serviceLine={primaryServiceLine}
                postTitle={post.title}
                variant="inline"
              />
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <TableOfContents headings={headings} />
              <BlogCTA
                serviceLine={primaryServiceLine}
                postTitle={post.title}
                variant="sticky"
              />
              <div className="hidden lg:block">
                <RelatedPosts posts={relatedPosts} />
              </div>
            </aside>
          </div>

          {/* Bottom section */}
          <div className="mt-12 space-y-8 border-t border-slate-200 pt-8">
            <ShareButtons slug={post.slug} title={post.title} />
            <div className="lg:hidden">
              <RelatedPosts posts={relatedPosts} />
            </div>
            <BlogCTA
              serviceLine={primaryServiceLine}
              postTitle={post.title}
              variant="banner"
            />
          </div>
        </div>
      </main>

      <MobileStickyBarGlobal />
      <BlogFooter />
    </>
  );
}
