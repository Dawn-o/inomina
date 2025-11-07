"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Menu,
  LogOut,
  User,
  CreditCard,
  Bell,
  Settings,
  ChevronsUpDown,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { useUser } from "@/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function Navigation() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    setOpen(false);
    setShowLogoutDialog(false);
  };

  const userData = user
    ? {
        name:
          user.user_metadata?.username || user.email?.split("@")[0] || "User",
        email: user.email || "",
        avatar: user.user_metadata?.avatar_url || "",
      }
    : null;

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href="/home" className="flex items-center gap-2">
          <Logo />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="text-sm uppercase font-bold tracking-wider text-accent-foreground">
              Inomina
            </span>
            <span className="text-xs uppercase font-semibold tracking-wider text-muted-foreground">
              Better Finances
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Getting Started
          </Link>
          <Link
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="#privacy"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={userData?.avatar}
                        alt={userData?.name}
                      />
                      <AvatarFallback>
                        {userData?.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronsUpDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={userData?.avatar}
                          alt={userData?.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          {userData?.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                          {userData?.name}
                        </span>
                        <span className="truncate text-xs">
                          {userData?.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User />
                      Account
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Bell />
                      Notifications
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings />
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowLogoutDialog(true)}>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full">
              <div className="flex flex-col h-full py-4">
                <Link href="/dashboard" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="justify-start w-full">
                    Dashboard
                  </Button>
                </Link>
                {userData && (
                  <div className="flex items-center justify-between p-4">
                    <div className="text-sm">{userData.email}</div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback>
                        {userData.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                )}
                {user && (
                  <>
                    <Button variant="ghost" className="justify-start w-full">
                      <User className="h-4 w-4 mr-2" />
                      Account
                    </Button>
                    <Button variant="ghost" className="justify-start w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Billing
                    </Button>
                    <Button variant="ghost" className="justify-start w-full">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                    <Button variant="ghost" className="justify-start w-full">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </>
                )}
                {user && <Separator className="my-4" />}
                <Link href="#how-it-works" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="justify-start w-full">
                    Getting Started
                  </Button>
                </Link>
                <Link href="#features" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="justify-start w-full">
                    Features
                  </Button>
                </Link>
                <Link href="#privacy" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="justify-start w-full">
                    Privacy
                  </Button>
                </Link>
                {user && (
                  <Button
                    variant="ghost"
                    className="justify-start w-full mt-auto"
                    onClick={() => setShowLogoutDialog(true)}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Log out
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <AlertDialog
            open={showLogoutDialog}
            onOpenChange={setShowLogoutDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You will be signed out of your account and redirected to the
                  home page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Log out
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </nav>
  );
}
