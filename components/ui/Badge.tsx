interface BadgeProps {
  children: React.ReactNode;
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="inline-flex items-center gap-2 bg-badge-bg border border-border rounded-full px-4 py-1.5 text-sm text-text-secondary font-sans font-medium">
      {children}
    </span>
  );
}
