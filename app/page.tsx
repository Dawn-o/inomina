import { Navigation } from "@/components/home/ui/Navigation";
import { Footer } from "@/components/home/ui/Footer";
import { HeroSection } from "@/components/home/sections/HeroSection";
import { DashboardPreviewSection } from "@/components/home/sections/DashboardPreviewSection";
import { ScaleSection } from "@/components/home/sections/ScaleSection";
import { FeaturesSection } from "@/components/home/sections/FeaturesSection";
import { GettingStartedSection } from "@/components/home/sections/GettingStartedSection";
import { PrivacySection } from "@/components/home/sections/PrivacySection";
import { CTASection } from "@/components/home/sections/CTASection";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="container mx-auto max-w-7xl px-4">
        <Navigation />
        <HeroSection />
        <DashboardPreviewSection />
        <GettingStartedSection />
        <FeaturesSection />
        <ScaleSection />
        <PrivacySection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}
