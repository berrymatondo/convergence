import React, { Suspense } from "react";
import HistoCommoItem from "./histoCommoItem";

type CommoBodyProps = {
  commoList: any;
};
const CommoBody = async ({ commoList }: CommoBodyProps) => {
  return (
    <>
      {commoList
        ?.sort((a: any, b: any) => Date.parse(b.date) - Date.parse(a.date))
        .map((histoCommo: any) => (
          <HistoCommoItem histoCommo={histoCommo} key={histoCommo.id} />
        ))}
    </>
  );
};

export default CommoBody;
