"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/layout/Logo";

export function AppHeader() {
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/">
            <Logo />
            {state === "expanded" && (
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="text-sm uppercase font-bold tracking-wider text-accent-foreground">
                  Inomina
                </span>
                <span className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">
                  Better Finances
                </span>
              </div>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
