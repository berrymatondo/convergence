"use client";
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
import { getCommo } from "@/lib/_commoActions";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const CommoDetailPage = () => {
  const pathname = usePathname();
  const [commo, setCommo] = useState<any>();
  //console.log("pathname", pathname);
  const commoId = pathname.split("commodities/")[1];
  useEffect(() => {
    const fetchCommo = async (id: any) => {
      const resu = await getCommo(id);
      const data = resu?.data;
      setCommo(data);

      //  console.log("data ", data);
    };
    fetchCommo(commoId);
  }, [commoId]);

  return (
    <div>
      {" "}
      <PageLayout
        title="Détails matière première"
        description="Détails et historiques d'une matière première"
      >
        <div className="px-2">
          <CustomBreadcrumb name={`${commo?.assetName}`} />
          <div className="grid md:grid-cols-4 gap-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-blue-600">
                  {commo?.assetName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Currency: {commo?.currency}</p>
                <p>Sector: {commo?.sector}</p>
                <p>RIC: {commo?.ric}</p>
                <p>Ticker: {commo?.ticker}</p>
                <p>Symbol: {commo?.symbol}</p>
                {/*                 <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="flex items-start gap-2">
                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                        {commo?.assetName}
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
                </Accordion> */}
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              {/*               <div className="">
                <SearchCommo search={search} />
              </div> */}
              <CardContent className="max-md:px-2">
                <ScrollArea className="h-96 max-md:h-[20rem] pr-2">
                  <Table>
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
                      {/*                       {commos.map((commo) => (
                        <CommoItem commo={commo} key={commo.id} />
                      ))} */}
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

export default CommoDetailPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/commodities">Commodities</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
