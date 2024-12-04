"use client";
import React, { useEffect, useState } from "react";
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
import FxCountryView from "./fxCountryView";
type FxCountryProps = {
  fxList: any;
  countryIndexMapping: any;
};
const FxCountry = ({ fxList, countryIndexMapping }: FxCountryProps) => {
  const fnd = fxList?.find(
    (el: any) => el.staticInfoFx?.currency1?.mic == "USD"
  );

  const tmm =
    fnd.staticInfoFx?.currency1?.mic +
    "/" +
    fnd.staticInfoFx?.currency2?.mic +
    " SPOT";

  const [selectedOption, setSelectedOption] = useState(tmm);
  const [fxs, setFxs] = useState<any>([]);

  useEffect(() => {
    const fetchHistoFx = async () => {
      const fnd2 = fxList?.find(
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
                close: res?.data[i].close,
              });

              setFxs(histoVar);
            }
          } else setFxs([]);
      }
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
                {fxList.map((el: any) => (
                  <SelectItem
                    key={
                      el.staticInfoFx?.currency1?.mic +
                      "/" +
                      el.staticInfoFx?.currency2?.mic +
                      " SPOT"
                    }
                    value={
                      el.staticInfoFx?.currency1?.mic +
                      "/" +
                      el.staticInfoFx?.currency2?.mic +
                      " SPOT"
                    }
                  >
                    {" "}
                    <p key={el.staticInfoFxId}>
                      {el.staticInfoFx?.currency1?.mic +
                        "/" +
                        el.staticInfoFx?.currency2?.mic}{" "}
                      SPOT
                    </p>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <FxCountryView fxs={fxs} />
      </CardContent>
    </Card>
  );
};

export default FxCountry;
