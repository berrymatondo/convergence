import React from "react";
import { Badge } from "../ui/badge";
import { TrendingDown, TrendingUp } from "lucide-react";
import { getIndexHsitoMaxDate } from "@/lib/_indexActions";
import Link from "next/link";
import { getFXHsitoMaxDate } from "@/lib/_fxActions";

type FxItemProps = {
  fx: any;
};
const FxItem = ({ fx }: FxItemProps) => {
  //console.log("Fx", fx);

  return (
    <Link
      key={fx.id}
      href={`/admin/fxrates/${fx.id}`}
      className="hover:bg-blue-950/70 hover:cursor-pointer flex flex-col justify-between gap-4 bg-blue-950/30 border-2 p-2 mt-2 rounded-lg"
    >
      <div className=" grid grid-cols-4">
        {/*         <div className="flex gap-2 items-center text-xs text-sky-400">
          {Flag(fx?.country?.flagCode)}
          {fx?.country?.name.replaceAll("_", " ")}
        </div> */}

        <div className="col-span-1 -mb-10 flex items-center text-xs text-sky-400">
          <div className="z-50 rounded-full bg-blue-900/30 p-1">
            {Flag(fx?.country2?.flagCode)}
          </div>
          <div className="-ml-8 -mt-16">{Flag(fx?.country?.flagCode)}</div>
          {/*           {fx?.country2?.name.replaceAll("_", " ")}
           */}{" "}
        </div>
        <div className="col-span-3 flex flex-col justify-end items-end">
          <Badge className="bg-white/10 mb-2 text-sky-400 text-lg md:text-xl ">
            {fx?.currency1?.mic}/{fx?.currency2?.mic}
          </Badge>
          <div className="flex  items-baseline gap-2">
            <Close id={fx.id} />
            <Change id={fx.id} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FxItem;

const Change = async ({ id }: any) => {
  const res = await getFXHsitoMaxDate(id);
  const data = res?.data;

  if (data?.close?.change) {
    if (+data?.close?.change < 0)
      return (
        <p className="text-xs flex items-center  text-red-600 font-semibold">
          {data?.close?.change.toFixed(2)}{" "}
          <TrendingDown size={20} className="ml-2" />
        </p>
      );
    else
      return (
        <p className="text-xs flex items-center  text-green-600 font-semibold">
          +{data?.close?.change.toFixed(2)}{" "}
          <TrendingUp size={20} className="ml-2" />
        </p>
      );
  } else return <p></p>;
};

const Close = async ({ id }: any) => {
  const res = await getFXHsitoMaxDate(id);
  const data = res?.data;

  if (data?.close?.close) {
    return (
      <p className=" text-orange-600 mb-1 max-md:text-3xl text-4xl font-semibold">
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
        <img src={flag} alt="Flag" style={{ width: "3rem", height: "3rem" }} />
      )}
    </div>
  );
};

/* "use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";

type FxItemProps = {
  fx: any;
};
const FxItem = ({ fx }: FxItemProps) => {
  const router = useRouter();
  // console.log("fx", fx);

  return (
    <TableRow
      onClick={() => router.push(`/admin/fxrates/${fx?.id}`)}
      className="hover:cursor-pointer"
      key={fx?.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        {fx?.country?.name}
      </TableCell>
      <TableCell className="max-md:hidden">
        {fx?.currency1?.mic}/{fx?.currency2?.mic}
      </TableCell>
      <TableCell>{fx?.currency1?.currency}</TableCell>
      <TableCell>{fx?.currency2?.currency}</TableCell>
      <TableCell>{fx?.ticker}</TableCell>
      <TableCell className="text-right">{fx?.ric}</TableCell>
    </TableRow>
  );
};

export default FxItem;
 */
