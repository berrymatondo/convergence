import React from "react";
import { TableCell, TableRow } from "../ui/table";
import Link from "next/link";

type FundItemProps = {
  fund: any;
};
const FundItem = ({ fund }: FundItemProps) => {
  //if (fund.id == "24") console.log("fund?. ", fund);

  const getPromoters = (listPromo: any) => {
    let res: any = [];
    for (let i = 0; i < listPromo?.length; i++) {
      res.push(listPromo[i]?.promoter + ",");
    }
    //console.log("RES: ", res);

    return res;
  };
  return (
    <TableRow
      //onClick={() => router.push(`/admin/funds/${fund.id}`)}
      className="hover:cursor-pointer"
      key={fund.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        <Link href={`/admin/funds/${fund.id}`}> {fund.name}</Link>
      </TableCell>
      <TableCell className="max-md:hidden">{fund.isin}</TableCell>
      <TableCell>{fund.lipperClassificationScheme}</TableCell>
      <TableCell>
        <div className="flex gap-2 items-center">
          {Flag(fund?.country?.flagCode)}
          {fund.country.name.replaceAll("_", " ")}
        </div>
      </TableCell>
      <TableCell>{fund.currency.mic}</TableCell>
      <TableCell>{fund.exchange}</TableCell>
      <TableCell className="text-left">
        {getPromoters(fund.fundPromotersMapping)}
      </TableCell>
    </TableRow>
  );
};

export default FundItem;

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
