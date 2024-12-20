"use client";
import PageLayout from "@/components/pageLayout";
import { ContinentsList } from "@prisma/client";
import Link from "next/link";
import { notFound, usePathname, useRouter } from "next/navigation";
import { GiAfrica, GiEarthAsiaOceania } from "react-icons/gi";
import { FaGlobeAmericas, FaGlobeAsia, FaGlobeEurope } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { getContinent } from "@/lib/_continentActions";
import Test from "@/components/continent/test";
import { Suspense } from "react";
import Loading from "@/components/commo/loading";

export default function Continentayout({
  params,
  children,
}: {
  params: { slug?: string[] };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();
  const usr: any = session?.user;

  /*   const { data: session } = useSession();


  let usr: any;
  let continent: any;
  let countryId: any;

  if (session) usr = session?.user;

  {
    if (usr?.role === "AGENT")
      router.push(`/continents/${usr?.continent}/${usr?.countryId}`);
  }

  console.log("SESSION:", session); */

  const continents = Object.values(ContinentsList);
  if (!continents) return notFound();

  const cont = pathname.split("continents/")[1]?.split("/")[0];
  //console.log("PATHNAME: ", pathname.split("continents/")[1]?.split("/")[0]);

  const { slug } = params;

  //console.log("slug", slug);

  const contId = slug?.[0];

  //console.log("continents", continents);
  return (
    /*     <PageLayout title={usr?.role == "ADMIN" ? "Tous les continents" : ""}>
     */ <PageLayout wid="mx-12" title="">
      <div className=" flex flex-col gap-4  ">
        {usr?.role != "AGENT" && (
          <ul className=" flex max-md:flex-wrap justify-between gap-2 max-md:hidden">
            {continents.map((conti: any) => (
              <div key={conti}>
                <Link
                  href={`/continents/${conti}`}
                  className={
                    conti == cont
                      ? "flex gap-1 items-center max-md:text-xs font-semibold text-blue-600 dark:text-blue-300 underline"
                      : "flex gap-1 items-center max-md:text-xs font-semibold text-gray-400 dark:text-gray-500"
                  }
                >
                  {conti == "AFRICA" ? (
                    <GiAfrica className="text-green-600" size={50} />
                  ) : conti == "AMERICA" ? (
                    <FaGlobeAmericas className="text-green-600" size={50} />
                  ) : conti == "ASIA" ? (
                    <FaGlobeAsia className="text-green-600" size={50} />
                  ) : conti == "EUROPE" ? (
                    <FaGlobeEurope className="text-green-600" size={50} />
                  ) : (
                    <GiEarthAsiaOceania className="text-green-600" size={50} />
                  )}
                  {conti}
                </Link>
              </div>
            ))}
          </ul>
        )}
        {children}
      </div>
    </PageLayout>
  );
}
