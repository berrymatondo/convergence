import React, { Suspense } from "react";
import HistoIndexItem from "../index/histoIndexItem";

type IndexBodyProps = {
  equityList: any;
};

const EquityBody = async ({ equityList }: IndexBodyProps) => {
  //console.log("fxl", fxList);

  return (
    <>
      {equityList
        ?.sort((a: any, b: any) => Date.parse(b.date) - Date.parse(a.date))
        .map((histoIndex: any) => (
          <HistoIndexItem histoIndex={histoIndex} key={histoIndex.id} />
        ))}
    </>
  );
};

export default EquityBody;
