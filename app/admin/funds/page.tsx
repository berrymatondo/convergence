import { auth } from "@/auth";
import CommoItem from "@/components/commo/commoItem";
import SearchCommo from "@/components/commo/searchCommo";
import FundItem from "@/components/fund/fundItem";
import SearchFund from "@/components/fund/searchFund";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { SectorList, StaticInfoCommo, StaticInfoFund } from "@prisma/client";
import { log } from "console";
import Link from "next/link";
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

const FundsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const skip =
    typeof searchParams.skip === "string" ? Number(searchParams.skip) : 0;
  const take =
    typeof searchParams.take === "string" ? Number(searchParams.take) : 200;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  let funds = await prisma.staticInfoFund.findMany({
    take: take,
    skip: skip,
    where: {
      AND: [
        {
          lipperClassificationScheme: {
            contains: "Commodity",
            mode: "insensitive",
          },
        },
        {
          country: {
            name: { contains: search as string, mode: "insensitive" },
          },
        },
      ],
      /*       OR: [
        {
          name: { contains: search as string, mode: "insensitive" },
        },
        {
          isin: { contains: search as string, mode: "insensitive" },
        },
      ], */
    },

    /* 
    where: {
      
      name: { contains: search as string, mode: "insensitive" },
    }, */
    include: { currency: true, country: true, fundPromotersMapping: true },

    orderBy: {
      name: "asc",
    },
  });

  let bonds = await prisma.staticInfoFund.findMany({
    take: take,
    skip: skip,
    where: {
      AND: [
        {
          lipperClassificationScheme: {
            not: { contains: "Commodity" },
            mode: "insensitive",
          },
        },

        {
          country: {
            name: { contains: search as string, mode: "insensitive" },
          },
        },
        /*         {
          isin: { contains: search as string, mode: "insensitive" },
        }, */
      ],
    },

    /* 
    where: {
      
      name: { contains: search as string, mode: "insensitive" },
    }, */
    include: { currency: true, country: true, fundPromotersMapping: true },

    orderBy: {
      name: "asc",
    },
  });

  const staticInfoFundCount = await prisma.staticInfoFund.count();

  const session = await auth();

  return (
    <div>
      {" "}
      <PageLayout
        title="List of Funds"
        description="All funds recorderd in our system"
      >
        <div className="px-2">
          <CustomBreadcrumb name="Funds" />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-4">
              <div className="max-md:m-2 m-6 full flex justify-between items-baseline">
                <div className="md:w-1/2 flex items-baseline gap-2">
                  <div className="md:w-1/2 ">
                    <SearchFund search={search} />
                  </div>
                  <div className="flex justify-normal gap-2 ">
                    {skip == 0 ? null : (
                      <Link
                        href={{
                          pathname: "/admin/funds",
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
                    {skip + funds.length >= staticInfoFundCount ? null : (
                      <Link
                        href={{
                          pathname: "/admin/funds",
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
                  {search && (
                    <span className="max-md:text-xs text-green-400">
                      {funds?.length} founded
                    </span>
                  )}
                </div>
                <span className="max-md:text-xs text-orange-400">
                  {staticInfoFundCount} rate(s)
                </span>{" "}
              </div>
              <CardContent className="max-md:px-2">
                <Tabs defaultValue="commodities" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="commodities">Commodities</TabsTrigger>
                    <TabsTrigger value="bonds">Bonds</TabsTrigger>
                  </TabsList>
                  <TabsContent value="commodities">
                    <ScrollArea className="h-96 max-md:h-[20rem] pr-2">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead className="max-md:hidden">
                              ISIN
                            </TableHead>
                            <TableHead>Lipper Classification</TableHead>
                            <TableHead className="w-[200px]">
                              Domicile
                            </TableHead>
                            <TableHead>Currency</TableHead>
                            <TableHead>Exchange</TableHead>
                            <TableHead className="text-right">
                              Promoter
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {funds?.map((fund: StaticInfoFund) => (
                            <FundItem fund={fund} key={fund.id} />
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="bonds">
                    <ScrollArea className="h-96 max-md:h-[20rem] pr-2">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead className="max-md:hidden">
                              ISIN
                            </TableHead>
                            <TableHead>Lipper Classification</TableHead>
                            <TableHead className="w-[200px]">
                              Domicile
                            </TableHead>
                            <TableHead>Currency</TableHead>
                            <TableHead>Exchange</TableHead>
                            <TableHead className="text-right">
                              Promoter
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bonds?.map((fund: StaticInfoFund) => (
                            <FundItem fund={fund} key={fund.id} />
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default FundsPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
