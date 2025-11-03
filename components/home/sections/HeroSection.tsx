import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20">
      <div className="max-w-5xl">
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight">
          Manage Your Money Better With Simple Tools
        </h1>
        <p className="mb-10 text-lg text-muted-foreground sm:text-xl max-w-2xl">
          Inomina helps you track expenses, manage budgets, and understand your
          financial habits—all in one simple dashboard.
        </p>
        <div className="flex flex-col items-start gap-4 sm:flex-row">
          <Link href="/signup">
            <Button size="lg" className="gap-2">
              Start for free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/signin">
            <Button size="lg" variant="outline">
              Sign in to your account
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
