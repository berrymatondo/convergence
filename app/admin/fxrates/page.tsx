import { auth } from "@/auth";
import CommoItem from "@/components/commo/commoItem";
import SearchCommo from "@/components/commo/searchCommo";
import FxItem from "@/components/fx/fxItem";
import SearchFx from "@/components/fx/searchFx";
import PageLayout from "@/components/pageLayout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import prisma from "@/lib/prisma";
import { SectorList, StaticInfoCommo, StaticInfoFx } from "@prisma/client";
import React from "react";

const infos = [
  {
    title: "Definition",
    description:
      "An exchange rate is the value of a nation's currency in comparison to the currency of another nation or economic zone.",
  },
  {
    title: "Includes",
    description: "Country currencies (USD, EUR, CDF, XAF, XOF, ...",
  },
];

const FxRatesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const skip =
    typeof searchParams.skip === "string" ? Number(searchParams.skip) : 0;
  const take =
    typeof searchParams.take === "string" ? Number(searchParams.take) : 500;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  //const usrCount = await prisma.staticInfoCommo.count();

  //const commos = await prisma.$queryRaw`SELECT * FROM "StaticInfoCommo"`;
  //const commos = await prisma.$queryRaw`SELECT * FROM public."staticInfoCommo"`;

  const fxrates = await prisma.staticInfoFx.findMany({
    take: take,
    skip: skip,

    /*     include: {
      country: true,
      currency1: true,
      currency2: true,
    }, */
    /*     select: {
      id: true, */
    /*       country: {
        where: { name: { contains: search as string, mode: "insensitive" } },
      }, */
    /*       country: true,
      currency1: true,
      currency2: true,
      ticker: true,
      ric: true, */
    //users: true,
    //  company: true,
    //  },
    /*        where: {
      country: { contains: search as string, mode: "insensitive" },
    }, */
    /*       select: {
        id: true,
        assetName: true,
        continent: true,
        gos: true,
        //users: true,
        //  company: true,
      }, */
    /*     orderBy: {
      assetName: "asc",
    }, */
    /*     include: {
      country: {
        where: { name: { contains: search as string, mode: "insensitive" } },
      },
    }, */

    where: {
      country: { name: { contains: search as string, mode: "insensitive" } },
    },
    include: { country: true, currency1: true, currency2: true },

    //  where: { name: { contains: search as string, mode: "insensitive" } },
  });

  //console.log("FxRates ", fxrates);

  const session = await auth();

  return (
    <div>
      {" "}
      <PageLayout
        title="Fx Rates"
        description="Comparaison of of a nation's currency in comparison to the currency"
      >
        <div className="px-2">
          <CustomBreadcrumb name="Fx Rates" />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  Fx Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-start gap-2">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        {infos[0].title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>{infos[0].description}</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>
                      <div className="flex items-start gap-2">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        {infos[1].title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>{infos[1].description}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <div className="">
                <SearchFx search={search} />
              </div>
              <CardContent className="max-md:px-2">
                <ScrollArea className="h-96 max-md:h-[20rem] pr-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px] pl-4">
                          Country
                        </TableHead>
                        <TableHead className="pl-4">Pair</TableHead>
                        <TableHead className="pl-4">Currency 1</TableHead>
                        <TableHead className="pl-4">Currency 2</TableHead>
                        <TableHead className="pl-4">Ticker</TableHead>
                        <TableHead className="text-right">RIC</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fxrates?.map((fx: any) => (
                        <FxItem fx={fx} key={fx.id} />
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default FxRatesPage;

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
