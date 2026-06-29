export function EmptyState({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface/40 p-12 text-center">
      <p className="font-serif text-lg text-foreground">{title}</p>
      {hint && <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{hint}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
