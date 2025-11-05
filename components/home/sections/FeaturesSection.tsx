import {
  BarChart3,
  Receipt,
  PieChart,
  ShieldCheck,
  FastForward,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Dashboard",
    description: "Comprehensive financial overview with real-time insights.",
  },
  {
    icon: Receipt,
    title: "Transactions",
    description: "Track and categorize income and expenses effortlessly.",
  },
  {
    icon: PieChart,
    title: "Reports",
    description: "Detailed analytics and charts for better decision-making.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description: "Bank-level encryption protects your data.",
  },
  {
    icon: FastForward,
    title: "Fast",
    description: "Instant access and lightning-fast performance.",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description: "Responsive design works on all devices.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative mt-6 border border-border">
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-12 grid-rows-4 gap-0">
            {Array.from({ length: 48 }, (_, i) => {
              const row = Math.floor(i / 12);
              const col = i % 12;
              if ((row === 1 || row === 2) && col >= 1 && col <= 10) {
                return null;
              }
              return (
                <div
                  key={i}
                  className="border border-border aspect-square"
                ></div>
              );
            })}
            <div className="col-start-2 col-end-12 row-start-2 row-end-4 border border-border aspect-auto">
              <section className="text-center flex items-center justify-center h-full">
                <div className="flex flex-col sm:flex-row items-center justify-center text-center">
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-bold leading-tight">
                    Empowering You to Master Your Finances
                  </h2>
                </div>
              </section>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col px-6 md:px-12 py-12 md:py-24 border border-border"
              >
                <div className="mb-4 flex items-center">
                  <Icon className="h-8 w-8 md:h-10 md:w-10" />
                  <h3 className="ml-2 text-lg md:text-xl font-bold uppercase tracking-wider">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-base md:text-xl tracking-wider text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
