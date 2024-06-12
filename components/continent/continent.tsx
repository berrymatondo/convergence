import { getCountriesByContinent } from "@/lib/_countryActions";
import { Country } from "@prisma/client";
import Link from "next/link";
import React from "react";

const Continent = async ({ slug }: { slug: string[] }) => {
  const continentId = slug[0];
  const countryId = slug[2];

  const countries = await getCountriesByContinent(continentId);

  // console.log("coutries", countries);

  return (
    <div className="flex flex-col">
      {countries?.data?.map((country: Country) => (
        <Link key={country.id} href="/">
          {country.name}
        </Link>
      ))}
    </div>
  );
};

export default Continent;
