"use client";
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
