import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getEquityHsitoMaxDate } from "@/lib/_equityActions";

type EquityItemPRops = {
  equity: any;
};
const EquityItem = ({ equity }: EquityItemPRops) => {
  return (
    <Link
      key={equity.id}
      href={`/admin/equities/${equity.id}`}
      className="hover:bg-blue-950/70 hover:cursor-pointer flex flex-col justify-between gap-4 bg-blue-950/30 border-2 p-2 mt-2 rounded-lg"
    >
      <p className="text-sky-400 text-lg md:text-xl ">{equity?.assetName}</p>

      <div className=" gap-4 flex flex-col justify-end">
        <Change id={equity.id} />
        <Close id={equity.id} />

        <div className="flex gap-2 items-baseline text-xs text-sky-400">
          {Flag(equity?.country?.flagCode)}
          {equity?.country?.name.replaceAll("_", " ")}
        </div>
      </div>
    </Link>
  );
};

export default EquityItem;

const Change = async ({ id }: any) => {
  const res = await getEquityHsitoMaxDate(id);
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
  const res = await getEquityHsitoMaxDate(id);
  const data = res?.data;

  if (data?.close?.close) {
    return (
      <p className="text-orange-600 my-1 text-3xl md:text-5xl font-semibold">
        {data?.close?.close}
      </p>
    );
  } else return <p></p>;
};

const Flag = async (flagCode: any) => {
  let flag = "https://flagcdn.Com/w40/" + flagCode + ".png";
  if (flagCode == "zz") flag = "/continents/uemoa.gif";

  return (
    <div>
      {flagCode && <img src={flag} alt="Flag" style={{ width: "1.5rem" }} />}
    </div>
  );
};

/* "use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";

type EquityItemProps = {
  equity: any;
};
const EquityItem = ({ equity }: EquityItemProps) => {
  const router = useRouter();

  //console.log("equity", equity);

  return (
    <TableRow
      onClick={() => router.push(`/admin/equities/${equity.id}`)}
      className="hover:cursor-pointer"
      key={equity.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        {equity.assetName}
      </TableCell>
      <TableCell className="max-md:text-xs">{equity.isin}</TableCell>
      <TableCell className="max-md:text-xs">{equity.currency}</TableCell>
      <TableCell className="max-md:hidden">{equity.country}</TableCell>
      <TableCell className="max-md:text-xs max-md:text-right">
        {equity.sector}
      </TableCell>
      <TableCell className="max-md:hidden">{equity.acf}</TableCell>
      <TableCell className="max-md:hidden">{equity.ric}</TableCell>
      <TableCell className="max-md:hidden">{equity.ticker}</TableCell>
      <TableCell className="text-right max-md:hidden">
        {equity.symbol}
      </TableCell>
    </TableRow>
  );
};

export default EquityItem;
 */
