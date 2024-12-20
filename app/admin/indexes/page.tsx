import { auth } from "@/auth";
import Loading from "@/components/commo/loading";

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
import Link from "next/link";

import React, { Suspense } from "react";

const IndexesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const skip =
    typeof searchParams.skip === "string" ? Number(searchParams.skip) : 0;
  const take =
    typeof searchParams.take === "string" ? Number(searchParams.take) : 15;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const staticInfoIndexCount = await prisma.staticInfoIndex.count();

  const indexes = await prisma.staticInfoIndex.findMany({
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
        title="Indexes"
        //  description="Tous les indices enregistrées dans le système"
      >
        <div className="px-2">
          <CustomBreadcrumb name="Indexes" />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-4">
              <div className="max-md:m-2 m-6 full flex justify-between items-baseline">
                <div className="md:w-1/2 flex items-baseline gap-2">
                  <div className="md:w-1/2 ">
                    <SearchIndex search={search} />
                  </div>
                  <div className="flex justify-normal gap-2 ">
                    {skip == 0 ? null : (
                      <Link
                        href={{
                          pathname: "/admin/indexes",
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
                    {skip + indexes.length >= staticInfoIndexCount ? null : (
                      <Link
                        href={{
                          pathname: "/admin/indexes",
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
                      {indexes?.length} founded
                    </span>
                  )}
                </div>
                <span className="max-md:text-xs text-orange-400">
                  {staticInfoIndexCount} index(es)
                </span>{" "}
              </div>

              <CardContent className="max-md:px-2">
                <ScrollArea className="h-[38rem] ">
                  <div className="grid max-md:grid-cols-2 grid-cols-5 gap-2">
                    {indexes?.map((i: any, index: any) => (
                      /*                       <Suspense key={i.id} fallback={<Loading />}>
                       */ <IndexItem key={i.id} index={i} />
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
