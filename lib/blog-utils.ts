import { BLOG_POSTS, type BlogCategory, type BlogPost } from "./blog-data";
import { lexer } from "marked";
import { createHeadingId } from "./blog-headings";

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export type HeadingItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function extractHeadings(markdown: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const headingId = createHeadingId();
  for (const token of lexer(markdown)) {
    if (token.type !== "heading") continue;
    const id = headingId(token.text);
    if (token.depth === 2 || token.depth === 3) {
      headings.push({ id, text: token.text, level: token.depth });
    }
  }

  return headings;
}
