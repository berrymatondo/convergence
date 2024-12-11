import { auth } from "@/auth";
import Loading from "@/components/commo/loading";
import FxItem from "@/components/fx/fxItem";
import SearchFx from "@/components/fx/searchFx";

import IndexItem from "@/components/index/indexItem";
import SearchIndex from "@/components/index/searchIndex";
import NotConnected from "@/components/notConnected";
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
  CardHeader,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import prisma from "@/lib/prisma";
import Link from "next/link";

import React, { Suspense } from "react";

const FxRatesPage = async ({
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

  //const staticInfoFxCount = await prisma.staticInfoFx.count();
  const staticInfoFxCount = 644;
  // const usrCount = await prisma.country.count();

  const fxs = await prisma.staticInfoFx.findMany({
    take: take,
    skip: skip,

    /*     where: {
      OR: [
        {
          currency2: {
            mic: "CDF",
          },
        }, */
    /*         {
          currency2: {
            mic: { contains: search as string, mode: "insensitive" },
          },
        },
        {
          currency2: {
            currency: { contains: search as string, mode: "insensitive" },
          },
        },
        {
          country2: {
            name: { contains: search as string, m                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       ode: "insensitive" },
          },
        }, */
    /*       ],
    }, */

    include: {
      country: true,
      currency1: true,
      country2: true,
      currency2: true,
    },

    orderBy: {
      priority: "desc",
    },

    /*     orderBy: {
      country2: {
        continent: "asc",
      },
    }, */
  });

  const fxs1 = await prisma.staticInfoFx.findMany({
    take: take,
    skip: skip,

    where: {
      OR: [
        {
          symbol: "1",
        },
        {
          currency2: {
            mic: { contains: search as string, mode: "insensitive" },
          },
        },
        {
          currency2: {
            currency: { contains: search as string, mode: "insensitive" },
          },
        },
        {
          country2: {
            name: { contains: search as string, mode: "insensitive" },
          },
        },
      ],
    },

    include: {
      country: true,
      currency1: true,
      country2: true,
      currency2: true,
    },

    orderBy: {
      priority: "desc",
    },

    /*     orderBy: {
      country2: {
        continent: "asc",
      },
    }, */
  });

  //console.log("fx", fxs);

  const session = await auth();
  const usr: any = session?.user;

  if (!usr) return <NotConnected />;

  return (
    <div>
      {" "}
      <PageLayout
        wid="mx-2 md:mx-12"
        title="Fx Rates"
        //  description="Tous les indices enregistrées dans le système"
      >
        <div className="px-2">
          <CustomBreadcrumb name="Fx Rates" />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-4">
              <div className="max-md:m-2 m-6 full flex justify-between items-baseline">
                <div className="md:w-1/2 flex items-baseline gap-2">
                  <div className="md:w-1/2 ">
                    <SearchFx search={search} />
                  </div>
                  <div className="flex justify-normal gap-2 ">
                    {skip == 0 ? null : (
                      <Link
                        href={{
                          pathname: "/admin/fxrates",
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
                    {skip + fxs.length >= staticInfoFxCount ? null : (
                      <Link
                        href={{
                          pathname: "/admin/fxrates",
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
                      {fxs?.length} founded
                    </span>
                  )}
                </div>
                <span className="max-md:text-xs text-orange-400">
                  {staticInfoFxCount} rate(s)
                </span>{" "}
              </div>

              <CardContent className="max-md:px-2">
                {/*                 <ScrollArea className="h-[38rem] ">
                 */}
                <Tabs defaultValue="africa" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="oecd">OECD</TabsTrigger>
                    <TabsTrigger value="africa">Africa local</TabsTrigger>
                    <TabsTrigger value="emerging">Emerging Market</TabsTrigger>
                    <TabsTrigger value="all">All</TabsTrigger>
                  </TabsList>
                  <TabsContent value="oecd">
                    <Card>
                      <CardHeader>
                        <CardDescription className="flex justify-start gap-4"></CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ScrollArea className=" mt-4 w-full h-[30rem] pr-2">
                          <div className="grid max-md:grid-cols-2 grid-cols-5 gap-2">
                            {fxs1
                              // ?.filter((fx: any) => fx?.symbol == "1")
                              ?.map((i: any, index: any) => (
                                <Suspense key={i.id} fallback={<Loading />}>
                                  <FxItem key={i.id} fx={i} />
                                </Suspense>
                              ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="africa">
                    <Card>
                      <CardHeader>
                        <CardDescription className="flex justify-start gap-4"></CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ScrollArea className=" mt-4 w-full h-[30rem] pr-2">
                          <div className="grid max-md:grid-cols-2 grid-cols-5 gap-2">
                            {fxs
                              ?.filter((fx: any) => fx?.symbol == "2")
                              ?.map((i: any, index: any) => (
                                <Suspense key={i.id} fallback={<Loading />}>
                                  <FxItem key={i.id} fx={i} />
                                </Suspense>
                              ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="emerging">
                    <Card>
                      <CardHeader>
                        <CardDescription className="flex justify-start gap-4"></CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ScrollArea className=" mt-4 w-full h-[30rem] pr-2">
                          <div className="grid max-md:grid-cols-2 grid-cols-5 gap-2">
                            {fxs
                              ?.filter((fx: any) => fx?.symbol == "3")
                              ?.map((i: any, index: any) => (
                                <Suspense key={i.id} fallback={<Loading />}>
                                  <FxItem key={i.id} fx={i} />
                                </Suspense>
                              ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="all">
                    <Card>
                      <CardHeader>
                        <CardDescription className="flex justify-start gap-4"></CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <ScrollArea className=" mt-4 w-full h-[30rem] pr-2">
                          <div className="grid max-md:grid-cols-2 grid-cols-5 gap-2">
                            {fxs?.map((i: any, index: any) => (
                              <Suspense key={i.id} fallback={<Loading />}>
                                <FxItem key={i.id} fx={i} />
                              </Suspense>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
                {/*                   <div className="grid max-md:grid-cols-2 grid-cols-5 gap-2">
                    {fxs?.map((i: any, index: any) => (
                      <Suspense key={i.id} fallback={<Loading />}>
                        <FxItem key={i.id} fx={i} />
                      </Suspense>
                    ))}
                  </div> */}
                {/*                 </ScrollArea>
                 */}{" "}
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
