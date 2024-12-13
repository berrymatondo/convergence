//"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";

type HistoFxItemProps = {
  histoFx: any;
};
const HistoFxItem = ({ histoFx }: HistoFxItemProps) => {
  //const router = useRouter();
  return (
    <TableRow
      //onClick={() => router.push(`/admin/fxrates/${histoFx.id}`)}
      className="hover:cursor-pointer"
      key={histoFx.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        {histoFx.date}
      </TableCell>
      <TableCell className="text-center">{histoFx.close.toFixed(3)}</TableCell>
      <TableCell className="text-center">{histoFx.change.toFixed(3)}</TableCell>

      <TableCell className="text-right">
        {histoFx.changePercentage.toFixed(3)} %
      </TableCell>
    </TableRow>
  );
};

export default HistoFxItem;
