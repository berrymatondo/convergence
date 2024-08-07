"use client";
import CommoViews from "@/components/commo/commoViews";
import HistoCommoItem from "@/components/commo/histoCommoItem";
import EquityViews from "@/components/equity/equityViews";
import HistoEquityItem from "@/components/equity/histoEquityItem";
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
import { getEquity } from "@/lib/_equityActions";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const EquityDetailPage = () => {
  const pathname = usePathname();
  const [equity, setEquity] = useState<any>();
  //console.log("pathname", pathname);

  const { data: session } = useSession();
  const usr: any = session?.user;

  const equityId = pathname.split("equities/")[1];
  useEffect(() => {
    // console.log("equityId ", equityId);
    const fetchEquity = async (id: any) => {
      const resu = await getEquity(id);
      const data = resu?.data;
      setEquity(data);

      //console.log("data", data);

      /*       console.log("data ", data);

      console.log(
        "SORT",
        data?.historicalDataCommo.sort(
          (a: any, b: any) => Date.parse(b.date) - Date.parse(a.date)
        )
      ); */
    };
    fetchEquity(equityId);
  }, [equityId]);

  return (
    <div>
      {" "}
      <PageLayout
        title="Détails d'une action"
        description="Détails et historiques d'une action"
      >
        <div className="px-2">
          <CustomBreadcrumb name={`${equity?.assetName}`} />
          <div className="grid md:grid-cols-8 gap-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-sky-700 dark:text-sky-500">
                  {equity?.assetName}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                {usr && usr.role == "ADMIN" && (
                  <p className="text-red-400 w-full flex items-center justify-between gap-2">
                    <span className="">Identification: </span>
                    <span className="">{equity?.id}</span>
                  </p>
                )}
                <p className=" w-full flex items-center justify-between gap-2">
                  <span className="">ISIN: </span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {equity?.isin}
                  </span>
                </p>
                <p className=" w-full flex items-center justify-between gap-2">
                  <span className="">Currency: </span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {equity?.currency}
                  </span>
                </p>
                <p className=" w-full flex items-center justify-between gap-2">
                  <span className="">Country: </span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {equity?.country}
                  </span>
                </p>
                <p className=" w-full flex items-center justify-between gap-2">
                  <span className="">ACF: </span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {equity?.acf}
                  </span>
                </p>
                <p className=" w-full flex items-center justify-between gap-2">
                  <span className="">Sector:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {" "}
                    {equity?.sector}
                  </span>
                </p>
                <p className=" w-full flex items-center justify-between gap-2">
                  <span className="">RIC: </span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {equity?.ric}
                  </span>
                </p>
                <p className=" w-full flex items-center justify-between gap-2">
                  <span className="">Ticker:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {" "}
                    {equity?.ticker}
                  </span>
                </p>
                <p className=" w-full flex items-center justify-between gap-2">
                  <span className="">Symbol:</span>
                  <span className="text-sky-700 dark:text-sky-500">
                    {" "}
                    {equity?.symbol}
                  </span>
                </p>
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <EquityViews equity={equity} />
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
                      {equity?.historicalDataEquity
                        .sort(
                          (a: any, b: any) =>
                            Date.parse(b.date) - Date.parse(a.date)
                        )
                        .map((histoEquity: any) => (
                          <HistoEquityItem
                            histoEquity={histoEquity}
                            key={histoEquity.id}
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

export default EquityDetailPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/equities">Equities</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
