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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContinentsList } from "@prisma/client";
import { Accordion } from "@radix-ui/react-accordion";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const infos = [
  {
    title: "Continents",
    description: "tous les continents ...",
  },
  /*   {
    title: "Pays",
    description: "Infos sur les pays ...",
  }, */
];

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
      flagCode: true,
      //users: true,
      //  company: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const session = await auth();
  const usr: any = session?.user;
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
    <PageLayout
      title="Countries"
      //description="La liste de tous les pays"
    >
      <div className="px-2">
        <CustomBreadcrumb name="Countries" />
        <div className="grid md:grid-cols-4 gap-2">
          <Card className="md:col-span-3 bg-blue-950/30">
            <div className="flex items-center justify-between md:container">
              <div className="py-2">
                <SearchCountry search={search} />
              </div>
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
                    className="max-md:text-xs max-md:pr-2  text-orange-600 "
                  >
                    {"Previous"}
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
                    className="max-md:text-xs  max-md:pr-2  text-orange-600"
                  >
                    {"Next"}
                  </Link>
                )}
              </div>
              {/*               <Link className="mx-12" href="/admin/countries/new">
                <MdAddCircle
                  size={50}
                  className="md:hidden text-sky-700 dark:text-sky-500"
                />
                               <span className="text-sm font-semibold max-md:hidden px-4 py-3 rounded-md hover:bg-sky-800 hover:cursor-pointer bg-sky-700  text-white ">
                  Nouveau
                </span> 
              </Link> */}
            </div>
            {/*             <div className="max-sm:max-h-[600px] overflow-auto md:mt-4 md:gap-3 max-w-[800px] mx-auto">
              {countries?.map((ctr: any) => (
                <CountryItem key={ctr.id} ctr={ctr} />
              ))}
            </div> */}

            <CardContent className="max-md:px-2 ">
              <ScrollArea className="h-96 max-md:h-[20rem] pr-2">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]"> Country</TableHead>
                      <TableHead className="">Continent</TableHead>

                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {countries?.map((ctr: any) => (
                      <CountryItem key={ctr.id} ctr={ctr} />
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="md:col-span-1 bg-blue-950/30">
            <CardContent className="">
              <div className="max-md:hidden">
                <div className="flex gap-1 my-2">
                  {" "}
                  <span className="md:text-xl text-sky-700 dark:text-sky-500 font-medium leading-none">
                    Continents
                  </span>
                </div>
                {Object.values(ContinentsList)?.map((ur: any) => (
                  <Link
                    href={`/continents/${ur}`}
                    className="flex flex-col italic text-sm text-muted-foreground py-1"
                    key={ur}
                  >
                    {ur}
                  </Link>
                ))}
              </div>
              <Accordion
                type="single"
                defaultValue="item-1"
                collapsible
                className="w-full md:hidden"
              >
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="flex gap-1">
                      {" "}
                      <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                      <span className="text-sm font-medium leading-none">
                        Continents
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    {Object.values(ContinentsList)?.map((ur: any) => (
                      <Link
                        href={`/continents/${ur}`}
                        className="flex flex-col italic text-sm text-muted-foreground"
                        key={ur}
                      >
                        {ur}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
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
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
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
