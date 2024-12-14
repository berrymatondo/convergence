import { auth } from "@/auth";
import BondItem from "@/components/bond/bondItem";
import SearchBond from "@/components/bond/searchBond";

import SearchFund from "@/components/fund/searchFund";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { StaticInfoBond } from "@prisma/client";
import { log } from "console";
import Link from "next/link";
import React from "react";

const BondsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const skip =
    typeof searchParams.skip === "string" ? Number(searchParams.skip) : 0;
  const take =
    typeof searchParams.take === "string" ? Number(searchParams.take) : 50;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  let bonds1 = await prisma.staticInfoBond.findMany({
    take: take,
    skip: skip,
    where: {
      acf: "ACF_2",

      OR: [
        { description: { contains: search as string, mode: "insensitive" } },
        {
          market: {
            name: { contains: search as string, mode: "insensitive" },
          },
        },
      ],
    },
    include: {
      principalCurrency: true,
      market: true,
    },

    orderBy: {
      description: "asc",
    },
  });

  let bonds2 = await prisma.staticInfoBond.findMany({
    take: take,
    skip: skip,
    where: {
      acf: "ACF_1",

      OR: [
        { description: { contains: search as string, mode: "insensitive" } },
        {
          market: {
            name: { contains: search as string, mode: "insensitive" },
          },
        },
      ],
    },

    include: {
      principalCurrency: true,
      market: true,
    },
    orderBy: {
      description: "asc",
    },
  });

  let bonds3 = await prisma.staticInfoBond.findMany({
    take: take,
    skip: skip,
    where: {
      greenBond: true,

      OR: [
        { description: { contains: search as string, mode: "insensitive" } },
        {
          market: {
            name: { contains: search as string, mode: "insensitive" },
          },
        },
      ],
    },

    include: {
      principalCurrency: true,
      market: true,
    },
    orderBy: {
      description: "asc",
    },
  });

  let bonds4 = await prisma.staticInfoBond.findMany({
    take: take,
    skip: skip,
    where: {
      dualCurrency: true,

      OR: [
        { description: { contains: search as string, mode: "insensitive" } },
        {
          market: {
            name: { contains: search as string, mode: "insensitive" },
          },
        },
      ],
    },

    include: {
      principalCurrency: true,
      market: true,
    },
    orderBy: {
      description: "asc",
    },
  });

  let bonds5 = await prisma.staticInfoBond.findMany({
    take: take,
    skip: skip,
    where: {
      inflationLinked: true,

      OR: [
        { description: { contains: search as string, mode: "insensitive" } },
        {
          market: {
            name: { contains: search as string, mode: "insensitive" },
          },
        },
      ],
    },

    include: {
      principalCurrency: true,
      market: true,
    },
    orderBy: {
      description: "asc",
    },
  });

  let bonds6 = await prisma.staticInfoBond.findMany({
    take: take,
    skip: skip,
    where: {
      callable: true,

      OR: [
        { description: { contains: search as string, mode: "insensitive" } },
        {
          market: {
            name: { contains: search as string, mode: "insensitive" },
          },
        },
      ],
    },

    include: {
      principalCurrency: true,
      market: true,
    },
    orderBy: {
      description: "asc",
    },
  });

  const staticInfoBondCount = await prisma.staticInfoBond.count();

  const session = await auth();

  return (
    <div>
      {" "}
      <PageLayout wid="mx-2 md:mx-12" title="Bonds">
        <div className="px-2">
          <CustomBreadcrumb name="Bonds" />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-4">
              <div className="max-md:m-2 m-6 full flex justify-between items-baseline">
                <div className="md:w-1/2 flex items-baseline gap-2">
                  <div className="md:w-1/2 ">
                    <SearchBond search={search} />
                  </div>
                </div>
                <span className="max-md:text-xs text-orange-400">
                  {staticInfoBondCount} rate(s)
                </span>{" "}
              </div>
              <CardContent className="max-md:px-2">
                <Tabs defaultValue="emerging" className="w-full">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="emerging">
                      Emerging Market Bonds
                    </TabsTrigger>
                    <TabsTrigger value="oecd"> OECD Bonds</TabsTrigger>
                    <TabsTrigger value="green">Green Bonds</TabsTrigger>
                    <TabsTrigger value="dual">Dual Currency Bonds</TabsTrigger>
                    <TabsTrigger value="inflation">
                      Inflation-linked Bonds
                    </TabsTrigger>
                    <TabsTrigger value="callable">Callable Bonds</TabsTrigger>
                  </TabsList>
                  <TabsContent value="emerging">
                    <div className="flex justify-end gap-4 ">
                      {skip == 0 ? null : (
                        <Link
                          href={{
                            pathname: "/admin/bonds",
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
                      {skip + bonds1.length >= staticInfoBondCount ? null : (
                        <Link
                          href={{
                            pathname: "/admin/bonds",
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
                        {bonds1?.length} founded
                      </span>
                    )}
                    <ScrollArea className=" h-96 max-md:h-[20rem] pr-2">
                      <Table className="relative">
                        <TableHeader className="sticky top-0  z-10">
                          <TableRow>
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead className="max-md:hidden">
                              ISIN
                            </TableHead>
                            <TableHead>Issuer</TableHead>
                            <TableHead>Coupon Rate</TableHead>
                            <TableHead>Coupon Class</TableHead>
                            <TableHead>Principal Currency</TableHead>
                            <TableHead>Maturity</TableHead>

                            <TableHead className="text-right">
                              Market of Issue
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bonds1?.map((fund: StaticInfoBond) => (
                            <BondItem bond={fund} key={fund.id} />
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="oecd">
                    <div className="flex justify-end gap-4 ">
                      {skip == 0 ? null : (
                        <Link
                          href={{
                            pathname: "/admin/bonds",
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
                      {skip + bonds2.length >= staticInfoBondCount ? null : (
                        <Link
                          href={{
                            pathname: "/admin/bonds",
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
                        {bonds2?.length} founded
                      </span>
                    )}
                    <ScrollArea className="h-96 max-md:h-[20rem] pr-2">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead className="max-md:hidden">
                              ISIN
                            </TableHead>
                            <TableHead>Issuer</TableHead>

                            <TableHead>Coupon Rate</TableHead>
                            <TableHead>Coupon Class</TableHead>
                            <TableHead>Principal Currency</TableHead>
                            <TableHead>Maturity</TableHead>

                            <TableHead className="text-right">
                              Market of Issue
                            </TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {bonds2?.map((fund: StaticInfoBond) => (
                            <BondItem bond={fund} key={fund.id} />
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="green">
                    <div className="flex justify-end gap-4 ">
                      {skip == 0 ? null : (
                        <Link
                          href={{
                            pathname: "/admin/bonds",
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
                      {skip + bonds3.length >= staticInfoBondCount ? null : (
                        <Link
                          href={{
                            pathname: "/admin/bonds",
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
                        {bonds3?.length} founded
                      </span>
                    )}
                    <ScrollArea className=" h-96 max-md:h-[20rem] pr-2">
                      <Table className="relative">
                        <TableHeader className="sticky top-0  z-10">
                          <TableRow>
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead className="max-md:hidden">
                              ISIN
                            </TableHead>
                            <TableHead>Issuer</TableHead>
                            <TableHead>Coupon Rate</TableHead>
                            <TableHead>Coupon Class</TableHead>
                            <TableHead>Principal Currency</TableHead>
                            <TableHead>Maturity</TableHead>

                            <TableHead className="text-right">
                              Market of Issue
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bonds3?.map((fund: StaticInfoBond) => (
                            <BondItem bond={fund} key={fund.id} />
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="dual">
                    <div className="flex justify-end gap-4 ">
                      {skip == 0 ? null : (
                        <Link
                          href={{
                            pathname: "/admin/bonds",
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
                      {skip + bonds4.length >= staticInfoBondCount ? null : (
                        <Link
                          href={{
                            pathname: "/admin/bonds",
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
                        {bonds4?.length} founded
                      </span>
                    )}
                    <ScrollArea className="h-96 max-md:h-[20rem] pr-2">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead className="max-md:hidden">
                              ISIN
                            </TableHead>
                            <TableHead>Issuer</TableHead>

                            <TableHead>Coupon Rate</TableHead>
                            <TableHead>Coupon Class</TableHead>
                            <TableHead>Principal Currency</TableHead>
                            <TableHead>Maturity</TableHead>

                            <TableHead className="text-right">
                              Market of Issue
                            </TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {bonds4?.map((fund: StaticInfoBond) => (
                            <BondItem bond={fund} key={fund.id} />
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="inflation">
                    <div className="flex justify-end gap-4 ">
                      {skip == 0 ? null : (
                        <Link
                          href={{
                            pathname: "/admin/bonds",
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
                      {skip + bonds5.length >= staticInfoBondCount ? null : (
                        <Link
                          href={{
                            pathname: "/admin/bonds",
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
                        {bonds5?.length} founded
                      </span>
                    )}
                    <ScrollArea className=" h-96 max-md:h-[20rem] pr-2">
                      <Table className="relative">
                        <TableHeader className="sticky top-0  z-10">
                          <TableRow>
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead className="max-md:hidden">
                              ISIN
                            </TableHead>
                            <TableHead>Issuer</TableHead>
                            <TableHead>Coupon Rate</TableHead>
                            <TableHead>Coupon Class</TableHead>
                            <TableHead>Principal Currency</TableHead>
                            <TableHead>Maturity</TableHead>

                            <TableHead className="text-right">
                              Market of Issue
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bonds5?.map((fund: StaticInfoBond) => (
                            <BondItem bond={fund} key={fund.id} />
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="callable">
                    <div className="flex justify-end gap-4 ">
                      {skip == 0 ? null : (
                        <Link
                          href={{
                            pathname: "/admin/bonds",
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
                      {skip + bonds6.length >= staticInfoBondCount ? null : (
                        <Link
                          href={{
                            pathname: "/admin/bonds",
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
                        {bonds6?.length} founded
                      </span>
                    )}
                    <ScrollArea className="h-96 max-md:h-[20rem] pr-2">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[200px]">Name</TableHead>
                            <TableHead className="max-md:hidden">
                              ISIN
                            </TableHead>
                            <TableHead>Issuer</TableHead>

                            <TableHead>Coupon Rate</TableHead>
                            <TableHead>Coupon Class</TableHead>
                            <TableHead>Principal Currency</TableHead>
                            <TableHead>Maturity</TableHead>

                            <TableHead className="text-right">
                              Market of Issue
                            </TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {bonds6?.map((fund: StaticInfoBond) => (
                            <BondItem bond={fund} key={fund.id} />
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

export default BondsPage;

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
