interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionHeading({ title, subtitle, id }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center md:mb-16">
      <h2
        id={id}
        className="font-serif font-semibold leading-[1.1] tracking-[-0.025em] text-foreground"
        style={{ fontSize: "var(--font-size-h2)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl font-sans text-body leading-relaxed text-text-secondary md:mt-5 md:text-body-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
