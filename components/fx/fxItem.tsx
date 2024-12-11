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
      <p className="text-sky-400 text-lg md:text-xl ">
        {fx?.currency1?.currency}
      </p>

      <div className=" gap-4 flex flex-col justify-end">
        <Change id={fx.id} />
        <Close id={fx.id} />

        <div className="flex gap-2 items-center text-xs text-sky-400">
          {Flag(fx?.country2?.flagCode)}
          {fx?.country2?.name.replaceAll("_", " ")}
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
  const res = await getFXHsitoMaxDate(id);
  const data = res?.data;

  if (data?.close?.close) {
    return (
      <p className="text-orange-600 my-1 max-md:text-3xl text-5xl font-semibold">
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
