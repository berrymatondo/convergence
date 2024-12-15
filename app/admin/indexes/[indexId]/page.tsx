import { auth } from "@/auth";
import Loading from "@/components/commo/loading";
import CustomBredcrumb from "@/components/customBreadcrumb";
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

import { getIndex, getIndexHsitoMaxDate2 } from "@/lib/_indexActions";

import React, { Suspense } from "react";

type IndexDetailPageProps = {
  params: {
    indexId: number;
  };
};

const IndexDetailPage = async ({ params }: IndexDetailPageProps) => {
  /*   const { data: session } = useSession();
   */
  const session = await auth();
  const usr: any = session?.user;

  const indexId = params.indexId;

  const resu = await getIndex(indexId);
  let data = resu?.data;

  let index: any;

  if (resu?.data) {
    const res2 = await getIndexHsitoMaxDate2(indexId);
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

    index = { ...tempo };
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
            name={`${index?.assetName}`}
            parent="Indexes"
            parentUrl="/admin/indexes"
          />
          <div className="flex flex-col gap-2 uppercase my-4 text-3xl font-semibold text-sky-700 dark:text-sky-500">
            <div className="flex items-center gap-4">
              {index?.assetName} {Flag(index?.country?.flagCode)}
            </div>
          </div>
          <div className="grid md:grid-cols-12 gap-2 ">
            <Card className="md:col-span-2 py-4 bg-blue-950/30 ">
              <CardContent className="text-sm ">
                <IndexDetails index={index} />
              </CardContent>
            </Card>
            <Card className="md:col-span-5">
              <Suspense fallback={<Loading />}>
                <IndexSelect index={index} />
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
                        <IndexBody indexList={index?.historicalDataIndex} />
                      </TableBody>
                    </Suspense>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>
            <Card className="md:col-span-2 bg-blue-950/30 ">
              <CardHeader>
                <CardTitle>Other Indexes</CardTitle>
              </CardHeader>
              <CardContent className="max-md:px-2">
                <ScrollArea className="h-[30rem] max-md:h-[20rem] pr-2 py-4">
                  <Suspense fallback={<Loading />}>
                    <AllStaticIndexes />
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

export default IndexDetailPage;

const Flag = async (flagCode: any) => {
  // console.log("Flag", flagCode);

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
