import { auth } from "@/auth";
import Loading from "@/components/commo/loading";
import CustomBredcrumb from "@/components/customBreadcrumb";
import AllStaticFx from "@/components/fx/allStaticFx";
import FxBody from "@/components/fx/fxBody";
import FxDetails from "@/components/fx/fxDetails";
import FxSelect from "@/components/fx/fxSelect";
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

import { getFx, getFxHsitoMaxDate2 } from "@/lib/_fxActions";

import React, { Suspense } from "react";

type FxDetailPageProps = {
  params: {
    fxId: number;
  };
};

const FxDetailPage = async ({ params }: FxDetailPageProps) => {
  /*   const { data: session } = useSession();
   */
  const session = await auth();
  const usr: any = session?.user;

  const fxId = params.fxId;

  const resu = await getFx(fxId);
  let data = resu?.data;

  let fx: any;

  if (resu?.data) {
    const res2 = await getFxHsitoMaxDate2(fxId);
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
    console.log("ici 1", res2?.data?.close);

    fx = { ...tempo };
  }

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

  console.log("fx", fx);

  return (
    <div className="">
      {" "}
      <PageLayout wid="mx-2 md:mx-12">
        <div className="">
          <CustomBredcrumb
            name={`${fx?.currency1?.mic}/${fx?.currency2?.mic}`}
            parent="Fx Rates"
            parentUrl="/admin/fxrates"
          />
          <div className="flex flex-col gap-2 uppercase my-4 text-3xl font-semibold text-sky-700 dark:text-sky-500">
            <div className="flex items-center gap-4">
              <div className="flex">
                <div className="-mt-2 z-50 rounded-full bg-blue-900/30 p-1">
                  {Flag(fx?.country?.flagCode)}
                </div>
                <div className="-ml-3 z-50 rounded-full bg-blue-900/30 p-1">
                  {Flag(fx?.country2?.flagCode)}
                </div>
              </div>
              {fx?.currency1?.mic}/{fx?.currency2?.mic}
            </div>
            <span className="text-white text-xs">
              {fx?.currency1?.currency} / {fx?.currency2?.currency}
            </span>
          </div>
          <div className="grid md:grid-cols-12 gap-2 ">
            <Card className="md:col-span-2 py-4 bg-blue-950/30 ">
              <CardContent className="text-sm ">
                <FxDetails fx={fx} />
              </CardContent>
            </Card>
            <Card className="md:col-span-5">
              <Suspense fallback={<Loading />}>
                <FxSelect fx={fx} />
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
                        <FxBody fxList={fx?.historicalDataFx} />
                      </TableBody>
                    </Suspense>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 bg-blue-950/30 ">
              <CardHeader>
                <CardTitle>Other Fx Rates</CardTitle>
              </CardHeader>
              <CardContent className="max-md:px-2">
                <ScrollArea className="h-[30rem] max-md:h-[20rem] pr-2 py-4">
                  <Suspense fallback={<Loading />}>
                    <AllStaticFx />
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

export default FxDetailPage;

const Flag = async (flagCode: any) => {
  let flag = "https://flagcdn.Com/w40/" + flagCode + ".png";
  if (flagCode == "zz") flag = "/continents/uemoa.gif";

  return (
    <div className=" -mb-4 rounded-full overflow-hidden">
      {flagCode && (
        <img
          src={flag}
          alt="Flag"
          style={{ width: "1.5rem", height: "1.5rem" }}
        />
      )}
    </div>
  );
};
