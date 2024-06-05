"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { title } from "process";
import { ModeToggle } from "../modeToggle";

const navLinks = [
  { id: 1, href: "/dashboard", title: "Dashboard" },
  { id: 2, href: "/convergence", title: "Convergence" },
  { id: 3, href: "/contact", title: "Contact" },
];

const Header = () => {
  return (
    <div className="container flex justify-between items-center p-8">
      <Link
        href="/"
        className="dark:text-white uppercase font-bold text-2xl text-blue-800"
      >
        Convergence
      </Link>
      <nav className="flex justify-between gap-4">
        {navLinks.map((nv) => (
          <Link key={nv.id} href={nv.href} className="font-semibold text-lg">
            {nv.title}
          </Link>
        ))}
      </nav>
      <div className="flex gap-4 items-center">
        <ModeToggle />

        <Button>Connexion</Button>
      </div>
    </div>
  );
};

export default Header;
