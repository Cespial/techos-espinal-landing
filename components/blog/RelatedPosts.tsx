import Link from "next/link";
import { BLOG_CATEGORIES, type BlogPost } from "@/lib/blog-data";

type RelatedPostsProps = {
  posts: BlogPost[];
};

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold text-slate-900">
        También te puede interesar
      </p>
      <ul className="mt-3 space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-lg p-2 transition-colors duration-200 hover:bg-slate-50"
            >
              <span className="text-xs font-medium text-orange-600">
                {BLOG_CATEGORIES[post.category].label}
              </span>
              <p className="mt-0.5 text-sm font-medium leading-snug text-slate-800 group-hover:text-orange-700 transition-colors duration-200">
                {post.title}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {post.readingTimeMinutes} min de lectura
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
