import React, { Suspense } from "react";
import HistoFxItem from "./histoFxItem";

type FxBodyProps = {
  fxList: any;
};

const FxBody = async ({ fxList }: FxBodyProps) => {
  console.log("fxl", fxList);

  return (
    <>
      {fxList
        ?.sort((a: any, b: any) => Date.parse(b.date) - Date.parse(a.date))
        .map((histoFx: any) => (
          <HistoFxItem histoFx={histoFx} key={histoFx.id} />
        ))}
    </>
  );
};

export default FxBody;
