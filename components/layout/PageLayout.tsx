import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Sidebars } from "@/components/sidebar/Sidebar";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebars />
      <SidebarInset>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
          <div className="space-y-12 p-6 max-w-7xl mx-auto">{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
