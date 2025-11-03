import { UserPlus, Plus, BarChart3 } from "lucide-react";

export function GettingStartedSection() {
  return (
    <section
      id="how-it-works"
      className="relative mt-6 px-6 py-20 border border-border"
    >
      <div className="mx-auto max-w-2xl text-center mb-16">
        <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
          Get Started in 3 Easy Steps
        </h2>
        <p className="text-lg text-muted-foreground">
          Take control of your finances with our simple, intuitive process.
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full mx-auto">
              <UserPlus className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">1. Create Account</h3>
            <p className="text-muted-foreground">
              Sign up for free with your email or Google account. No credit card
              required.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full mx-auto">
              <Plus className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">
              2. Track Transactions
            </h3>
            <p className="text-muted-foreground">
              Add income and expenses effortlessly with smart categorization and
              automatic tracking.
            </p>
          </div>

          <div className="text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full mx-auto">
              <BarChart3 className="h-8 w-8" />
            </div>
            <h3 className="mb-3 text-xl font-semibold">3. Gain Insights</h3>
            <p className="text-muted-foreground">
              View detailed reports and analytics to understand your spending
              patterns and make smarter decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
