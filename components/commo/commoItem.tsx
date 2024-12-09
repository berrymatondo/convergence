import { getCommoHsitoMaxDate } from "@/lib/_commoActions";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { TrendingDown, TrendingUp } from "lucide-react";

type CommoItemProps = {
  commo: any;
};
const CommoItem = ({ commo }: CommoItemProps) => {
  return (
    <Link
      key={commo.id}
      href={`/admin/commodities/${commo.id}`}
      className="hover:bg-blue-950/70 hover:cursor-pointer flex flex-col justify-between gap-4 bg-blue-950/30 border-2 p-2 mt-2 rounded-lg"
    >
      <p className="text-sky-400 text-xl md:ext-2xl ">{commo?.assetName}</p>

      <div className=" gap-4  flex flex-col justify-end">
        <Change id={commo.id} />
        <Close id={commo.id} />

        <div className=" text-xs text-sky-400">{commo?.sector}</div>
      </div>
    </Link>
  );
};

export default CommoItem;

const Change = async ({ id }: any) => {
  const res = await getCommoHsitoMaxDate(id);
  const data = res?.data;

  if (data?.close?.change) {
    if (+data?.close?.change < 0)
      return (
        <p className="flex items-center  text-red-600 font-semibold">
          {data?.close?.change.toFixed(2)} <TrendingDown className="ml-2" />
        </p>
      );
    else
      return (
        <p className="flex items-center  text-green-600 font-semibold">
          +{data?.close?.change.toFixed(2)} <TrendingUp className="ml-2" />
        </p>
      );
  } else return <p></p>;
};

const Close = async ({ id }: any) => {
  const res = await getCommoHsitoMaxDate(id);
  const data = res?.data;

  if (data?.close?.close) {
    return (
      <p className="text-orange-600 my-1 text-3xl md:text-5xl font-semibold">
        {data?.close?.close.toFixed(2)}
      </p>
    );
  } else return <p></p>;
};
