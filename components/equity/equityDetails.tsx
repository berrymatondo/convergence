import React, { Suspense } from "react";
import Loading from "../commo/loading";
import { Separator } from "../ui/separator";

type EquityDetailsProps = {
  equity: any;
};
const EquityDetails = ({ equity }: EquityDetailsProps) => {
  // console.log("Index", equity);
  //console.log("Fx ", index?.last?.close);

  return (
    <div>
      <p className="w-full flex items-center justify-between gap-2 mb-2">
        <span className="text-xl text-orange-700 dark:text-orange-500">
          {equity?.currency?.mic}
        </span>
        {/*         {fx?.currency?.mic && (
         */}{" "}
        <span className="text-5xl text-orange-700 dark:text-orange-500">
          {+equity?.last?.close.toFixed(2)}
        </span>
        {/*         )}{" "}
         */}{" "}
      </p>

      <p className=" w-full flex items-center justify-end gap-2 mb-2">
        <span
          className={
            +equity?.last?.change < 0 ? `text-red-600` : "text-green-600"
          }
        >
          {+equity?.last?.change > 0 ? "+" : ""}
          {equity?.last?.change?.toFixed(2)}
        </span>
        <span
          className={
            +equity?.last?.change < 0 ? `text-red-600` : "text-green-600"
          }
        >
          {+equity?.last?.change > 0 ? "+" : ""}
          {equity?.last?.changePercentage?.toFixed(2)} %
        </span>
      </p>
      <div className=" w-full flex items-center justify-between gap-2">
        <p className="gap-4 flex justify-between">
          {new Date(equity?.last?.date.toString()).toDateString()}
          <span>CDT</span>
        </p>
      </div>
      <div className="mt-2 space-y-1 w-full flex flex-col items-start justify-start gap-2">
        <span className="text-lg">Delayted quote</span>
        <Separator />
      </div>
      <div className="mt-2 space-y-1 w-full flex flex-col items-start justify-start gap-2">
        <span className="text-xl font-semibold text-orange-700 dark:text-orange-500">
          Key Data
        </span>
      </div>

      <p className=" mb-2 w-full flex  flex-col items-start  justify-between gap-2">
        <span className="text-gray-400">Previous close:</span>
        <span className="text-2xl font-semibold text-sky-700 dark:text-sky-500">
          {equity?.close1?.close.toFixed(2)}
        </span>
      </p>
      <Separator className="text-orange-500" />
      <div className=" mb-2 w-full flex  flex-col items-start justify-between gap-2">
        <span className="text-gray-400">Day Range</span>
        <p>
          <span className="text-2xl font-semibold text-sky-700 dark:text-sky-500">
            {equity?.close1?.close.toFixed(2)}
          </span>
          {" - "}
          <span className="text-2xl font-semibold text-sky-700 dark:text-sky-500">
            {equity?.last?.close.toFixed(2)}
          </span>
        </p>
      </div>
      <Separator className="text-orange-500" />
      <div className=" mt-2 w-full flex  flex-col items-start  justify-between gap-2">
        <span className="text-gray-400">52 Wk Range</span>
        <p>
          {" "}
          <span className="text-2xl font-semibold text-sky-700 dark:text-sky-500">
            {equity?.close252?.close.toFixed(2)}
          </span>
          {" - "}
          <span className="text-2xl font-semibold text-sky-700 dark:text-sky-500">
            {equity?.last?.close.toFixed(2)}
          </span>
        </p>
      </div>
      <div className="mt-2 space-y-1 w-full flex flex-col items-start justify-start gap-2">
        <span className="text-xl font-semibold text-orange-700 dark:text-orange-500">
          Performance
        </span>
        <Separator className="text-orange-500" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="mt-2 w-full flex items-start  justify-between gap-2">
          <span className="">5 Day:</span>
          <span className="text-sky-700 dark:text-sky-500">
            {(
              (+equity?.last?.close / +equity?.close5?.close - 1) *
              100
            ).toFixed(2)}{" "}
            %
          </span>
        </p>
        <p className=" w-full flex items-start justify-between gap-2">
          <span className="">1 Month:</span>
          <span className="text-sky-700 dark:text-sky-500">
            {(
              (+equity?.last?.close / +equity?.close20?.close - 1) *
              100
            ).toFixed(2)}{" "}
            %
          </span>
        </p>
        <p className=" w-full flex   items-start justify-between gap-2">
          <span className="">3 Month:</span>
          <span className="text-sky-700 dark:text-sky-500">
            {(
              (+equity?.last?.close / +equity?.close60?.close - 1) *
              100
            ).toFixed(2)}{" "}
            %
          </span>
        </p>
        <p className=" w-full flex  items-start justify-between gap-2">
          <span className="">1 Year:</span>
          <span className="text-sky-700 dark:text-sky-500">
            {(
              (+equity?.last?.close / +equity?.close252?.close - 1) *
              100
            ).toFixed(2)}{" "}
            %
          </span>
        </p>
      </div>
    </div>
  );
};

export default EquityDetails;
