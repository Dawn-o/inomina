import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Logo() {
  return (
    <Button variant="ghost" size="icon-sm" asChild className="mx-auto">
      <Link href="/">
        <div className="flex items-center justify-center">
          <Image
            src="/logo-light.svg"
            alt="Logo"
            width={1024}
            height={1024}
            className="dark:hidden"
            priority
          />
          <Image
            src="/logo-dark.svg"
            alt="Logo"
            width={1024}
            height={1024}
            className="hidden dark:block"
            priority
          />
        </div>
      </Link>
    </Button>
  );
}
