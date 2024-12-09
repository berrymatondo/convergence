import { auth } from "@/auth";
import Loading from "@/components/commo/loading";
import EquityItem from "@/components/equity/equityItem";
import SearchEquity from "@/components/equity/searchEquity";

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
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import prisma from "@/lib/prisma";

import React, { Suspense } from "react";

const IndexesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const skip =
    typeof searchParams.skip === "string" ? Number(searchParams.skip) : 0;
  const take =
    typeof searchParams.take === "string" ? Number(searchParams.take) : 75;

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
        title="Equities"
        //  description="Tous les indices enregistrées dans le système"
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
                  <div className="grid max-md:grid-cols-2 grid-cols-5 gap-2">
                    {equities?.map((i: any, index: any) => (
                      <Suspense fallback={<Loading />}>
                        <EquityItem key={i.id} equity={i} />
                      </Suspense>
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

export default IndexesPage;

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
