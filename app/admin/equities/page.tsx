import { auth } from "@/auth";
import SearchCommo from "@/components/commo/searchCommo";
import EquityItem from "@/components/equity/equityItem";
import SearchEquity from "@/components/equity/searchEquity";
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
import { StaticInfoEquity } from "@prisma/client";
import React from "react";

const infos = [
  {
    title: "Définition",
    description:
      "Les actions représentent une part de propriété dans une entreprise.",
  },
  {
    title: "Comporte",
    description:
      "Actions ordinaires et préférentielles, dividendes, et parfois des actions de préférence convertibles.",
  },
];

const EquitiesPage = async ({
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

  //const usrCount = await prisma.staticInfoCommo.count();

  //const commos = await prisma.$queryRaw`SELECT * FROM "StaticInfoCommo"`;
  //const commos = await prisma.$queryRaw`SELECT * FROM public."staticInfoCommo"`;

  const equities = await prisma.staticInfoEquity.findMany({
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
        title="Liste des actions"
        description="Toutes les actions enregistrées dans le système"
      >
        <div className="px-2">
          <CustomBreadcrumb name="Equities" />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  Actions
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
                <SearchEquity search={search} />
              </div>
              <CardContent className="max-md:px-2">
                <ScrollArea className="h-96 max-md:h-[20rem] pr-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Asset Name</TableHead>
                        <TableHead>ISIN</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead className="max-md:hidden">Country</TableHead>
                        <TableHead className="max-md:text-right">
                          Sector
                        </TableHead>
                        <TableHead className="max-md:hidden">ACF</TableHead>
                        <TableHead className="max-md:hidden">RIC</TableHead>
                        <TableHead className="max-md:hidden">Ticker</TableHead>
                        <TableHead className="text-right max-md:hidden">
                          Symbol
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {equities?.map((equity: StaticInfoEquity) => (
                        <EquityItem equity={equity} key={equity.id} />
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

export default EquitiesPage;

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
