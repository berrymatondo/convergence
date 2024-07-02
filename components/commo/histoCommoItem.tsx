"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";

type HistoCommoItemProps = {
  histoCommo: any;
};
const HistoCommoItem = ({ histoCommo }: HistoCommoItemProps) => {
  const router = useRouter();
  return (
    <TableRow
      onClick={() => router.push(`/admin/commodities/${histoCommo.id}`)}
      className="hover:cursor-pointer"
      key={histoCommo.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        {histoCommo.date}
      </TableCell>
      <TableCell className="text-center">
        {histoCommo.close.toFixed(3)}
      </TableCell>
      <TableCell className="text-center">
        {histoCommo.change.toFixed(3)}
      </TableCell>

      <TableCell className="text-right">
        {histoCommo.changePercentage.toFixed(3)} %
      </TableCell>
    </TableRow>
  );
};

export default HistoCommoItem;
