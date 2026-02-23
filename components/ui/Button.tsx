import { cn } from "@/components/ui/cn";

const variants = {
  primary:
    "bg-foreground text-white hover:bg-foreground/90",
  secondary:
    "bg-white text-foreground border border-border hover:border-foreground/40 hover:bg-badge-bg",
  ghost:
    "bg-transparent text-text-secondary hover:text-foreground",
} as const;

const sizes = {
  sm: "min-h-9 px-3.5 text-sm",
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-12 px-8 text-[15px]",
} as const;

interface ButtonProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  fullWidth?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  target?: string;
  rel?: string;
  ctaId?: string;
  ctaSection?: string;
  ctaIntent?: string;
  ctaLabel?: string;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  href,
  className,
  fullWidth,
  type = "button",
  disabled,
  target,
  rel,
  ctaId,
  ctaSection,
  ctaIntent,
  ctaLabel,
}: ButtonProps) {
  const classes = cn(
    "rounded-[10px] font-sans font-medium transition-colors duration-200 inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed",
    className,
  );

  const trackingAttrs = {
    "data-cta": "true",
    ...(ctaId ? { "data-cta-id": ctaId } : {}),
    ...(ctaSection ? { "data-cta-section": ctaSection } : {}),
    ...(ctaIntent ? { "data-cta-intent": ctaIntent } : {}),
    ...(ctaLabel ? { "data-cta-label": ctaLabel } : {}),
  };

  if (href) {
    return (
      <a href={href} className={classes} target={target} rel={rel} {...trackingAttrs}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      {...trackingAttrs}
    >
      {children}
    </button>
  );
}
