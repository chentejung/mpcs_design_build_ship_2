type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const isExternal = (href: string) => href.startsWith("http");

export function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonLinkProps) {
  const styles =
    variant === "primary"
      ? "bg-ink text-bg hover:bg-accent"
      : "border border-line bg-surface text-ink hover:border-ink";
  return (
    <a
      href={href}
      {...(isExternal(href) && { target: "_blank", rel: "noopener" })}
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors ${styles} ${className}`}
    >
      {children}
    </a>
  );
}

export function SectionHead({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div id={id} className="mb-10 scroll-mt-24">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{eyebrow}</div>
      <h2 className="mt-2 font-serif text-4xl md:text-5xl">{title}</h2>
    </div>
  );
}

export function Card({ selected, children }: { selected?: boolean; children: React.ReactNode }) {
  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(42,36,32,0.35)] ${
        selected ? "outline-2 outline-offset-4 outline-accent" : ""
      }`}
    >
      {selected && (
        <span className="absolute top-3.5 left-3.5 z-10 rounded-full bg-accent px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-white">
          Selected
        </span>
      )}
      {children}
    </article>
  );
}

export function CardFooter({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6">
      <div>
        <div className="text-xs tracking-widest text-muted">{label}</div>
        <h3 className="font-serif text-2xl font-semibold">{title}</h3>
      </div>
      <div className="mt-auto flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
