"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../modeToggle";
import { GiSuspensionBridge } from "react-icons/gi";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { MdLogin, MdLogout, MdPerson } from "react-icons/md";
import { signOut } from "@/auth";
import { logoutUser } from "@/lib/_userActions";
import Image from "next/image";
import stats from "../../public/stats.png";

const navLinks = [
  { id: 1, href: "/dashboard", title: "Dashboard" },
  { id: 2, href: "/continents", title: " General Overview" },
  { id: 2, href: "/admin/countries", title: "Pays" },
  { id: 3, href: "/admin/users", title: " Utilisateurs" },
  { id: 4, href: "/contact", title: "Contact" },
];

type HeaderProps = {
  userSession: any;
};

const Header = ({ userSession }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  //console.log("SESSION: ", userSession);

  return (
    <div className="relative  border-b max-md:px-2 ">
      {/*       <Image
        alt="stats"
        src={stats}
        className="absolute max-md:w-full w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10 "
      /> */}
      <div className="w-full md:container  flex justify-between items-end py-4 ">
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
            <p className="text-xs md:text-3xl text-teal-600">
              Emerging Markets
            </p>
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
          {(!userSession || !userSession.user) && (
            <Button
              className="max-md:hidden"
              onClick={() => router.push("/auth/login")}
            >
              Connexion
            </Button>
          )}

          {userSession && userSession.user && (
            <form
              action={async () => {
                logoutUser();
                router.push("/auth/login");
              }}
            >
              <Button
                className="max-md:hidden"
                onClick={() => router.push("/auth/login")}
                variant="cancel"
              >
                Déconnexion
              </Button>
            </form>
          )}

          {(!userSession || !userSession.user) && (
            <MdLogin
              className="md:hidden text-teal-600"
              onClick={() => router.push("/auth/login")}
              size={25}
            />
          )}
          {userSession && userSession.user && (
            <form
              action={async () => {
                logoutUser();
                router.push("/auth/login");
              }}
            >
              <Button
                className="md:hidden p-0"
                onClick={() => router.push("/auth/login")}
                variant="empty"
              >
                <MdLogout className="text-red-600" size={25} />
              </Button>
            </form>
            /*             <form
              action={async () => {
                //console.log("EXIT");
                logoutUser();
                router.push("/auth/login");
              }}
            >
              <Button type="submit" variant="empty">
                <MdLogout
                  className="md:hidden text-red-600"
                  // onClick={() => router.push("/auth/login")}
                  size={25}
                />
              </Button>
            </form> */
          )}

          <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </div>
        </div>
      </div>

      {userSession && userSession.user && (
        <p className="flex justify-center items-end gap-2 mb-2">
          <MdPerson className="max-md:text-xs  text-orange-600" size={25} />
          <strong className="max-md:text-xs text-lg dark:text-blue-400 text-blue-600">
            {userSession?.user?.username}
          </strong>
        </p>
      )}

      {isOpen && (
        <div className="bloc bg-blue-600 rounded-lg">
          <nav className=" md:hidden items-center flex flex-col gap-4 pt-2">
            {navLinks.map((nv) => (
              <div
                key={nv.id}
                onClick={() => {
                  setIsOpen(!isOpen);
                  router.push(nv.href);
                }}
                className="border-b w-full text-center pb-2 text-white"
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
