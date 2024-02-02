"use client";
import { H2, Nav } from "@/component/ui";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListNavigation, MobileListNavigation } from ".";

export function Header() {
  const pathName = usePathname();
  const pathSegements = pathName.split("/");
  const path = pathSegements[1];

  return (
    <header className="h-full w-full flex justify-between items-center lg:px-24 px-10 min-h-[10vh] shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="Bazaar Logo" width={45} height={45} />
        <H2 className="text-sky-700 hover:cursor-pointer hover:text-sky-600">
          Bazaar
        </H2>
      </Link>
      {/* Navigation */}
      <Nav className="hidden lg:block">
        <ListNavigation path={path} />
      </Nav>

      <Nav className="block lg:hidden">
        <MobileListNavigation path={path} />
      </Nav>
    </header>
  );
}
