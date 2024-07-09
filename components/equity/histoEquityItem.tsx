"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";

type HistoEquityItemProps = {
  histoEquity: any;
};
const HistoEquityItem = ({ histoEquity }: HistoEquityItemProps) => {
  const router = useRouter();
  return (
    <TableRow
      onClick={() => router.push(`/admin/equities/${histoEquity.id}`)}
      className="hover:cursor-pointer"
      key={histoEquity.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        {histoEquity.date}
      </TableCell>
      <TableCell className="text-center">
        {histoEquity.close.toFixed(3)}
      </TableCell>
      <TableCell className="text-center">
        {histoEquity.change.toFixed(3)}
      </TableCell>

      <TableCell className="text-right">
        {histoEquity.changePercentage.toFixed(3)} %
      </TableCell>
    </TableRow>
  );
};

export default HistoEquityItem;
