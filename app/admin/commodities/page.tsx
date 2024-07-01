import { auth } from "@/auth";
import PageLayout from "@/components/pageLayout";
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
import React from "react";

const infos = [
  {
    title: "Définition",
    description:
      "Les matières premières sont des produits de base échangés sur des marchés financiers.",
  },
  {
    title: "Comporte",
    description:
      "Métaux précieux (or, argent), énergie (pétrole, gaz naturel), produits agricoles (blé, café), métaux industriels (cuivre, aluminium).",
  },
];

/* const commos = [
  {
    assetName: "Cocoa",
    id: 20,
    currencey: "USD",
    sector: "AGRICULTURE",
    ric: "",
    ticker: "CC=F",
    symbol: "",
  },
  {
    assetName: "Cotton",
    id: 21,
    currencey: "USD",
    sector: "AGRICULTURE",
    ric: "",
    ticker: "CT=F",
    symbol: "",
  },
  {
    assetName: "Orange Juice",
    id: 22,
    currencey: "USD",
    sector: "AGRICULTURE",
    ric: "",
    ticker: "OJ=F",
    symbol: "",
  },
  {
    assetName: "Cobalt",
    id: 23,
    currencey: "USD",
    sector: "ENERGY",
    ric: "",
    ticker: "",
    symbol: "cobalt",
  },
  {
    assetName: "Nickel",
    id: 24,
    currencey: "USD",
    sector: "METALS",
    ric: "",
    ticker: "",
    symbol: "nickel",
  },
]; */

const CommoditiesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const skip =
    typeof searchParams.skip === "string" ? Number(searchParams.skip) : 0;
  const take =
    typeof searchParams.take === "string" ? Number(searchParams.take) : 100;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const usrCount = await prisma.staticInfoCommo.count();

  const commos = await prisma.staticInfoCommo.findMany({
    take: take,
    skip: skip,

    where: {
      assetName: { contains: search as string, mode: "insensitive" },
    },
    /*       select: {
        id: true,
        assetName: true,
        continent: true,
        gos: true,
        //users: true,
        //  company: true,
      }, */
    orderBy: {
      assetName: "asc",
    },
  });

  const session = await auth();

  return (
    <div>
      {" "}
      <PageLayout
        title="Liste des matières premières"
        description="Toutes les matières premières enregistrées dans le système"
      >
        <div className="">
          <CustomBreadcrumb name="Commodities" />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Matières Premières</CardTitle>
              </CardHeader>
              <CardContent>
                {infos.map((notification, index) => (
                  <div
                    key={index}
                    className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                  >
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {notification.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              <CardContent>
                <ScrollArea className="h-96 max-md:h-48 pr-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Asset Name</TableHead>
                        <TableHead className="max-md:hidden">
                          Currency
                        </TableHead>
                        <TableHead>Sector</TableHead>
                        <TableHead>RIC</TableHead>
                        <TableHead>Ticker</TableHead>
                        <TableHead className="text-right">Symbol</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {commos.map((invoice) => (
                        <TableRow key={invoice.id}>
                          <TableCell className="font-medium text-blue-600">
                            {invoice.assetName}
                          </TableCell>
                          <TableCell className="max-md:hidden">
                            {invoice.currency}
                          </TableCell>
                          <TableCell>{invoice.sector}</TableCell>
                          <TableCell>{invoice.ric}</TableCell>
                          <TableCell>{invoice.ticker}</TableCell>
                          <TableCell className="text-right">
                            {invoice.symbol}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>

            {/*           <div className="max-sm:max-h-[600px] overflow-auto md:mt-4 md:gap-3 max-w-[800px] mx-auto">
            {countries?.map((ctr: any) => (
              <CountryItem key={ctr.id} ctr={ctr} />
            ))}
          </div> */}
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default CommoditiesPage;

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
