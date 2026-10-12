// Controls shared by Eigakan and the Design System pages; app/system.css styles them per system.
// `state` freezes hover, focus or pressed for the Control states section.
import { categoryLabel, type Category } from "@/app/films";
import { CheckIcon, Icon, type IconName } from "./icons";

export type FrozenState = "hover" | "focus" | "pressed";
type Variant = "primary" | "secondary";

export const buttonClass = (variant?: Variant, block = false) =>
  ["ds-btn", variant && `ds-btn--${variant}`, block && "ds-btn--block"].filter(Boolean).join(" ");

// The icon slot is each system's own: the stub of a Shōwa ticket, a Ben-Day burst, a Haipai seal.
export const ButtonIcon = ({ name }: { name: IconName }) => <span aria-hidden className="ds-btn-icon"><Icon name={name} /></span>;

export function Button({ variant, block, state, icon, className = "", children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  block?: boolean;
  state?: FrozenState;
  icon?: IconName;
}) {
  return (
    <button type="button" data-state={state} className={`${buttonClass(variant, block)} ${className}`} {...props}>
      {icon && <ButtonIcon name={icon} />}
      {children}
    </button>
  );
}

export function Chip({ label, count, state, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  count?: number;
  state?: FrozenState;
}) {
  return (
    <button type="button" data-state={state} className="ds-chip" {...props}>
      {label}
      {count !== undefined && <span aria-hidden className="ds-chip-count">{count}</span>}
    </button>
  );
}

export function CategoryBadge({ category, className = "" }: { category: Category; className?: string }) {
  return (
    <span className={`ds-badge ${className}`} style={{ "--cat-bg": `var(--ds-cat-${category}-bg)`, "--cat-fg": `var(--ds-cat-${category}-fg)` } as React.CSSProperties}>
      {categoryLabel[category]}
    </span>
  );
}

export const Count = ({ n }: { n: number }) => <span className="ds-count">{n}</span>;

export function TextInput({ state, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { state?: FrozenState }) {
  return <input data-state={state} className="ds-input" {...props} />;
}

export function Select({ state, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { state?: FrozenState }) {
  return (
    <span className="ds-select-wrap">
      <select data-state={state} className="ds-select" {...props}>{children}</select>
    </span>
  );
}

export function Check({ label, type = "checkbox", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="ds-check">
      <input type={type} {...props} />
      <span aria-hidden className="ds-box">{type === "checkbox" && <CheckIcon />}</span>
      <span>{label}</span>
    </label>
  );
}

export function Toggle({ label, checked, onToggle }: { label: string; checked: boolean; onToggle?: () => void }) {
  return (
    <button type="button" role="switch" aria-checked={checked} onClick={onToggle} className="ds-toggle">
      <span aria-hidden className="ds-toggle-track" />
      <span>{label}</span>
    </button>
  );
}

export function Toast({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div role="status" className="ds-toast ds-body">
      <span>{children}</span>
      {action}
    </div>
  );
}
