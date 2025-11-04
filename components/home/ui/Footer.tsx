import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-4 mt-20">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="text-sm uppercase font-bold tracking-wider text-accent-foreground">
                Inomina
              </span>
              <span className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">
                Better Finances
              </span>
            </div>
          </div>

          <div className="flex gap-8">
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Getting Started
            </Link>
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="#privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Inomina. Simple money management for everyone.
          </p>
        </div>
      </div>
    </footer>
  );
}
