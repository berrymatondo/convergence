"use client";
import CommoBody from "@/components/commo/commoBody";
import CommoSelect from "@/components/commo/commoSelect";
import CommoViews from "@/components/commo/commoViews";
import HistoCommoItem from "@/components/commo/histoCommoItem";
import Loading from "@/components/commo/loading";
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
  getCommoHsitoMaxDate2,
  getLastCommoHsitoMaxDate,
} from "@/lib/_commoActions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

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

      //  console.log("data", dt);

      setCommos(rs?.data);

      const resu = await getCommo(id);
      let data = resu?.data;

      if (resu?.data) {
        const res2 = await getCommoHsitoMaxDate2(id);
        const data2 = res2?.data?.close;
        // console.log("data2", data2);
        //console.log("data2", data);

        const tempo: any = {
          ...data,
          last: res2?.data?.close,
          close1: res2?.data?.close1,
          close5: res2?.data?.close5,
          close20: res2?.data?.close20,
          close60: res2?.data?.close60,
          close252: res2?.data?.close252,
        };
        setCommo(tempo);
      } else setCommo(data);

      //console.log("comos", rs?.data);
      /* 
      if (rs?.data) {
        for (let i = 0; i < rs.data.length; i++) {
          const res3 = await getCommoHsitoMaxDate(rs.data[i].id);
          const data3 = res3?.data?.close;
          // console.log("data2", data2);
          //console.log("data2", data);

          ttt.push({
            id: rs.data[i].id,
            name: rs.data[i].assetName,
            close: data3,
          });
        }
        setTout(ttt);
      } */
    };
    fetchCommo(commoId);
  }, [commoId]);

  return (
    <div className="">
      {" "}
      <PageLayout wid="mx-2 md:mx-12">
        <div className="">
          <CustomBreadcrumb name={`${commo?.assetName}`} />
          <p className="uppercase my-4 text-4xl font-semibold text-sky-700 dark:text-sky-500">
            {commo?.assetName}
          </p>
          <div className="grid md:grid-cols-12 gap-2 ">
            <Card className="md:col-span-2 py-4 bg-blue-950/30 ">
              <CardContent className="text-sm ">
                <p className="w-full flex items-center justify-between gap-2 mb-2">
                  <span className="text-xl text-orange-700 dark:text-orange-500">
                    {commo?.currency?.mic}
                  </span>
                  <Suspense fallback={<Loading />}>
                    {commo?.currency?.mic && (
                      <span className="text-5xl text-orange-700 dark:text-orange-500">
                        {+commo?.last?.close.toFixed(2)}
                      </span>
                    )}{" "}
                  </Suspense>
                </p>

                <p className=" w-full flex items-center justify-end gap-2 mb-2">
                  <span
                    className={
                      +commo?.last?.change < 0
                        ? `text-red-600`
                        : "text-green-600"
                    }
                  >
                    {+commo?.last?.change > 0 ? "+" : ""}
                    {commo?.last?.change?.toFixed(2)}
                  </span>
                  <span
                    className={
                      +commo?.last?.change < 0
                        ? `text-red-600`
                        : "text-green-600"
                    }
                  >
                    {+commo?.last?.change > 0 ? "+" : ""}
                    {commo?.last?.changePercentage?.toFixed(2)} %
                  </span>
                </p>
                <div className=" w-full flex items-center justify-between gap-2">
                  <p className="gap-4 flex justify-between">
                    {new Date(commo?.last?.date.toString()).toDateString()}
                    <span>CDT</span>
                  </p>
                </div>
                <div className="mt-2 space-y-1 w-full flex flex-col items-start justify-start gap-2">
                  <span className="text-lg">Delayted quote</span>
                  <Separator />
                </div>
                <div className="mt-2 space-y-1 w-full flex flex-col items-start justify-start gap-2">
                  <span className="text-xl font-semibold text-orange-700 dark:text-orange-500">
                    Key Data
                  </span>
                </div>

                <p className=" mb-2 w-full flex  flex-col items-start  justify-between gap-2">
                  <span className="text-gray-400">Previous close:</span>
                  <span className="text-2xl font-semibold text-sky-700 dark:text-sky-500">
                    {commo?.close1?.close.toFixed(2)}
                  </span>
                </p>
                <Separator className="text-orange-500" />
                <div className=" mb-2 w-full flex  flex-col items-start justify-between gap-2">
                  <span className="text-gray-400">Day Range</span>
                  <p>
                    <span className="text-2xl font-semibold text-sky-700 dark:text-sky-500">
                      {commo?.close1?.close.toFixed(2)}
                    </span>
                    {" - "}
                    <span className="text-2xl font-semibold text-sky-700 dark:text-sky-500">
                      {commo?.last?.close.toFixed(2)}
                    </span>
                  </p>
                </div>
                <Separator className="text-orange-500" />
                <div className=" mt-2 w-full flex  flex-col items-start  justify-between gap-2">
                  <span className="text-gray-400">52 Wk Range</span>
                  <p>
                    {" "}
                    <span className="text-2xl font-semibold text-sky-700 dark:text-sky-500">
                      {commo?.close252?.close.toFixed(2)}
                    </span>
                    {" - "}
                    <span className="text-2xl font-semibold text-sky-700 dark:text-sky-500">
                      {commo?.last?.close.toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className="mt-2 space-y-1 w-full flex flex-col items-start justify-start gap-2">
                  <span className="text-xl font-semibold text-orange-700 dark:text-orange-500">
                    Performance
                  </span>
                  <Separator className="text-orange-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="mt-2 w-full flex items-start  justify-between gap-2">
                    <span className="">5 Day:</span>
                    <span className="text-sky-700 dark:text-sky-500">
                      {(
                        (+commo?.last?.close / +commo?.close5?.close - 1) *
                        100
                      ).toFixed(2)}{" "}
                      %
                    </span>
                  </p>
                  <p className=" w-full flex items-start justify-between gap-2">
                    <span className="">1 Month:</span>
                    <span className="text-sky-700 dark:text-sky-500">
                      {(
                        (+commo?.last?.close / +commo?.close20?.close - 1) *
                        100
                      ).toFixed(2)}{" "}
                      %
                    </span>
                  </p>
                  <p className=" w-full flex   items-start justify-between gap-2">
                    <span className="">3 Month:</span>
                    <span className="text-sky-700 dark:text-sky-500">
                      {(
                        (+commo?.last?.close / +commo?.close60?.close - 1) *
                        100
                      ).toFixed(2)}{" "}
                      %
                    </span>
                  </p>
                  <p className=" w-full flex  items-start justify-between gap-2">
                    <span className="">1 Year:</span>
                    <span className="text-sky-700 dark:text-sky-500">
                      {(
                        (+commo?.last?.close / +commo?.close252?.close - 1) *
                        100
                      ).toFixed(2)}{" "}
                      %
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-5">
              <Suspense fallback={<Loading />}>
                <CommoSelect commo={commo} commos={commos} />
                {/*                 <CommoViews commo={commo} commos={commos} />
                 */}{" "}
              </Suspense>
            </Card>
            <Card className="md:col-span-3 bg-blue-950/30 ">
              <CardHeader>
                <CardTitle>Historical Data</CardTitle>
              </CardHeader>
              <CardContent className="max-md:px-2">
                <ScrollArea className=" mt-4 w-full h-[30rem] pr-2">
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
                    <Suspense fallback={<Loading />}>
                      <TableBody className="">
                        <CommoBody commoList={commo?.historicalDataCommo} />
                        {/*                       {commo?.historicalDataCommo
                        ?.sort(
                          (a: any, b: any) =>
                            Date.parse(b.date) - Date.parse(a.date)
                        )
                        .map((histoCommo: any) => (
                          <HistoCommoItem
                            histoCommo={histoCommo}
                            key={histoCommo.id}
                          />
                        ))} */}
                      </TableBody>
                    </Suspense>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 bg-blue-950/30 ">
              <CardHeader>
                <CardTitle>Other Commodities</CardTitle>
              </CardHeader>
              <CardContent className="max-md:px-2">
                <ScrollArea className="h-[30rem] max-md:h-[20rem] pr-2 py-4">
                  {commos?.map((el: any) => (
                    <div key={el.id} className="">
                      <Link
                        href={`/admin/commodities/${el.id}`}
                        className="text-sky-600 text-lg hover:text-sky-400"
                      >
                        {el?.assetName}
                      </Link>
                    </div>
                  ))}
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
