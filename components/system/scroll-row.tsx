"use client";
// A row that scrolls sideways on narrow screens and fades at its edge while more items are off-screen.
import { useEffect, useRef, useState } from "react";

export function ScrollRow({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const row = useRef<HTMLDivElement>(null);
  const [more, setMore] = useState(false);

  useEffect(() => {
    const el = row.current!;
    const update = () => setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div ref={row} data-more={more} className={`catalog-scroll-row ${className}`} {...props}>
      {children}
    </div>
  );
}
