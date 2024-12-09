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
import { getHistoricalDataIndex } from "@/lib/_equityActions";
import IndexCountryView from "../index/indexCountryView";
import Loading from "../commo/loading";
type EquityCountryProps = {
  equityList: any;
};
const EquityCountry = ({ equityList }: EquityCountryProps) => {
  // console.log("lisr  ", equityList);

  const [selectedOption, setSelectedOption] = useState(
    equityList[0]?.staticInfoIndex?.assetName
  );
  const [equities, setEquities] = useState<any>([]);

  useEffect(() => {
    const fetchHistoEquity = async () => {
      const fnd2 = equityList?.find(
        (el: any) => el.staticInfoIndex?.assetName == selectedOption
      );

      if (fnd2) {
        //console.log("fnd2?.staticInfoFxId)", fnd2);

        const res = await getHistoricalDataIndex(fnd2?.staticInfoIndexId);
        //console.log(res?.data);
        const histoVar: any = [];
        if (res?.data)
          if (res?.data?.length > 0) {
            for (let i = 0; i < res?.data?.length; i++) {
              histoVar.push({
                date: res?.data[i].date,
                close: res?.data[i].close,
              });

              setEquities(histoVar);
            }
          } else setEquities([]);
      }
    };
    fetchHistoEquity();
  }, [selectedOption, equityList]);

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
                {equityList.map((el: any) => (
                  <SelectItem
                    key={el?.staticInfoIndex?.assetName}
                    value={el?.staticInfoIndex?.assetName}
                  >
                    {" "}
                    <p key={el.staticInfoFxId}>
                      {el?.staticInfoIndex?.assetName}
                    </p>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Loading />}>
          <IndexCountryView equities={equities} />
        </Suspense>
      </CardContent>
    </Card>
  );
};

export default EquityCountry;
