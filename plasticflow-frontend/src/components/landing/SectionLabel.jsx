export default function SectionLabel({ children, className = "" }) {
  return (
    <p
      className={`text-xs font-medium uppercase tracking-[0.22em] text-gold-warm ${className}`}
    >
      {children}
    </p>
  );
}
