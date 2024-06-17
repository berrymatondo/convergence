import React from "react";
import AreaCharYieldCurve from "./yieldCurveGraphe";
import { getYCByContinent } from "@/lib/_goActions";
import { getCountry } from "@/lib/_countryActions";

type YiedlGRapheProps = {
  continent: any;
  countryId: any;
};

const YiedlGraphe = async ({ continent, countryId }: YiedlGRapheProps) => {
  const conti = continent.split("/")[0];
  const res = await getYCByContinent(conti);
  const data1 = res?.data;

  const res2 = await getCountry(countryId);
  const data2 = res2?.data;
  const country = data2?.name as string;

  /*   console.log("conti:", conti);
  console.log("countryId:", countryId);

  console.log("data1: ", data1);
  console.log("data2: ", data2); */

  let data = [];
  if (data1)
    for (let i = 0; i < data1.length; i++) {
      data.push({
        tenor: data1[i].tenor,
        [country]: data1[i].yield,
        [conti]: data1[i].yield + 1,
      });
    }

  //console.log("data: ", data);

  return (
    <div className="w-full">
      <AreaCharYieldCurve data={data} />
    </div>
  );
};

export default YiedlGraphe;
