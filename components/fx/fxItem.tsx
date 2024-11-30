"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";

type FxItemProps = {
  fx: any;
};
const FxItem = ({ fx }: FxItemProps) => {
  const router = useRouter();
  // console.log("fx", fx);

  return (
    <TableRow
      onClick={() => router.push(`/admin/fxrates/${fx?.id}`)}
      className="hover:cursor-pointer"
      key={fx?.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        {fx?.country?.name}
      </TableCell>
      <TableCell className="max-md:hidden">
        {fx?.currency1?.mic}/{fx?.currency2?.mic}
      </TableCell>
      <TableCell>{fx?.currency1?.currency}</TableCell>
      <TableCell>{fx?.currency2?.currency}</TableCell>
      <TableCell>{fx?.ticker}</TableCell>
      <TableCell className="text-right">{fx?.ric}</TableCell>
    </TableRow>
  );
};

export default FxItem;
