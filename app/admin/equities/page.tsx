import { auth } from "@/auth";
import Loading from "@/components/commo/loading";
import EquityItem from "@/components/equity/equityItem";
import SearchEquity from "@/components/equity/searchEquity";

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
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import prisma from "@/lib/prisma";
import Link from "next/link";

import React, { Suspense } from "react";

const EquitiesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const skip =
    typeof searchParams.skip === "string" ? Number(searchParams.skip) : 0;
  const take =
    typeof searchParams.take === "string" ? Number(searchParams.take) : 25;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const staticInfoEquityCount = await prisma.staticInfoEquity.count();

  const equities = await prisma.staticInfoEquity.findMany({
    take: take,
    skip: skip,

    where: {
      OR: [
        { assetName: { contains: search as string, mode: "insensitive" } },
        {
          country: {
            name: { contains: search as string, mode: "insensitive" },
          },
        },
      ],
    },

    include: {
      country: true,
    },

    orderBy: {
      country: {
        continent: "asc",
      },
    },
  });

  // console.log("indexes", indexes);

  const session = await auth();
  const usr: any = session?.user;

  if (!usr) return <NotConnected />;

  return (
    <div>
      {" "}
      <PageLayout
        wid="mx-2 md:mx-12"
        title="Equities" //  description="Tous les indices enregistrées dans le système"
      >
        <div className="px-2">
          <CustomBreadcrumb name="Equities" />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-4">
              <div className="max-md:m-2 m-6 full flex justify-between items-baseline">
                <div className="md:w-1/2 flex items-baseline gap-2">
                  <div className="md:w-1/2 ">
                    <SearchEquity search={search} />
                  </div>
                  <div className="flex justify-normal gap-2 ">
                    {skip == 0 ? null : (
                      <Link
                        href={{
                          pathname: "/admin/equities",
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
                    {skip + equities.length >= staticInfoEquityCount ? null : (
                      <Link
                        href={{
                          pathname: "/admin/equities",
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
                      {equities?.length} founded
                    </span>
                  )}
                </div>
                <span className="max-md:text-xs text-orange-400">
                  {staticInfoEquityCount} stock(s)
                </span>{" "}
              </div>

              <CardContent className="max-md:px-2">
                <ScrollArea className="h-[38rem] ">
                  <div className="grid max-md:grid-cols-1 grid-cols-5 gap-2">
                    {equities?.map((i: any, index: any) => (
                      /*                       <Suspense key={i.id} fallback={<Loading />}>
                       */ <EquityItem key={i.id} equity={i} />
                      /*                       </Suspense>
                       */
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageLayout>
    </div>
  );
};

export default EquitiesPage;

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
