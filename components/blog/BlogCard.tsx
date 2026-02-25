import Image from "next/image";
import Link from "next/link";
import { BLOG_CATEGORIES, type BlogPost } from "@/lib/blog-data";

type BlogCardProps = {
  post: BlogPost;
};

export default function BlogCard({ post }: BlogCardProps) {
  const categoryLabel = BLOG_CATEGORIES[post.category].label;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 ease-out hover:border-orange-300 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
        <Image
          src={post.featuredImage}
          alt={post.featuredImageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="inline-flex w-fit rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700">
          {categoryLabel}
        </span>
        <h2 className="mt-2 text-lg font-semibold leading-snug text-slate-900 group-hover:text-orange-700 transition-colors duration-300">
          {post.title}
        </h2>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-3">
          {post.metaDescription}
        </p>
        <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
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
    </Link>
  );
}
