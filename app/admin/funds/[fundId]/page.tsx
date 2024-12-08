import { auth } from "@/auth";
import CommoBody from "@/components/commo/commoBody";
import CommoViews from "@/components/commo/commoViews";
import HistoCommoItem from "@/components/commo/histoCommoItem";
import Loading from "@/components/commo/loading";
import FundViews from "@/components/fund/fundViews";
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
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
  getLastCommoHsitoMaxDate,
} from "@/lib/_commoActions";
import { getFund } from "@/lib/_fundActions";
import { getIndex } from "@/lib/_indexActions";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

type FundDetailPageProps = {
  params: {
    fundId: number;
  };
};

const FundDetailPage = async ({ params }: FundDetailPageProps) => {
  const resu = await getIndex(22);
  const defFund = resu?.data;

  const resu23 = await getIndex(23);
  const defFund23 = resu23?.data;

  const res = await getFund(params.fundId);
  const fund = res?.data;

  //console.log("fund", fund);

  const session = await auth();
  const usr: any = session?.user;

  const getFundCountryRegistered = (listCusto: any) => {
    let rezo: any = "";
    for (let i = 0; i < listCusto.length; i++) {
      rezo += listCusto[i].country.name.replace("_", " ") + ",";
    }
    return rezo.slice(0, -1);
  };

  const getFundAdministrators = (listCusto: any) => {
    let rezo: any = "";
    for (let i = 0; i < listCusto.length; i++) {
      rezo += listCusto[i].administrator + ",";
    }
    return rezo.slice(0, -1);
  };

  const getFundPromoters = (listCusto: any) => {
    let rezo: any = "";
    for (let i = 0; i < listCusto.length; i++) {
      rezo += listCusto[i].promoter + ",";
    }
    return rezo.slice(0, -1);
  };

  const getFundPrometerManager = (listCusto: any) => {
    let rezo: any = "";
    for (let i = 0; i < listCusto.length; i++) {
      rezo += listCusto[i].promoterManager + ",";
    }
    return rezo.slice(0, -1);
  };

  const getFundAdvisors = (listCusto: any) => {
    let rezo: any = "";
    for (let i = 0; i < listCusto.length; i++) {
      rezo += listCusto[i].advisor + ",";
    }
    return rezo.slice(0, -1);
  };

  const getFundCustodians = (listCusto: any) => {
    let rezo: any = "";
    for (let i = 0; i < listCusto.length; i++) {
      rezo += listCusto[i].custodian + ",";
    }

    return rezo.slice(0, -1);
  };

  return (
    <div className="">
      {" "}
      <PageLayout
        wid="mx-12"
        title={fund?.name}
        description="This page gives the details of a fund"
      >
        <CustomBreadcrumb name="Funds" />

        <div className="grid grid-cols-5">
          <div className="col-span-3 grid grid-cols-2 gap-2">
            <div className="text-sm bg-blue-950/30 col-span-1 border rounded-lg px-2">
              <h1 className=" text-center font-semibold  p-2 text-sky-400">
                Fund Identification
              </h1>
              <Separator className="my-1" />
              <p className="flex justify-between mt-1">
                <span className="font-thin">Name:</span>
                <strong className="font-thin text-orange-400">
                  {fund?.name}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">ISIN:</span>
                <strong className="font-thin text-orange-400">
                  {fund?.isin}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Lipper Classification Scheme:</span>
                <strong className="font-thin text-orange-400">
                  {fund?.lipperClassificationScheme}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Instrument Type:</span>
                <strong className="font-thin text-orange-400">
                  {fund?.instrumentType}
                </strong>
              </p>
            </div>
            <div className="text-sm bg-blue-950/30 col-span-1 border rounded-lg px-2">
              <h1 className="text-center font-semibold  p-2 text-sky-400">
                Market and Domicile
              </h1>
              <Separator className="my-1" />
              <p className="flex justify-between mt-1">
                <span className="font-thin">Exchange:</span>
                <strong className="font-thin text-orange-400">
                  {fund?.exchange}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">SEDOL:</span>
                <strong className="font-thin text-orange-400">
                  {fund?.sedol}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Currency:</span>
                <strong className="font-thin text-orange-400">
                  {fund?.currency?.mic}
                </strong>
              </p>
              <p className="flex justify-between mt-1">
                <span className="font-thin">Domicile:</span>
                <strong className="font-thin text-orange-400">
                  {fund?.country?.name.replace("_", " ")}
                </strong>
              </p>
            </div>

            <div className="mt-1 text-sm bg-blue-950/30 col-span-1 border rounded-lg p  -2">
              <h1 className="text-center font-semibold  p-2 text-sky-400">
                Country Registered For Sale
              </h1>
              <Separator className="my-1" />
              <p className="flex justify-between mt-1">
                <strong className="font-medium">
                  {getFundCountryRegistered(
                    fund?.fundCountryRegisteredForSales
                  )}
                </strong>
              </p>
            </div>
            <div className="mt-1 text-sm bg-blue-950/30 col-span-1 border rounded-lg p-2">
              <h1 className="text-center font-semibold  p-2 text-sky-400">
                Fund Administrator
              </h1>
              <Separator className="my-1" />
              <p className="flex justify-between mt-1">
                <strong className="font-medium">
                  {getFundAdministrators(fund?.fundAdministratorsMapping)}
                </strong>
                fund
              </p>
            </div>
            <div className="mt-1 text-sm bg-blue-950/30 col-span-1 border rounded-lg p-2">
              <h1 className="text-center font-semibold  p-2 text-sky-400">
                Fund Promoter
              </h1>
              <Separator className="my-1" />
              <p className="flex justify-between mt-1">
                <strong className="font-medium">
                  {getFundPromoters(fund?.fundPromotersMapping)}
                </strong>
              </p>
            </div>
            <div className="mt-1 text-sm bg-blue-950/30 col-span-1 border rounded-lg p-2">
              <h1 className="text-center font-semibold  p-2 text-sky-400">
                Fund Promoter Manager
              </h1>
              <Separator className="my-1" />
              <p className="flex justify-between mt-1">
                <strong className="font-medium">
                  {getFundPrometerManager(fund?.fundPromotersManagerMapping)}
                </strong>
              </p>
            </div>
            <div className="mt-1 text-sm bg-blue-950/30 col-span-1 border rounded-lg p-2">
              <h1 className="text-center font-semibold  p-2 text-sky-400">
                Fund Advisor
              </h1>
              <Separator className="my-1" />
              <p className="flex justify-between mt-1">
                <strong className="font-medium">
                  {getFundAdvisors(fund?.fundAdvisorsMapping)}
                </strong>
              </p>
            </div>
            <div className="mt-1 text-sm bg-blue-950/30 col-span-1 border rounded-lg p-2">
              <h1 className="text-center font-semibold  p-2 text-sky-400">
                Fund Custodian
              </h1>
              <Separator className="my-1" />
              <p className="flex justify-between mt-1">
                <strong className="font-medium">
                  {getFundCustodians(fund?.fundCustodiansMapping)}
                </strong>
              </p>
            </div>
          </div>
          <div className=" col-span-2">
            {" "}
            <Suspense fallback={<Loading />}>
              <FundViews fund={defFund} fund23={defFund23} />
            </Suspense>
          </div>
          {/*           <CustomBreadcrumb name={`${commo?.assetName}`} />
          <p className="uppercase my-4 text-4xl font-semibold text-sky-700 dark:text-sky-500">
            {commo?.assetName}
          </p> */}
          {/*           <div className="grid md:grid-cols-12 gap-2 ">
            <Card className="md:col-span-6 py-4">
              <CardContent className="text-sm">
                <p className="w-full flex items-center justify-between gap-2 mb-2">
                  <span className="text-xl text-orange-700 dark:text-orange-500">
                    {commo?.currency?.mic}
                  </span>

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
            <Card className="md:col-span-6">
              <Suspense fallback={<Loading />}>
                <CommoViews commo={commo} commos={commos} />
              </Suspense>
            </Card>
          </div> */}
        </div>
      </PageLayout>
    </div>
  );
};

export default FundDetailPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/funds">Funds</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
