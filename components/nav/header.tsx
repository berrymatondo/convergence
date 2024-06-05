"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../modeToggle";
import { GiSuspensionBridge } from "react-icons/gi";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { id: 1, href: "/dashboard", title: "Dashboard" },
  { id: 2, href: "/general", title: " General Overview" },
  { id: 3, href: "/contact", title: "Contact" },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="border-b ">
      <div className="container flex justify-between items-center p-8">
        <div className="flex items-center gap-2">
          <GiSuspensionBridge className="  text-blue-600" size={50} />
          <Link
            href="/"
            className="dark:text-white uppercase font-bold text-xl text-blue-800"
          >
            <span className="text-4xl text-teal-700">C</span>onvergence
          </Link>
        </div>
        <nav className="flex justify-between gap-4">
          {navLinks.map((nv) => (
            <Link
              key={nv.id}
              href={nv.href}
              className={
                pathname == nv.href
                  ? "text-blue-400 font-semibold"
                  : "hover:text-blue-400 font-semibold"
              }
            >
              {nv.title}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4 items-center">
          <ModeToggle />

          <Button onClick={() => router.push("/auth/login")}>Connexion</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
