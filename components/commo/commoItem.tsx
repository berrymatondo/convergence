"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";

type CommoItemProps = {
  commo: any;
};
const CommoItem = ({ commo }: CommoItemProps) => {
  const router = useRouter();
  return (
    <TableRow
      onClick={() => router.push(`/admin/commodities/${commo.id}`)}
      className="hover:cursor-pointer"
      key={commo.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        {commo.assetName}
      </TableCell>
      <TableCell className="max-md:hidden">{commo.currency.mic}</TableCell>
      <TableCell>{commo.sector}</TableCell>
      <TableCell>{commo.currency.ic}</TableCell>
      <TableCell>{commo.ticker}</TableCell>
      <TableCell className="text-right">{commo.symbol}</TableCell>
    </TableRow>
  );
};

export default CommoItem;
