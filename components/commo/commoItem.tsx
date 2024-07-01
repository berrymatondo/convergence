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
      <TableCell className="font-medium text-blue-600">
        {commo.assetName}
      </TableCell>
      <TableCell className="max-md:hidden">{commo.currency}</TableCell>
      <TableCell>{commo.sector}</TableCell>
      <TableCell>{commo.ric}</TableCell>
      <TableCell>{commo.ticker}</TableCell>
      <TableCell className="text-right">{commo.symbol}</TableCell>
    </TableRow>
  );
};

export default CommoItem;
