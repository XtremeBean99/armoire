export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-border-subtle">
      <div className="mx-auto flex max-w-container flex-col gap-2 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          <span className="font-serif text-foreground">Armoire</span> - no AI · works
          offline · free.
        </p>
        <a
          href="https://ahmedyhussain.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
        >
          ahmedyhussain.com
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M3 9L9 3M9 3H4.5M9 3V7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
