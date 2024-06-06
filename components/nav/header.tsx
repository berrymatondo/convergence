"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../modeToggle";
import { GiSuspensionBridge } from "react-icons/gi";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { MdLogin } from "react-icons/md";

const navLinks = [
  { id: 1, href: "/dashboard", title: "Dashboard" },
  { id: 2, href: "/general", title: " General Overview" },
  { id: 3, href: "/contact", title: "Contact" },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b max-md:px-2">
      <div className="w-full md:container  flex justify-between items-end py-4 md:p-8">
        <div className="flex max-md:flex-col max-md:justify-center items-center md:items-end gap-2 ">
          <GiSuspensionBridge
            className="max-md:hidden  text-blue-600"
            size={50}
          />
          <GiSuspensionBridge className="md:hidden  text-blue-600" size={20} />
          <Link
            href="/"
            className="dark:text-white  font-bold text-xl max-md:text-md  text-blue-800"
          >
            <p className="text-xs md:text-3xl text-teal-600">Convergence</p>
          </Link>
        </div>
        <nav className=" max-md:hidden items-start flex justify-between gap-4">
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
        <div className=" flex gap-5 items-center">
          <ModeToggle />

          <Button
            className="max-md:hidden"
            onClick={() => router.push("/auth/login")}
          >
            Connexion
          </Button>
          <MdLogin
            className="md:hidden text-teal-600"
            onClick={() => router.push("/auth/login")}
            size={25}
          />

          <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="bloc ">
          <nav className=" md:hidden items-center flex flex-col gap-4">
            {navLinks.map((nv) => (
              <div
                key={nv.id}
                onClick={() => {
                  setIsOpen(!isOpen);
                  router.push(nv.href);
                }}
              >
                {nv.title}
              </div>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
