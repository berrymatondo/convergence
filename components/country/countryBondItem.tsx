"use client";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";

type BondItemProps = {
  bond: any;
};
const CountryBondItem = ({ bond }: BondItemProps) => {
  const router = useRouter();
  // console.log("bond", bond);

  return (
    <TableRow
      onClick={() => router.push(`/admin/commodities/${bond.id}`)}
      className="hover:cursor-pointer"
      key={bond.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        {bond.description}
      </TableCell>
      <TableCell className="max-md:hidden">{bond.maturity}</TableCell>
      <TableCell>
        {new Intl.NumberFormat().format(bond.amountIssuedUSD)}
      </TableCell>
      <TableCell>{bond.couponRate}</TableCell>
      <TableCell>{bond.couponClass}</TableCell>
      <TableCell>{bond.couponFrequency}</TableCell>
      <TableCell>{bond.principalCurrency.currency}</TableCell>
      <TableCell>{bond.couponCurrency.currency}</TableCell>

      <TableCell>{bond.marketOfIssue}</TableCell>

      <TableCell className="text-center">
        <Checkbox checked={bond.inflationLinked} />
      </TableCell>
      <TableCell className="text-center">
        <Checkbox checked={bond.dualCurrency} />
      </TableCell>
      <TableCell className="text-center">
        <Checkbox checked={bond.greeBond} />
      </TableCell>
      <TableCell className="text-right">
        {+bond.isin ? "" : bond.isin}
      </TableCell>
    </TableRow>
  );
};

export default CountryBondItem;
