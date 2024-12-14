//"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";

type HistoIndexItemProps = {
  histoIndex: any;
};
const HistoIndexItem = ({ histoIndex }: HistoIndexItemProps) => {
  //const router = useRouter();
  return (
    <TableRow
      //onClick={() => router.push(`/admin/fxrates/${histoFx.id}`)}
      className="hover:cursor-pointer"
      key={histoIndex.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        {histoIndex.date.split("-").reverse().join("/")}
      </TableCell>
      <TableCell className="text-center">
        {histoIndex.close.toFixed(3)}
      </TableCell>
      <TableCell className="text-center">
        {histoIndex.change.toFixed(3)}
      </TableCell>

      <TableCell className="text-right">
        {histoIndex.changePercentage.toFixed(3)} %
      </TableCell>
    </TableRow>
  );
};

export default HistoIndexItem;
