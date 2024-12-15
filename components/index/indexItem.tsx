import React from "react";
import { Badge } from "../ui/badge";
import { TrendingDown, TrendingUp } from "lucide-react";
import { getIndexHsitoMaxDate } from "@/lib/_indexActions";
import Link from "next/link";

type IndexItemProps = {
  index: any;
};
const IndexItem = ({ index }: IndexItemProps) => {
  return (
    <Link
      key={index.id}
      href={`/admin/indexes/${index.id}`}
      className="hover:bg-blue-950/70 hover:cursor-pointer flex flex-col justify-between gap-4 bg-blue-950/30 border-2 p-2 mt-2 rounded-lg"
    >
      <p className="text-sky-400 text-sm max-md:font-semibold md:text-xl ">
        {index?.assetName}
      </p>

      <div className=" gap-4 flex flex-col justify-end">
        <div className="flex items-baseline md:gap-2 max-md:flex-col-reverse">
          <Close id={index.id} />
          <Change id={index.id} />
        </div>

        <div className="flex gap-2 items-center text-xs text-sky-400">
          {Flag(index?.country?.flagCode)}
          {index?.country?.name.replaceAll("_", " ")}
        </div>
      </div>
    </Link>
  );
};

export default IndexItem;

const Change = async ({ id }: any) => {
  const res = await getIndexHsitoMaxDate(id);
  const data = res?.data;

  if (data?.close?.change) {
    if (+data?.close?.change < 0)
      return (
        <p className="text-xs md:text-sm flex items-center  text-red-600 font-semibold">
          {data?.close?.change.toFixed(2)} <TrendingDown className="ml-2" />
        </p>
      );
    else
      return (
        <p className="text-xs md:text-sm flex items-center  text-green-600 font-semibold">
          +{data?.close?.change.toFixed(2)} <TrendingUp className="ml-2" />
        </p>
      );
  } else return <p></p>;
};

const Close = async ({ id }: any) => {
  const res = await getIndexHsitoMaxDate(id);
  const data = res?.data;

  if (data?.close?.close) {
    return (
      <p className="text-orange-600 my-1 text-2xl md:text-3xl font-semibold">
        {data?.close?.close.toFixed(2)}
      </p>
    );
  } else return <p></p>;
};

const Flag = async (flagCode: any) => {
  let flag = "https://flagcdn.Com/w40/" + flagCode + ".png";
  if (flagCode == "zz") flag = "/continents/uemoa.gif";

  return (
    <div className=" rounded-full overflow-hidden">
      {flagCode && (
        <img
          src={flag}
          alt="Flag"
          style={{ width: "1.5rem", height: "1.5rem" }}
        />
      )}
    </div>
  );
};
