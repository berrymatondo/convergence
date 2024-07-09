"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BiEditAlt } from "react-icons/bi";

import { Button } from "../ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";
import { TableRow, TableCell } from "../ui/table";

type CountryItemProps = {
  ctr: any;
};

const CountryItem = ({ ctr }: CountryItemProps) => {
  //console.log("ctr: ", ctr);

  const router = useRouter();
  return (
    <TableRow className="hover:cursor-pointer" key={ctr.id}>
      <TableCell
        onClick={() => router.push(`/continents/${ctr.continent}/${ctr.id}`)}
        className="font-medium text-sky-700 dark:text-sky-500"
      >
        {ctr.name}
      </TableCell>
      <TableCell
        className="max-md:text-xs text-sm italic "
        onClick={() => router.push(`/continents/${ctr.continent}`)}
      >
        {ctr.continent}
      </TableCell>

      <TableCell className="text-right">
        <div className="md:hidden flex justify-between gap-4 items-center mx-4 text-white">
          <MdOutlineDeleteForever
            className="text-red-400"
            onClick={() => router.push(`/admin/countries/delete/${ctr.id}`)}
            size={25}
          />

          <BiEditAlt
            onClick={() => router.push(`/admin/countries/update/${ctr.id}`)}
            className="text-gray-600"
            size={25}
          />
        </div>
        <div className="flex justify-end gap-2 max-md:hidden">
          <Button
            className=" text-red-400"
            variant="secondary"
            onClick={() => router.push(`/admin/countries/delete/${ctr.id}`)}
          >
            Supprimer
          </Button>
          <Button
            className=""
            onClick={() => router.push(`/admin/countries/update/${ctr.id}`)}
          >
            Modifier
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default CountryItem;
