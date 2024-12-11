"use client";
import CommoViews from "@/components/commo/commoViews";
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
import { getFx } from "@/lib/_fxActions";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const FxDetailPage = () => {
  const pathname = usePathname();
  const [fx, setFx] = useState<any>();
  //console.log("pathname", pathname);

  const { data: session } = useSession();
  const usr: any = session?.user;

  const fxId = pathname.split("fxrates/")[1];
  useEffect(() => {
    const fetchCommo = async (id: any) => {
      const resu = await getFx(id);
      const data = resu?.data;
      setFx(data);

      /*       console.log("data ", data);

      console.log(
        "SORT",
        data?.historicalDataCommo.sort(
          (a: any, b: any) => Date.parse(b.date) - Date.parse(a.date)
        )
      ); */
    };
    fetchCommo(fxId);
  }, [fxId]);

  return (
    <div>
      {" "}
      <PageLayout
        title="Détails matière première"
        description="Détails et historiques d'une matière première"
      >
        <div className="px-2">
          <CustomBreadcrumb name={`${fx?.assetName}`} />
          <div className="grid md:grid-cols-8 gap-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  {fx?.assetName}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                {usr && usr.role == "ADMIN" && (
                  <p className="text-red-400 w-full flex items-center justify-between gap-2">
                    <span className="">Identification: </span>
                    <span className="">{fx?.id}</span>
                  </p>
                )}
                <p className="w-full flex items-center justify-between gap-2">
                  <span className="">Currency: </span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {fx?.currency}
                  </span>
                </p>
                <p className=" w-full flex items-center justify-between gap-2">
                  <span className="">Sector:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {" "}
                    {fx?.sector}
                  </span>
                </p>
                <p className=" w-full flex items-center justify-between gap-2">
                  <span className="">RIC: </span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {fx?.ric}
                  </span>
                </p>
                <p className=" w-full flex items-center justify-between gap-2">
                  <span className="">Ticker:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {" "}
                    {fx?.ticker}
                  </span>
                </p>
                <p className=" w-full flex items-center justify-between gap-2">
                  <span className="">Symbol:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {" "}
                    {fx?.symbol}
                  </span>
                </p>
              </CardContent>
            </Card>

            {/*             <Card className="md:col-span-3">
              <CommoViews commo={fx} />
            </Card> */}

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
                      {fx?.historicalDataCommo
                        ?.sort(
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

export default FxDetailPage;

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
