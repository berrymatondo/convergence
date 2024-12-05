import { auth } from "@/auth";
import CommoItem from "@/components/commo/commoItem";
import SearchCommo from "@/components/commo/searchCommo";
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
import { SectorList, StaticInfoCommo } from "@prisma/client";
import { log } from "console";
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

  //const usrCount = await prisma.staticInfoCommo.count();

  //const commos = await prisma.$queryRaw`SELECT * FROM "StaticInfoCommo"`;
  //const commos = await prisma.$queryRaw`SELECT * FROM public."staticInfoCommo"`;

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

  //console.log("max ", commosH?._max?.date);

  /*   const produitWithMaxPrix = await prisma.historicalDataCommo.findFirst({
    where: {
      id: 6,
      date:commosH?.date
    },
    select: {
      id: true,
      nom: true,
      prix: true,
    },
  });
  
  console.log(produitWithMaxPrix); */

  const session = await auth();

  return (
    <div>
      {" "}
      <PageLayout
        title="Liste des matières premières"
        description="Toutes les matières premières enregistrées dans le système"
      >
        <div className="px-2">
          <CustomBreadcrumb name="Commodities" />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  Matières Premières
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
                <SearchCommo search={search} />
              </div>
              <CardContent className="max-md:px-2">
                <ScrollArea className="h-96 max-md:h-[20rem] pr-2">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Name</TableHead>
                        <TableHead className="max-md:hidden">ISIN</TableHead>
                        <TableHead>Lipper Classification</TableHead>
                        <TableHead>Domicile</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Exchange</TableHead>
                        <TableHead className="text-right">Promoter</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {commos?.map((commo: StaticInfoCommo) => (
                        <CommoItem commo={commo} key={commo.id} />
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

export default CommoditiesPage;

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
