import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative mt-6 px-16 border border-border">
      <div className="grid md:grid-cols-2 gap-8 py-20">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to get started?
            <span className="text-muted-foreground block">
              Start managing with a free account.
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Join thousands of users taking control of their finances with
            Inomina.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/signup">
              <Button size="lg" className="gap-2">
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signin">
              <Button size="lg" variant="outline">
                Sign in
              </Button>
            </Link>
          </div>
        </div>

        <div className="border border-border rounded-lg bg-card p-8">
          <h3 className="text-xl font-bold mb-2">Explore Our Features</h3>
          <p className="text-muted-foreground mb-6">
            Learn about the tools and features that help you manage your
            finances effectively.
          </p>
          <Link href="#solutions">
            <Button variant="outline" className="gap-2">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
