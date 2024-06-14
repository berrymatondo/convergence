"use client";
import { usePathname } from "next/navigation";

import { ContinentsList, Country } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { getCountriesByContinent } from "@/lib/_countryActions";
import PageLayout from "@/components/pageLayout";
import { useSession } from "next-auth/react";

export default function Continentayout({
  params,
  children,
}: {
  params: { slug?: string[] };
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const cont = pathname.split("continents")[1].split("/")[1];
  const [countries, setCountries] = useState<any>();

  const { data: session } = useSession();
  const usr: any = session?.user;

  //console.log("PATHNAME: ", pathname);
  //console.log("PATHNAME: ", pathname.split("continents")[1].split("/")[1]);

  /*   const continents = Object.values(ContinentsList);
  if (!continents) return notFound(); */

  const { slug } = params;

  //console.log("SLUG 2", slug);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await getCountriesByContinent(cont);
      const data = await res?.data;

      setCountries(data);

      console.log("data celes: ", data);
    };
    fetchCountries();
  }, [cont]);

  const contId = slug?.[0];
  //console.log("contId: ", contId);
  console.log("ROLE: ", usr?.role);

  return (
    <div>
      <div className=" flex max-md:flex-col gap-4 md:p-8 ">
        {usr?.role == "ADMIN" && (
          <ul className="bg-neutral-100 dark:bg-opacity-0 py-4 md:w-1/5 flex flex-col items-center gap-2 border rounded-lg">
            <Link
              href="/admin/countries"
              className="text-black dark:text-white underline"
            >
              Vers tous les pays
            </Link>

            {countries
              ?.filter(
                (co: Country) =>
                  co.id.toString() == contId || usr?.role == "ADMIN"
              )
              ?.map((count: Country) => (
                <div key={count.id}>
                  <Link
                    href={`/continents/${cont}/${count.id}`}
                    //href={`/continents/`}
                    className={
                      contId == count.id.toString()
                        ? "font-semibold text-blue-600 dark:text-blue-300 "
                        : "text-gray-500 dark:text-gray-500"
                    }
                  >
                    {count.name}
                  </Link>
                </div>
              ))}
          </ul>
        )}
        <div className="flex-1 ">{children}</div>
      </div>
    </div>
  );
}
