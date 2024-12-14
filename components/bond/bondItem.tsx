"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

type BondItemProps = {
  bond: any;
};
const BondItem = ({ bond }: BondItemProps) => {
  const router = useRouter();
  // console.log("bond", bond);

  return (
    <TableRow
      onClick={() => router.push(`/admin/bonds/${bond.id}`)}
      className="hover:cursor-pointer"
      key={bond.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        {bond.description}
      </TableCell>
      <TableCell className="max-md:hidden">{bond.isin}</TableCell>
      <TableCell>{bond.issuer}</TableCell>
      <TableCell>{bond.couponRate}</TableCell>
      <TableCell>{bond.couponClass}</TableCell>
      <TableCell>{bond?.principalCurrency?.mic}</TableCell>
      {/*       <TableCell>{new Intl.NumberFormat().format(bond.issuer)}</TableCell>
       */}{" "}
      <TableCell className="text-right">{bond.maturity}</TableCell>
      <TableCell className="text-right">{bond.market?.name}</TableCell>
    </TableRow>
  );
};

export default BondItem;
