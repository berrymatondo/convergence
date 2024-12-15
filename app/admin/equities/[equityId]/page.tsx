import { auth } from "@/auth";
import Loading from "@/components/commo/loading";
import CustomBredcrumb from "@/components/customBreadcrumb";
import AllStaticEquities from "@/components/equity/allStaticEquities";
import EquityBody from "@/components/equity/equityBody";
import EquityDetails from "@/components/equity/equityDetails";
import EquitySelect from "@/components/equity/equitySelect";
import AllStaticIndexes from "@/components/index/allStaticIndexes";
import IndexBody from "@/components/index/indexBody";
import IndexDetails from "@/components/index/indexDetails";
import IndexSelect from "@/components/index/indexSelect";
import PageLayout from "@/components/pageLayout";
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
import { getEquity } from "@/lib/_equityActions";

import { getIndex, getIndexHsitoMaxDate2 } from "@/lib/_indexActions";

import React, { Suspense } from "react";

type EquityDetailPageProps = {
  params: {
    equityId: number;
  };
};

const EquityDetailPage = async ({ params }: EquityDetailPageProps) => {
  /*   const { data: session } = useSession();
   */
  const session = await auth();
  const usr: any = session?.user;

  const equityId = params.equityId;

  const resu = await getEquity(equityId);
  let data = resu?.data;

  let equity: any;

  if (resu?.data) {
    const res2 = await getIndexHsitoMaxDate2(equityId);
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
    //    console.log("ici 1", res2?.data?.close);

    equity = { ...tempo };
  }

  // console.log("Index: ", index);

  // console.log("comos", rs?.data);
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

  //console.log("Index", index);

  return (
    <div className="">
      {" "}
      <PageLayout wid="mx-2 md:mx-12">
        <div className="">
          <CustomBredcrumb
            name={`${equity?.assetName}`}
            parent="Equities"
            parentUrl="/admin/equities"
          />
          <div className="flex flex-col gap-2 uppercase my-4 text-3xl font-semibold text-sky-700 dark:text-sky-500">
            <div className="flex items-center gap-4">
              {equity?.assetName} {Flag(equity?.country?.flagCode)}
            </div>
          </div>
          <div className="grid md:grid-cols-12 gap-2 ">
            <Card className="md:col-span-2 py-4 bg-blue-950/30 ">
              <CardContent className="text-sm ">
                <EquityDetails equity={equity} />
              </CardContent>
            </Card>
            <Card className="md:col-span-5">
              <Suspense fallback={<Loading />}>
                <EquitySelect equity={equity} />
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
                        <EquityBody equityList={equity?.historicalDataEquity} />
                      </TableBody>
                    </Suspense>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 bg-blue-950/30 ">
              <CardHeader>
                <CardTitle>Other Equities</CardTitle>
              </CardHeader>
              <CardContent className="max-md:px-2">
                <ScrollArea className="h-[30rem] max-md:h-[20rem] pr-2 py-4">
                  <Suspense fallback={<Loading />}>
                    <AllStaticEquities />
                  </Suspense>
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

const Flag = async (flagCode: any) => {
  console.log("Flag", flagCode);

  let flag = "https://flagcdn.Com/w40/" + flagCode + ".png";
  if (flagCode == "zz") flag = "/continents/uemoa.gif";

  return (
    <div className=" rounded-full overflow-hidden">
      {flagCode && (
        <img src={flag} alt="Flag" style={{ width: "2rem", height: "2rem" }} />
      )}
    </div>
  );
};
