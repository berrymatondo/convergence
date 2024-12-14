import React, { Suspense } from "react";
import HistoIndexItem from "./histoIndexItem";

type IndexBodyProps = {
  indexList: any;
};

const IndexBody = async ({ indexList }: IndexBodyProps) => {
  //console.log("fxl", fxList);

  return (
    <>
      {indexList
        ?.sort((a: any, b: any) => Date.parse(b.date) - Date.parse(a.date))
        .map((histoIndex: any) => (
          <HistoIndexItem histoIndex={histoIndex} key={histoIndex.id} />
        ))}
    </>
  );
};

export default IndexBody;
