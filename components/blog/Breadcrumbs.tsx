import Link from "next/link";
import { BLOG_CATEGORIES, type BlogCategory } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/conversion";

type BreadcrumbsProps = {
  category: BlogCategory;
  postTitle: string;
};

export default function Breadcrumbs({ category, postTitle }: BreadcrumbsProps) {
  const categoryLabel = BLOG_CATEGORIES[category].label;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryLabel,
        item: `${SITE_URL}/blog?categoria=${category}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: postTitle,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumbs" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-slate-900">
              Inicio
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/blog" className="hover:text-slate-900">
              Blog
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href={`/blog?categoria=${category}`}
              className="hover:text-slate-900"
            >
              {categoryLabel}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="truncate text-slate-700" aria-current="page">
            {postTitle}
          </li>
        </ol>
      </nav>
    </>
  );
}
