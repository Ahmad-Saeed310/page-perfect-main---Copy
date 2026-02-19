export function FooterLink() {
  return (
    <footer className="w-full py-4 text-center">
      <a
        href="https://allprintablepages.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-muted-foreground/40 hover:text-primary transition-colors blur-[1px] hover:blur-none cursor-pointer select-none"
        style={{ textDecoration: 'none' }}
      >
        allprintablepages.com
      </a>
    </footer>
  );
}
