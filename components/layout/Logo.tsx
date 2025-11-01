import Image from "next/image";

export function Logo() {
  return (
    <>
      <Image
        src="/logo-light.svg"
        alt="Inomina"
        width={32}
        height={32}
        className="dark:hidden size-8"
      />
      <Image
        src="/logo-dark.svg"
        alt="Inomina"
        width={32}
        height={32}
        className="hidden dark:block size-8"
      />
    </>
  );
}
