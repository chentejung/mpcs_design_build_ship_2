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
      ? "border border-ink bg-ink text-bg hover:bg-accent hover:border-accent shadow-[3px_3px_0_#ebcb85]"
      : "border border-ink bg-surface text-ink hover:bg-[#ebcb85] shadow-[3px_3px_0_#1f4a66]";
  return (
    <a
      href={href}
      {...(isExternal(href) && { target: "_blank", rel: "noopener" })}
      className={`inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-semibold transition-colors ${styles} ${className}`}
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
      className={`relative flex flex-col overflow-hidden border border-ink bg-surface shadow-[5px_5px_0_#ebcb85] transition duration-300 hover:-translate-y-1 hover:shadow-[5px_9px_0_#ebcb85] ${
        selected ? "outline-2 outline-offset-4 outline-accent" : ""
      }`}
    >
      {selected && (
        <span className="absolute top-3.5 left-3.5 z-10 bg-accent px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-white">
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
