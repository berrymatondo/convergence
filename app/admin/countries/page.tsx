import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { MdAddCircle } from "react-icons/md";
import prisma from "@/lib/prisma";
import PageLayout from "@/components/pageLayout";
import { auth } from "@/auth";
import SearchCountry from "@/components/country/searchCountry";
import CountryItem from "@/components/country/countryItem";

const CountriesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const skip =
    typeof searchParams.skip === "string" ? Number(searchParams.skip) : 0;
  const take =
    typeof searchParams.take === "string" ? Number(searchParams.take) : 10;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const usrCount = await prisma.country.count();

  const countries = await prisma.country.findMany({
    take: take,
    skip: skip,
    /*     include: {
      department: true,
    }, */
    /*     include: {
      address: true,
      zone: true,
    }, */
    where: {
      name: { contains: search as string, mode: "insensitive" },
    },
    select: {
      id: true,
      name: true,
      continent: true,
      gos: true,
      //users: true,
      //  company: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const session = await auth();
  /* 
  if (!session || !session.user)
    return (
      <div className=" py-24 w-full flex flex-col justify-center items-center">
        <p>{"Vous n'êtes pas connecté"}</p>
        <Link href="/auth/login" className="border m-8 p-4 rounded-lg">
          Se connecter
        </Link>
      </div>
    ); */

  return (
    <PageLayout title="Liste des pays" description="La liste de tous les pays">
      <div className="">
        <CustomBreadcrumb name="Pays" />

        <div className=" flex items-center justify-between max-md:m-2 md:mt-2">
          <SearchCountry search={search} />
          <div className="flex justify-normal gap-2 ">
            {skip == 0 ? null : (
              <Link
                href={{
                  pathname: "/admin/countries",
                  query: {
                    ...(search ? { search } : {}),
                    skip: skip > 0 ? skip - take : 0,
                  },
                }}
              >
                {"Précédent"}
              </Link>
            )}
            {skip + countries.length >= usrCount ? null : (
              <Link
                href={{
                  pathname: "/admin/countries",
                  query: {
                    ...(search ? { search } : {}),
                    skip: skip + take,
                  },
                }}
              >
                {"Suivant"}
              </Link>
            )}
          </div>
          <Link className="" href="/admin/countries/new">
            <MdAddCircle size={50} className="md:hidden text-teal-800" />
            <span className="text-sm font-semibold max-md:hidden  px-4 py-3 rounded-md hover:bg-teal-600 hover:cursor-pointer bg-teal-800 text-white ">
              Nouveau
            </span>
          </Link>
        </div>
        <div className="max-sm:max-h-[600px] overflow-auto md:mt-4 md:gap-3 max-w-[800px] mx-auto">
          {countries?.map((ctr: any) => (
            <CountryItem key={ctr.id} ctr={ctr} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default CountriesPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {/*         <BreadcrumbItem>
          <BreadcrumbLink href="/zones">Zones</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
