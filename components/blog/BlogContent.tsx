import { marked, type Tokens } from "marked";
import { createHeadingId } from "@/lib/blog-headings";

type BlogContentProps = {
  body: string;
};

export default function BlogContent({ body }: BlogContentProps) {
  const renderer = new marked.Renderer();
  const headingId = createHeadingId();

  // Wrap tables in a scrollable container for mobile
  const originalTable = renderer.table.bind(renderer);
  renderer.table = (token: Tokens.Table) => {
    return `<div class="table-wrapper">${originalTable(token)}</div>`;
  };

  // Add IDs to headings for scroll-spy anchor links
  renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
    const id = headingId(text);
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };

  const html = marked.parse(body, { renderer, async: false }) as string;

  return (
    <div
      className="blog-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
