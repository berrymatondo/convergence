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
import { metrics, periods } from "@/lib/enum";
import {
  computeMetrics,
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

  let item = periods.find((i: any) => i.id === "5");
  //console.log("item", item);
  let perss: any = [];
  if (item?.days) {
    for (let i = 1; i <= item?.days; i++) perss.push({ id: i });
  }
  //console.log("pers", perss);

  const [selectedOption, setSelectedOption] = useState("3");
  const [com, setCom] = useState<any>([]);
  const [per, setPer] = useState<any>(perss);
  const [selPer, setSelPer] = useState<any>();
  const [selMet, setSelMet] = useState<any>(null);
  const [graph2, setGraph2] = useState<any>([]);
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

      // MEtrics

      // Periods
      console.log("selMet", selMet);

      if (!selMet || selMet == "-") setSelPer(null);

      if (selMet) {
        let item1 = periods.find((i: any) => i.id === selectedOption);
        let pers: any = [];
        if (item1?.days) {
          for (let i = 1; i <= item1?.days; i++) pers.push({ id: i });
          setPer(pers);
        }

        if (selPer && selMet != "-") {
          const res4 = await computeMetrics(selMet, com, selPer);
          if (res4?.data) setGraph2(res4?.data);
        }
      }
    };
    fetchHistoFx();
  }, [selectedOption, selPer]);

  return (
    <Card className="md:col-span-1 h-full ">
      <CardHeader>
        <CardTitle className="gap-2 text-sky-700 dark:text-sky-500 flex justify-end">
          <Select
            value={selectedOption}
            //value={tmm}
            onValueChange={(value) => {
              setSelectedOption(value);
              setSelMet("-");
              setSelPer("");
              setGraph2([]);
            }}
          >
            <SelectTrigger className="w-[100px]">
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

          <Select
            value={selMet}
            //value={tmm}
            onValueChange={(value) => {
              setSelMet(value);
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {metrics?.map((el: any) => (
                  <SelectItem key={el.id} value={el.label}>
                    {el.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {selMet?.length > 1 && (
            <Select
              value={selPer}
              //value={tmm}
              onValueChange={(value) => {
                setSelPer(value);
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {per?.map((el: any) => (
                    <SelectItem key={el.id} value={el.id}>
                      {el.id}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="max-md:px-0">
        <Suspense fallback={<Loading />}>
          <CommoViews commo={com} commo2={graph2} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default CommoSelect;
