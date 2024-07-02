"use client";
import HistoCommoItem from "@/components/commo/histoCommoItem";
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

      /*       console.log("data ", data);

      console.log(
        "SORT",
        data?.historicalDataCommo.sort(
          (a: any, b: any) => Date.parse(b.date) - Date.parse(a.date)
        )
      ); */
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
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  {commo?.assetName}
                </CardTitle>
              </CardHeader>
              <CardContent className=" w-3/5">
                <p className=" w-full flex items-start justify-between gap-2">
                  <span className="">Currency: </span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {commo?.currency}
                  </span>
                </p>
                <p className=" w-full flex items-start justify-between gap-2">
                  <span className="">Sector:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {" "}
                    {commo?.sector}
                  </span>
                </p>
                <p className=" w-full flex items-start justify-between gap-2">
                  <span className="">RIC: </span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {commo?.ric}
                  </span>
                </p>
                <p className=" w-full flex items-start justify-between gap-2">
                  <span className="">Ticker:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {" "}
                    {commo?.ticker}
                  </span>
                </p>
                <p className=" w-full flex items-start justify-between gap-2">
                  <span className="">Symbol:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {" "}
                    {commo?.symbol}
                  </span>
                </p>
              </CardContent>
            </Card>
            <Card className="md:col-span-3">
              {/*               <div className="">
                <SearchCommo search={search} />
              </div> */}
              <CardContent className="max-md:px-2">
                <ScrollArea className="h-96 max-md:h-[20rem] pr-2">
                  <Table>
                    <TableHeader className="">
                      <TableRow className="">
                        <TableHead className="max-md:w-[100px] md:pl-4">
                          Date
                        </TableHead>
                        <TableHead className="text-center">Close</TableHead>
                        <TableHead className="text-center">Change</TableHead>
                        <TableHead className="text-right md:pr-4">
                          Change %
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="">
                      {commo?.historicalDataCommo
                        .sort(
                          (a: any, b: any) =>
                            Date.parse(b.date) - Date.parse(a.date)
                        )
                        .map((histoCommo: any) => (
                          <HistoCommoItem
                            histoCommo={histoCommo}
                            key={histoCommo.id}
                          />
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
