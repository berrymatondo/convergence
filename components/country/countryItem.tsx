import React from "react";

import { TableRow, TableCell } from "../ui/table";
import Link from "next/link";

type CountryItemProps = {
  ctr: any;
};

const CountryItem = ({ ctr }: CountryItemProps) => {
  //console.log("ctr: ", ctr);

  // const router = useRouter();
  return (
    <TableRow className="hover:cursor-pointer" key={ctr.id}>
      <TableCell
        // onClick={() => router.push(`/continents/${ctr.continent}/${ctr.id}`)}
        className=" text-sky-700 dark:text-sky-500"
      >
        <Link
          className="flex gap-2 font-medium"
          href={`/admin/countries/${ctr.id}`}
          //href={`/continents/${ctr.continent}/${ctr.id}`}
        >
          {Flag(ctr?.flagCode)}
          <span>{ctr.name?.replaceAll("_", " ")}</span>
        </Link>
      </TableCell>
      <TableCell
        className="max-md:text-xs text-sm italic text-right"
        // onClick={() => router.push(`/continents/${ctr.continent}`)}
      >
        <Link href={`/continents/${ctr.continent}`}>{ctr.continent}</Link>
      </TableCell>

      {/*      <TableCell className="text-right">
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
      </TableCell> */}
    </TableRow>
  );
};

export default CountryItem;

const Flag = async (flagCode: any) => {
  let flag = "https://flagcdn.Com/w40/" + flagCode + ".png";
  if (flagCode == "zz") flag = "/continents/uemoa.gif";

  return (
    <div className=" rounded-full overflow-hidden">
      {flagCode && (
        <img
          src={flag}
          alt="Flag"
          style={{ width: "1.5rem", height: "1.5rem" }}
        />
      )}
    </div>
  );
};
