import { auth } from "@/auth";

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

import React from "react";

const IndexesPage = async ({
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
      assetName: "asc",
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
        title="Indexes"
        //  description="Tous les indices enregistrées dans le système"
      >
        <div className="px-2">
          <CustomBreadcrumb name="Indexes" />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-4">
              <div className="max-md:m-2 m-6 full flex justify-between items-baseline">
                <div className=" md:w-1/4">
                  <SearchIndex search={search} />
                </div>
                <span className="max-md:text-xs text-orange-400">
                  {indexes?.length} index(es)
                </span>
              </div>
              <CardContent className="max-md:px-2">
                <ScrollArea className="h-[40rem] ">
                  <div className="grid max-md:grid-cols-2 grid-cols-6 gap-2">
                    {indexes?.map((i: any, index: any) => (
                      <IndexItem key={i.id} index={i} />
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
