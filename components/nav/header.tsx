"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { ModeToggle } from "../modeToggle";
import { GiSuspensionBridge } from "react-icons/gi";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { MdLogin, MdLogout, MdPerson } from "react-icons/md";
import { logoutUser } from "@/lib/_userActions";
import Image from "next/image";
import stats from "../../public/stats.png";
import { signOut } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

import { cn } from "@/lib/utils";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Index",
    href: "/admin/indexes",
    description:
      "Définition : Un index est un indicateur statistique reflétant la performance d'un groupe spécifique d'actifs, comme des actions ou des obligations. Comporte : Des indices boursiers (comme le S&P 500), des indices obligataires, des indices sectoriels, etc.",
  },
  {
    title: "Equity (Actions)",
    href: "/admin/equities",
    description:
      "Définition : Les actions représentent une part de propriété dans une entreprise. Comporte : Actions ordinaires et préférentielles, dividendes, et parfois des actions de préférence convertible.",
  },
  {
    title: "Bond (Obligations)",
    href: "/admin/bonds",
    description:
      "Définition : Une obligation est un instrument de dette par lequel une entité emprunte de l'argent à des investisseurs en échange de paiements d'intérêts réguliers et du remboursement du principal à l'échéance. Comporte : Obligations d'État, obligations d'entreprises, obligations municipales, obligations à haut rendement, obligations à taux fixe et variable.",
  },
  {
    title: "Commodities (Matières premières)",
    href: "/admin/commodities",
    description:
      "Définition : Les matières premières sont des produits de base échangés sur des marchés financiers. Comporte : Métaux précieux (or, argent), énergie (pétrole, gaz naturel), produits agricoles (blé, café), métaux industriels (cuivre, aluminium).",
  },
  {
    title: "FX_rate (Taux de change) ",
    href: "/admin/fxrates",
    description:
      "Définition : Un taux de change est le taux auquel une devise peut être échangée contre une autre. Comporte : Taux de change entre différentes paires de devises, taux de change futurs et à terme",
  },
  /*   {
    title: "CDS",
    href: "/admin/cds",
    description:
      "Définition : Un CDS est un contrat financier qui permet de transférer le risque de crédit d'un emprunteur entre deux parties. Comporte : Primes de CDS, protection contre le défaut de paiement, spreads de CDS.",
  }, */
  {
    title: "Funds",
    href: "/admin/funds",
    description:
      "Définition : Un fond est un contrat financier qui permet de transférer le risque de crédit d'un emprunteur entre deux parties. Comporte : Primes de CDS, protection contre le défaut de paiement, spreads de CDS.",
  },
];

const navLinks = [
  { id: 1, href: "/dashboard", title: "Dashboard", role: "" },
  { id: 2, href: "/continents", title: " General Overview", role: "" },
  { id: 2, href: "/admin/countries", title: "Pays", role: "ADMIN" },
  { id: 3, href: "/admin/users", title: " Utilisateurs", role: "ADMIN" },
  { id: 4, href: "/contact", title: "Contact", role: "" },
];

type HeaderProps = {
  userSession: any;
};

const Header = ({ userSession }: HeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const usr: any = userSession?.user;

  // console.log("SESSION: ", userSession);

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
            className="max-md:hidden  text-sky-700 dark:text-sky-500"
            size={50}
          />
          <GiSuspensionBridge
            className="md:hidden  text-sky-700 dark:text-sky-500"
            size={20}
          />
          <div className="flex items-start gap-2">
            <Link
              href="/"
              className="dark:text-white  font-bold text-xl max-md:text-md  text-blue-800"
            >
              <p className="text-xs md:text-3xl text-teal-600">
                Emerging Markets
              </p>
            </Link>
            <div className="max-md:hidden">
              <NavigationMenuDemo />
            </div>
          </div>
        </div>

        <nav className=" max-md:hidden items-start flex justify-between gap-4">
          {/*           <NavigationMenuDemo />
           */}{" "}
          {/*           {navLinks
            .filter(
              (nvv: any) =>
                (nvv?.role != "ADMIN" && usr?.role != "ADMIN") ||
                usr?.role == "ADMIN"
            )
            .map((nv: any, index) => (
              <Link
                key={index}
                href={nv.href}
                className={
                  pathname == nv.href
                    ? "text-blue-400 font-semibold"
                    : "hover:text-blue-400 font-semibold"
                }
              >
                {nv.title}
              </Link>
            ))} */}
        </nav>

        <div className=" flex gap-4 items-center">
          {userSession && userSession.user && (
            <p className="max-md:hidden md:container flex justify-center md:justify-end items-end gap-2 mb-2">
              <MdPerson className="max-md:text-xs  text-orange-600" size={25} />
              <strong className="max-md:text-xs text-lg dark:text-blue-400 text-blue-600">
                {userSession?.user?.username}
              </strong>
            </p>
          )}
          <ModeToggle />
          {(!userSession || !userSession.user) && (
            <Button
              className="max-md:hidden"
              onClick={() => router.push("/auth/login")}
            >
              Connexion
            </Button>
          )}
          {/* 
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
 */}
          {(!userSession || !userSession.user) && (
            <MdLogin
              className="md:hidden text-teal-600"
              onClick={() => router.push("/auth/login")}
              size={25}
            />
          )}
          {userSession && userSession.user && (
            <Link href="/redirout">
              {" "}
              <MdLogout className="text-red-600" size={25} />
            </Link>
          )}

          <div className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </div>
        </div>
      </div>

      {userSession && userSession.user && (
        <p className="md:hidden md:container flex justify-center md:justify-end items-end gap-2 mb-2">
          <MdPerson className="max-md:text-xs  text-orange-600" size={25} />
          <strong className="max-md:text-xs text-lg dark:text-blue-400 text-blue-600">
            {userSession?.user?.username}
          </strong>
        </p>
      )}

      {isOpen && (
        <div className="bloc border rounded-lg">
          <nav className=" md:hidden items-center flex flex-col gap-4 pt-2 ">
            <div className=" w-full">
              <NavigationMenuDemo />
            </div>

            {/*             {navLinks
              .filter(
                (nvv: any) =>
                  (nvv?.role != "ADMIN" && usr?.role != "ADMIN") ||
                  usr?.role == "ADMIN"
              )
              .map((nv: any, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setIsOpen(!isOpen);
                    router.push(nv.href);
                  }}
                  className="border-b w-full text-center pb-2 text-white "
                >
                  {nv.title}
                </div>
              ))} */}
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;

export function NavigationMenuDemo() {
  return (
    <NavigationMenu className=" w-full">
      <NavigationMenuList className="max-md:flex max-md:flex-col ">
        <NavigationMenuItem className="">
          <NavigationMenuTrigger className="border-none">
            Administration
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">Admin</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Cette page permet la gestion de plusieurs paramètres du
                      système par les admins.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>

              <ListItem href="/continents" title="General Overview">
                Vue générale de tous les continents.
              </ListItem>
              <ListItem href="/admin/countries" title="Pays">
                Liste de tous les pays enregistrés dans Emergence.
              </ListItem>
              <ListItem href="/admin/users" title="Utilisateurs">
                Liste de tous les utilisateurs enregistrés dans Emergence.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="border-none">
            Assets
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="">
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
