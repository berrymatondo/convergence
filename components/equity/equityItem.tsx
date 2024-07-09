"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";

type EquityItemProps = {
  equity: any;
};
const EquityItem = ({ equity }: EquityItemProps) => {
  const router = useRouter();
  return (
    <TableRow
      onClick={() => router.push(`/admin/equities/${equity.id}`)}
      className="hover:cursor-pointer"
      key={equity.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        {equity.assetName}
      </TableCell>
      <TableCell className="max-md:hidden">{equity.isin}</TableCell>
      <TableCell className="max-md:hidden">{equity.currency}</TableCell>
      <TableCell className="max-md:hidden">{equity.country}</TableCell>
      <TableCell>{equity.sector}</TableCell>
      <TableCell>{equity.acf}</TableCell>
      <TableCell>{equity.ric}</TableCell>
      <TableCell>{equity.ticker}</TableCell>
      <TableCell className="text-right">{equity.symbol}</TableCell>
    </TableRow>
  );
};

export default EquityItem;
