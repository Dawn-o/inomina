"use client";

import * as React from "react";
import { BookText, LayoutDashboard, PieChart } from "lucide-react";

import { AppHeader } from "@/components/sidebar/AppHeader";
import { NavBar } from "@/components/sidebar/NavBar";
import { NavUser } from "@/components/sidebar/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@/hooks/useUser";

const data = {
  nav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Transactions",
      url: "/transactions",
      icon: BookText,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: PieChart,
    },
  ],
};

export function Sidebars({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, loading, error } = useUser();

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  if (!user) {
    return null; // Or redirect, but since middleware handles it, maybe not needed
  }

  const userData = {
    name: user.user_metadata?.username || user.email?.split("@")[0] || "User",
    email: user.email || "",
    avatar: user.user_metadata?.avatar_url || "",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <AppHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavBar items={data.nav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
