// Controls shared by Eigakan and the Design System pages; app/system.css styles them per system.
// `state` freezes hover, focus or pressed for the Control states section.
import { categoryLabel, type Category } from "@/app/films";
import { CheckIcon } from "./icons";

export type FrozenState = "hover" | "focus" | "pressed";
type Variant = "primary" | "secondary";

export const buttonClass = (variant?: Variant, block = false) =>
  ["catalog-btn", variant && `catalog-btn--${variant}`, block && "catalog-btn--block"].filter(Boolean).join(" ");

export function Button({ variant, block, state, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  block?: boolean;
  state?: FrozenState;
}) {
  return <button type="button" data-state={state} className={`${buttonClass(variant, block)} ${className}`} {...props} />;
}

export function Chip({ label, count, state, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  count?: number;
  state?: FrozenState;
}) {
  return (
    <button type="button" data-state={state} className="catalog-chip" {...props}>
      {label}
      {count !== undefined && <span aria-hidden className="catalog-chip-count">{count}</span>}
    </button>
  );
}

export function CategoryBadge({ category, className = "" }: { category: Category; className?: string }) {
  return (
    <span className={`catalog-badge ${className}`} style={{ background: `var(--ds-cat-${category}-bg)`, color: `var(--ds-cat-${category}-fg)` }}>
      {categoryLabel[category]}
    </span>
  );
}

export const Count = ({ n }: { n: number }) => <span className="catalog-count">{n}</span>;

export function TextInput({ state, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { state?: FrozenState }) {
  return <input data-state={state} className="catalog-input" {...props} />;
}

export function Select({ state, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { state?: FrozenState }) {
  return (
    <span className="catalog-select-wrap">
      <select data-state={state} className="catalog-select" {...props}>{children}</select>
    </span>
  );
}

export function Check({ label, type = "checkbox", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="catalog-check">
      <input type={type} {...props} />
      <span aria-hidden className="catalog-box">{type === "checkbox" && <CheckIcon />}</span>
      <span>{label}</span>
    </label>
  );
}

export function Toggle({ label, checked, onToggle }: { label: string; checked: boolean; onToggle?: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={onToggle} className="catalog-toggle">
      <span aria-hidden className="catalog-toggle-track" />
      <span>{label}</span>
    </button>
  );
}

export function Toast({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div role="status" className="catalog-toast catalog-body">
      <span>{children}</span>
      {action}
    </div>
  );
}
