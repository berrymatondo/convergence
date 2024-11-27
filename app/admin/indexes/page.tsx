import { auth } from "@/auth";
import CommoItem from "@/components/commo/commoItem";
import SearchCommo from "@/components/commo/searchCommo";
import SearchIndex from "@/components/index/searchIndex";
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

/*TEMPO*/
const inds = [
  {
    id: 1,
    label: "JSE Top 40",
    val: 0.9,
    price: 455.9,
    country: "South Africa",
  },
  {
    id: 2,
    label: "JSE FRin  Index",
    val: 0.9,
    price: 455.9,
    country: "South Africa",
  },
  {
    id: 3,
    label: "JSE Top 40",
    val: 0.9,
    price: 455.9,
    country: "South Africa",
  },
  {
    id: 4,
    label: "JSE Top 40",
    val: 0.9,
    price: 455.9,
    country: "South Africa",
  },
  {
    id: 5,
    label: "JSE Top 40",
    val: 0.9,
    price: 455.9,
    country: "South Africa",
  },
  {
    id: 6,
    label: "JSE Top 40",
    val: 0.9,
    price: 455.9,
    country: "South Africa",
  },
  {
    id: 7,
    label: "JSE Top 40",
    val: 0.9,
    price: 455.9,
    country: "South Africa",
  },
  {
    id: 8,
    label: "JSE Top 40",
    val: 0.9,
    price: 455.9,
    country: "South Africa",
  },
  {
    id: 9,
    label: "JSE Top 40",
    val: 0.9,
    price: 455.9,
    country: "South Africa",
  },
  {
    id: 10,
    label: "JSE Top 40",
    val: 0.9,
    price: 455.9,
    country: "South Africa",
  },
];

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

  //const usrCount = await prisma.staticInfoCommo.count();

  //const commos = await prisma.$queryRaw`SELECT * FROM "StaticInfoCommo"`;
  //const commos = await prisma.$queryRaw`SELECT * FROM public."staticInfoCommo"`;

  const indexes = await prisma.staticInfoIndex.findMany({
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

  //console.log("indexes", indexes);

  const session = await auth();

  return (
    <div>
      {" "}
      <PageLayout
        title="Liste des indices"
        description="Tous les indices enregistrées dans le système"
      >
        <div className="px-2">
          <CustomBreadcrumb name="Indices" />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  Indices
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
                <SearchIndex search={search} />
              </div>
              <CardContent className="max-md:px-2">
                <ScrollArea className="h-96 max-md:h-[20rem]">
                  <div className="grid grid-cols-5 gap-2">
                    {inds.map((i: any, index: any) => (
                      <div
                        key={index}
                        className=" border-2 p-2 mt-2 rounded-lg"
                      >
                        <p>{i.label}</p>
                        <p>{i.val}</p>
                        <p>{i.price}</p>
                        <p>{i.country}</p>
                      </div>
                    ))}
                  </div>
                  {/*                   <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Asset Name</TableHead>
                        <TableHead className="max-md:hidden">
                          Currency
                        </TableHead>
                        <TableHead>Sector</TableHead>
                        <TableHead>RIC</TableHead>
                        <TableHead>Ticker</TableHead>
                        <TableHead className="text-right">Symbol</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {indexes?.map((commo: StaticInfoCommo) => (
                        <CommoItem commo={commo} key={commo.id} />
                      ))}
                    </TableBody>
                  </Table> */}
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
