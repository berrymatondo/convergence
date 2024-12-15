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
      onClick={() => router.push(`/admin/bonds/${bond.id}`)}
      className="hover:cursor-pointer"
      key={bond.id}
    >
      <TableCell className="font-medium text-sky-700 dark:text-sky-500">
        {bond.description}
      </TableCell>
      <TableCell className="">{bond.maturity}</TableCell>
      <TableCell>
        {new Intl.NumberFormat().format(bond.amountIssuedUSD)}
      </TableCell>
      <TableCell className="max-md:hidden ">{bond.couponRate}</TableCell>
      <TableCell className="max-md:hidden ">{bond.couponClass}</TableCell>
      <TableCell className="max-md:hidden ">{bond.couponFrequency}</TableCell>
      <TableCell className="max-md:text-right">
        {bond.principalCurrency.mic}
      </TableCell>
      <TableCell className="max-md:hidden ">
        {bond.couponCurrency.mic}
      </TableCell>

      <TableCell className="max-md:hidden ">
        {bond.marketOfIssue.replaceAll("_", " ")}
      </TableCell>

      <TableCell className="text-center max-md:hidden ">
        <Checkbox checked={bond.inflationLinked} />
      </TableCell>
      <TableCell className="text-center max-md:hidden ">
        <Checkbox checked={bond.dualCurrency} />
      </TableCell>
      <TableCell className="text-center max-md:hidden ">
        <Checkbox checked={bond.greeBond} />
      </TableCell>
      <TableCell className="text-right max-md:hidden ">
        {+bond.isin ? "" : bond.isin}
      </TableCell>
    </TableRow>
  );
};

export default CountryBondItem;
