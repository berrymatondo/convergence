"use client";
import PageLayout from "@/components/pageLayout";
import { ContinentsList } from "@prisma/client";
import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { GiAfrica, GiEarthAsiaOceania } from "react-icons/gi";
import { FaGlobeAmericas, FaGlobeAsia, FaGlobeEurope } from "react-icons/fa";

export default function Continentayout({
  params,
  children,
}: {
  params: { slug?: string[] };
  children: React.ReactNode;
}) {
  const continents = Object.values(ContinentsList);
  if (!continents) return notFound();

  const pathname = usePathname();
  const cont = pathname.split("continents/")[1]?.split("/")[0];
  //console.log("PATHNAME: ", pathname.split("continents/")[1]?.split("/")[0]);

  const { slug } = params;

  console.log("slug", slug);

  const contId = slug?.[0];

  return (
    <PageLayout title="Tous les continents">
      <div className="flex flex-col gap-4 p-8 ">
        <ul className=" flex max-md:flex-wrap justify-between gap-2 ">
          {continents.map((conti: any) => (
            <div key={conti}>
              <Link
                href={`/continents/${conti}`}
                className={
                  conti == cont
                    ? "flex gap-1 items-center font-semibold text-blue-600 dark:text-blue-300 underline"
                    : "flex gap-1 items-center  font-semibold text-gray-400 dark:text-gray-500"
                }
              >
                {conti == "AFRIQUE" ? (
                  <GiAfrica />
                ) : conti == "AMERIQUE" ? (
                  <FaGlobeAmericas />
                ) : conti == "ASIE" ? (
                  <FaGlobeAsia />
                ) : conti == "EUROPE" ? (
                  <FaGlobeEurope />
                ) : (
                  <GiEarthAsiaOceania />
                )}
                {conti}
              </Link>
            </div>
          ))}
        </ul>
        {children}
      </div>
    </PageLayout>
  );
}
