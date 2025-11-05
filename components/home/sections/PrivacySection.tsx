import { Database, Ban, Shield } from "lucide-react";

const privacy = [
  {
    icon: Database,
    title: "Enterprise Encryption",
    description:
      "256-bit SSL encryption safeguards your data, adhering to the rigorous security protocols of major financial institutions.",
  },
  {
    icon: Ban,
    title: "Zero Data Sharing",
    description:
      "Your personal financial information is never sold, shared, or monetized with third parties.",
  },
  {
    icon: Shield,
    title: "Privacy by Design",
    description:
      "Privacy is core to our architecture. We collect solely the data necessary to provide our services.",
  },
];

export function PrivacySection() {
  return (
    <section id="privacy" className="relative mt-6 border border-border">
      <div className="absolute top-1 left-0 right-0 inline-flex justify-center items-center z-10">
        <h2 className="mt-8 md:mt-[5.5rem] text-center bg-background text-xl md:text-3xl lg:text-4xl font-bold leading-tight">
          Secure Data & Privacy
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="block md:hidden">
          <div className="grid grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="py-12 h-full border-t border-l border-r border-border"
              />
            ))}
          </div>
        </div>

        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="hidden md:block py-12 md:py-28 h-full border-t border-l border-r border-border"
          />
        ))}

        {privacy.map(({ icon: Icon, title, description }, index) => (
          <div
            key={index}
            className="flex flex-col justify-between h-full border-b border-l border-r border-border px-6 md:px-10 py-12"
          >
            <p className="text-sm md:text-base tracking-wider text-muted-foreground">
              {description}
            </p>
            <div className="flex items-center mt-6 md:mt-10">
              <Icon className="h-6 w-6 md:h-8 md:w-8" />
              <h3 className="ml-2 text-base md:text-lg font-bold uppercase tracking-wider">
                {title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
