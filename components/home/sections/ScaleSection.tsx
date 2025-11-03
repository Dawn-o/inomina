import { Smartphone, Shield } from "lucide-react";

export function ScaleSection() {
  return (
    <section className="text-center relative mt-6 px-6 py-12 border border-border">
      <h2 className="text-xl sm:text-2xl font-semibold leading-tight">
        Manage your{" "}
        <span className="mx-2 text-base inline-flex font-normal items-center gap-2 px-5 py-1 md:py-2 rounded-full border border-border bg-card">
          <Smartphone className="h-4 w-4" />
          Personal
        </span>{" "}
        finances without compromising{" "}
        <span className="mx-2 mt-1 md:mt-0 text-base inline-flex font-normal items-center gap-2 px-5 py-1 md:py-2 rounded-full border border-border bg-card">
          <Shield className="h-4 w-4" />
          Security
        </span>
      </h2>
    </section>
  );
}
