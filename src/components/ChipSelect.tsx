"use client";
import clsx from "clsx";

export function ChipSelect<T extends string>({
  options, value, onChange, multiple = false,
}: {
  options: { value: T; label: string }[];
  value: T[] | T;
  onChange: (v: T[] | T) => void;
  multiple?: boolean;
}) {
  const selected = Array.isArray(value) ? value : [value];
  function toggle(v: T) {
    if (!multiple) return onChange(v);
    const set = new Set(selected);
    set.has(v) ? set.delete(v) : set.add(v);
    onChange([...set] as T[]);
  }
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => toggle(o.value)}
          className={clsx(
            "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
            selected.includes(o.value)
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-muted-foreground/60 hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
