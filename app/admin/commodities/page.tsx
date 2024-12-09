import { auth } from "@/auth";
import CommoItem from "@/components/commo/commoItem";
import Loading from "@/components/commo/loading";
import SearchCommo from "@/components/commo/searchCommo";
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

import { getAllStaticCommo } from "@/lib/_commoActions";
import prisma from "@/lib/prisma";
import React, { Suspense } from "react";

const CommoditiesPage = async ({
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

  //const usrCount = await prisma.staticInfoCommo.count();

  //const commos = await prisma.$queryRaw`SELECT * FROM "StaticInfoCommo"`;
  //const commos = await prisma.$queryRaw`SELECT * FROM public."staticInfoCommo"`;

  //const rrr = await getAllStaticCommo();

  const staticInfoCommoCount = await prisma.staticInfoCommo.count();

  let commos = await prisma.staticInfoCommo.findMany({
    take: take,
    skip: skip,

    where: {
      assetName: { contains: search as string, mode: "insensitive" },
    },

    include: { currency: true },
    /*       select: {
        id: true,
        assetName: true,
        continent: true,
        gos: true,
        //users: true,
        //  company: true,
      }, */
    // include: { historicalDataCommo: true },
    orderBy: {
      assetName: "asc",
    },
  });

  //console.log("Commo", commos);

  const session = await auth();
  const usr: any = session?.user;

  if (!usr) return <NotConnected />;

  return (
    <div>
      {" "}
      <PageLayout
        title="Commodities"
        // description="Toutes les matières premières enregistrées dans le système"
      >
        <div className="px-2">
          <CustomBreadcrumb name="Commodities" />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-4">
              <div className="max-md:m-2 m-6 full flex justify-between items-baseline">
                <div className="md:w-1/2 flex items-baseline gap-2">
                  <div className="md:w-1/2 ">
                    <SearchCommo search={search} />
                  </div>
                  {search && (
                    <span className="max-md:text-xs text-green-400">
                      {commos?.length} founded
                    </span>
                  )}
                </div>
                <span className="max-md:text-xs text-orange-400">
                  {staticInfoCommoCount} commo(s)
                </span>{" "}
              </div>
              <CardContent className="max-md:px-2">
                <ScrollArea className="h-[38rem] ">
                  <div className="grid max-md:grid-cols-2 grid-cols-5 gap-2">
                    {commos?.map((i: any, index: any) => (
                      <Suspense key={i.id} fallback={<Loading />}>
                        <CommoItem key={i.id} commo={i} />
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

export default CommoditiesPage;

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
