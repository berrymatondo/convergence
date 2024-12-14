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
import Loading from "../commo/loading";
import { metrics, periods } from "@/lib/enum";
type IndexSelectProps = {
  index: any;
};
import { usePathname } from "next/navigation";
import { Label } from "../ui/label";
import IndexViews from "./indexViews";
import { getIndexHsitoPeriodDate } from "@/lib/_indexActions";
const IndexSelect = ({ index }: IndexSelectProps) => {
  const pathname = usePathname();

  //console.log("pathname:", pathname?.split("commodities/")[1]);

  let item = periods.find((i: any) => i.id === "3");
  //console.log("item", item);
  let perss: any = [];
  if (item?.days) {
    for (let i = 1; i <= item?.days; i++) perss.push({ id: i });
  }
  //console.log("pers", perss);

  const [selectedOption, setSelectedOption] = useState("3");
  const [com, setCom] = useState<any>([]);
  const id = index?.id ? index?.id : +pathname?.split("indexes/")[1];

  useEffect(() => {
    const fetchHistoIndex = async () => {
      const res3 = await getIndexHsitoPeriodDate(id, +selectedOption);

      const histoVar: any = [];
      if (res3?.data)
        if (res3?.data?.length > 0) {
          for (let i = 0; i < res3?.data?.length; i++) {
            histoVar.push({
              date: res3?.data[i].date.split("-").reverse().join("/"),
              close: res3?.data[i].close.toFixed(2),
            });

            setCom(histoVar);
          }
        } else setCom([]);
    };
    fetchHistoIndex();
  }, [selectedOption]);

  return (
    <Card className="md:col-span-1 h-full ">
      <CardHeader>
        <CardTitle className="flex  gap-2 text-sky-700 dark:text-sky-500 justify-end">
          <div className="flex flex-col gap-2">
            <Label className="text-white">Tenor</Label>
            <Select
              value={selectedOption}
              //value={tmm}
              onValueChange={(value) => {
                setSelectedOption(value);
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
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="max-md:px-0">
        <Suspense fallback={<Loading />}>
          <IndexViews index={com} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default IndexSelect;
