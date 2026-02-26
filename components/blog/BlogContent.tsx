import { marked, type Tokens } from "marked";

type BlogContentProps = {
  body: string;
};

export default function BlogContent({ body }: BlogContentProps) {
  const renderer = new marked.Renderer();

  // Wrap tables in a scrollable container for mobile
  const originalTable = renderer.table.bind(renderer);
  renderer.table = (token: Tokens.Table) => {
    return `<div class="table-wrapper">${originalTable(token)}</div>`;
  };

  // Add IDs to headings for scroll-spy anchor links
  renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
    const id = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
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
