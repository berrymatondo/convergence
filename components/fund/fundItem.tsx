"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";

type FundItemProps = {
  fund: any;
};
const FundItem = ({ fund }: FundItemProps) => {
  const router = useRouter();
  //if (fund.id == "24") console.log("fund?. ", fund);

  const getPromoters = (listPromo: any) => {
    let res: any = [];
    for (let i = 0; i < listPromo.length; i++) {
      res.push(listPromo[i].promoter + ",");
    }
    //console.log("RES: ", res);

    return res;
  };
  return (
    <TableRow
      onClick={() => router.push(`/admin/funds/${fund.id}`)}
      className="hover:cursor-pointer"
      key={fund.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        {fund.name}
      </TableCell>
      <TableCell className="max-md:hidden">{fund.isin}</TableCell>
      <TableCell>{fund.lipperClassificationScheme}</TableCell>
      <TableCell>{fund.country.name}</TableCell>
      <TableCell>{fund.currency.mic}</TableCell>
      <TableCell>{fund.exchange}</TableCell>
      <TableCell className="text-left">
        {getPromoters(fund.fundPromotersMapping)}
      </TableCell>
    </TableRow>
  );
};

export default FundItem;
