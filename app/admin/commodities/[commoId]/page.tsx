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
import { Separator } from "@/components/ui/separator";
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
import {
  getAllStaticCommo,
  getCommo,
  getCommoHsitoMaxDate,
} from "@/lib/_commoActions";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const CommoDetailPage = () => {
  const pathname = usePathname();
  const [commo, setCommo] = useState<any>();
  const [commos, setCommos] = useState<any>([]);
  //console.log("pathname", pathname);

  const { data: session } = useSession();
  const usr: any = session?.user;

  const commoId = pathname.split("commodities/")[1];
  useEffect(() => {
    const fetchCommo = async (id: any) => {
      const rs = await getAllStaticCommo();
      const dt = rs?.data;

      console.log("data", dt);

      setCommos(rs?.data);

      const resu = await getCommo(id);
      let data = resu?.data;

      if (resu?.data) {
        const res2 = await getCommoHsitoMaxDate(id);
        const data2 = res2?.data?.close;
        // console.log("data2", data2);
        //console.log("data2", data);

        /*         if(res2?.data)
        data = {...data, last:res2?.data} */
        const tempo: any = {
          ...data,
          last: res2?.data?.close,
          close1: res2?.data?.close1,
          close5: res2?.data?.close5,
          close20: res2?.data?.close20,
          close60: res2?.data?.close60,
          close252: res2?.data?.close252,
        };
        // console.log("tempo ", tempo);
        setCommo(tempo);
      } else setCommo(data);

      //console.log("data ", data);
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

  //  console.log("commoId ", commo?.close20);

  return (
    <div>
      {" "}
      <PageLayout
        title="Détails matière première"
        description="Détails et historiques d'une matière première"
      >
        <div className="px-2">
          <CustomBreadcrumb name={`${commo?.assetName}`} />
          <p className="my-2 text-2xl font-semibold text-sky-700 dark:text-sky-500">
            {commo?.assetName}
          </p>
          <div className="grid md:grid-cols-8 gap-2 ">
            <Card className="md:col-span-2 py-4">
              {/*               <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  {commo?.assetName}
                </CardTitle>
              </CardHeader> */}
              <CardContent className="text-sm">
                {/*                 {usr && usr.role == "ADMIN" && (
                  <p className=" w-full flex items-center justify-between gap-2">
                    <span className="">Identification: </span>
                    <span className="">{commo?.id}</span>
                  </p>
                )} */}

                <p className="w-full flex items-center justify-between gap-2">
                  <span className="text-sky-700 dark:text-sky-500">
                    {commo?.currency?.mic}{" "}
                  </span>
                </p>

                <p className="w-full flex items-center justify-end gap-2">
                  <span className="text-4xl text-orange-700 dark:text-orange-500">
                    {commo?.last?.close}
                  </span>
                </p>
                <p className=" w-full flex items-center justify-end gap-2">
                  <span
                    className={
                      +commo?.last?.change < 0
                        ? `text-red-600`
                        : "text-green-600"
                    }
                  >
                    {commo?.last?.change}
                  </span>
                  <span
                    className={
                      +commo?.last?.change < 0
                        ? `text-red-600`
                        : "text-green-600"
                    }
                  >
                    {commo?.last?.changePercentage?.toFixed(2)} %
                  </span>
                </p>
                <p className=" w-full flex items-center justify-between gap-2">
                  <span className="">
                    {new Date(commo?.last?.date.toString()).toUTCString()} CDT
                  </span>
                </p>
                <div className="mt-2 space-y-1 w-full flex flex-col items-start justify-start gap-2">
                  <span className="">Delayted quote</span>
                  <Separator />
                </div>
                <div className="mt-2 space-y-1 w-full flex flex-col items-start justify-start gap-2">
                  <span className="text-xl text-orange-700 dark:text-orange-500">
                    Key Data
                  </span>
                  <Separator className="text-orange-500" />
                </div>

                <p className=" w-full flex  flex-col items-start  justify-between gap-2">
                  <span className="">Previous close:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {commo?.close1?.close}
                  </span>
                </p>
                <p className=" w-full flex  flex-col items-start justify-between gap-2">
                  <span className="">Day Range</span>
                  <p>
                    <span className="text-sky-700 dark:text-sky-500">
                      {commo?.close1?.close}
                    </span>
                    {"-"}
                    <span className="text-sky-700 dark:text-sky-500">
                      {commo?.last?.close}
                    </span>
                  </p>
                </p>
                <p className=" w-full flex  flex-col items-start  justify-between gap-2">
                  <span className="">52 Wk Range</span>
                  <p>
                    {" "}
                    <span className="text-sky-700 dark:text-sky-500">
                      {commo?.close252?.close}
                    </span>
                    {"-"}
                    <span className="text-sky-700 dark:text-sky-500">
                      {commo?.last?.close}
                    </span>
                  </p>
                </p>
                <div className="mt-2 space-y-1 w-full flex flex-col items-start justify-start gap-2">
                  <span className="text-xl text-orange-700 dark:text-orange-500">
                    Performance
                  </span>
                  <Separator className="text-orange-500" />
                </div>
                <p className=" w-full flex  flex-col items-start  justify-between gap-2">
                  <span className="">5 Day:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {(
                      (+commo?.last?.close / +commo?.close5?.close - 1) *
                      100
                    ).toFixed(2)}{" "}
                    %
                  </span>
                </p>
                <p className=" w-full flex  flex-col items-start justify-between gap-2">
                  <span className="">1 Month:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {(
                      (+commo?.last?.close / +commo?.close20?.close - 1) *
                      100
                    ).toFixed(2)}{" "}
                    %
                  </span>
                </p>
                <p className=" w-full flex  flex-col items-start justify-between gap-2">
                  <span className="">3 Month:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {(
                      (+commo?.last?.close / +commo?.close60?.close - 1) *
                      100
                    ).toFixed(2)}{" "}
                    %
                  </span>
                </p>
                <p className=" w-full flex flex-col items-start justify-between gap-2">
                  <span className="">1 Year:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {(
                      (+commo?.last?.close / +commo?.close252?.close - 1) *
                      100
                    ).toFixed(2)}{" "}
                    %
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CommoViews commo={commo} />
            </Card>

            <Card className="md:col-span-3">
              {/*               <div className="">
                <SearchCommo search={search} />
              </div> */}
              <CardContent className="max-md:px-2">
                <ScrollArea className="h-96 max-md:h-[20rem] pr-2">
                  {commos?.length}
                  {commos?.map((el: any) => (
                    <div>{el?.assetName}</div>
                  ))}
                  {/*                   <Table>
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
