/** One allocator per article, shared by the index and rendered headings. */
export function createHeadingId() {
  const used = new Set<string>();
  return (text: string) => {
    const base = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "seccion";
    let id = base;
    let suffix = 2;
    while (used.has(id)) id = `${base}-${suffix++}`;
    used.add(id);
    return id;
  };
}
