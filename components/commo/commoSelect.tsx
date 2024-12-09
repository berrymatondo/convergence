"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { getHistoricalDataFx } from "@/lib/_fxActions";
import Loading from "../commo/loading";
import { periods } from "@/lib/enum";
import {
  getCommoHsitoMaxDate,
  getCommoHsitoPeriodDate,
} from "@/lib/_commoActions";
type CommoSelectProps = {
  commo: any;
  commos: any;
};
import CommoViews from "@/components/commo/commoViews";
import { usePathname } from "next/navigation";
const CommoSelect = ({ commo, commos }: CommoSelectProps) => {
  //console.log("commo", commo);
  //console.log("commos", commos);

  // console.log("fnd: ", fnd);
  const pathname = usePathname();
  //console.log("pathname:", pathname?.split("commodities/")[1]);

  const [selectedOption, setSelectedOption] = useState("4");
  const [com, setCom] = useState<any>([]);
  const id = +pathname?.split("commodities/")[1];

  useEffect(() => {
    const fetchHistoFx = async () => {
      // console.log("selectedOption", selectedOption);
      // console.log("commo", commo?.id);

      const res3 = await getCommoHsitoPeriodDate(id, +selectedOption);

      //console.log(res3?.data);
      const histoVar: any = [];
      if (res3?.data)
        if (res3?.data?.length > 0) {
          for (let i = 0; i < res3?.data?.length; i++) {
            histoVar.push({
              date: res3?.data[i].date,
              close: res3?.data[i].close.toFixed(2),
            });

            setCom(histoVar);
          }
        } else setCom([]);

      //const data2 = res2?.data?.close;
      // console.log("data2", res2?.data);
      //console.log("data2", data);
      /* 
      const tempo: any = {
        ...data,
        last: res2?.data?.close,
        close1: res2?.data?.close1,
        close5: res2?.data?.close5,
        close20: res2?.data?.close20,
        close60: res2?.data?.close60,
        close252: res2?.data?.close252,
      };
 */
      /*       const fnd2 = fxList?.find(
        (el: any) =>
          el.staticInfoFx?.currency1?.mic == selectedOption.substring(0, 3) &&
          el.staticInfoFx?.currency2?.mic == selectedOption.substring(4, 7)
      );

      if (fnd2) {
        const res = await getHistoricalDataFx(fnd2?.staticInfoFxId);
        //console.log(res?.data);
        const histoVar: any = [];
        if (res?.data)
          if (res?.data?.length > 0) {
            for (let i = 0; i < res?.data?.length; i++) {
              histoVar.push({
                date: res?.data[i].date,
                close: res?.data[i].close.toFixed(2),
              });

              setFxs(histoVar);
            }
          } else setFxs([]);
      } */
    };
    fetchHistoFx();
  }, [selectedOption]);

  return (
    <Card className="md:col-span-1 h-full ">
      <CardHeader>
        <CardTitle className="text-sky-700 dark:text-sky-500">
          <Select
            value={selectedOption}
            //value={tmm}
            onValueChange={(value) => {
              setSelectedOption(value);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {periods.map((el: any) => (
                  <SelectItem key={el.id} value={el.id}>
                    {el.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-md:px-0">
        <Suspense fallback={<Loading />}>
          <CommoViews commo={com} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default CommoSelect;
