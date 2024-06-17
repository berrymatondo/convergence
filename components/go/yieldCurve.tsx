import React from "react";
import { getCountry } from "@/lib/_countryActions";
import { Go, YieldCurve } from "@prisma/client";
import { MdDelete, MdEdit } from "react-icons/md";
import DeleteGO from "./deleteGo";
import UpdateGO from "./updateGo";
import { auth } from "@/auth";
import AddYield from "./addYield";
import { getYCByContinent } from "@/lib/_goActions";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type YieldCurveProps = {
  slug?: string[];
  continent?: string;
};

const YieldCurveComp = async ({ slug, continent }: YieldCurveProps) => {
  //console.log("slug: ", slug);
  //console.log("slug: ", slug);

  let res;
  let res2;
  let country;
  let conts;
  if (slug) {
    res = await getCountry(+slug[0]);
    country = res?.data;
  }

  if (continent) {
    res2 = await getYCByContinent(continent);
    conts = res2?.data;
  }
  const session: any = await auth();
  const usr: any = session?.user;
  //console.log("LOS", session);

  //console.log("Country: ", country?.data);

  return (
    <div className="w-1/2 max-md:w-full p-4  rounded-lg  backdrop-blur-md bg-gray-100 dark:bg-opacity-10">
      {slug ? (
        <AddYield countryId={+slug[0]} userSession={session} />
      ) : (
        <>
          <AddYield continent={continent} userSession={session} />
          <div>
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Tenor</TableHead>
                  <TableHead>Yield</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conts?.map((ct) => (
                  <TableRow key={ct.id}>
                    <TableCell className="font-medium">{ct.tenor}</TableCell>
                    <TableCell className="font-medium">{ct.yield}</TableCell>
                    <TableCell className="flex justify-end gap-6 ">
                      <MdDelete size={20} className="text-red-600" />

                      <MdEdit size={20} className="text-gray-300" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              {/*               <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                </TableRow>
              </TableFooter> */}
            </Table>{" "}
          </div>
        </>
      )}
      <div className="">
        <p className="uppercase text-white text-center font-semibold bg-teal-600 p-2 rounded-lg  gap-2 mb-1">
          <span className="">{country?.name}</span>
        </p>
        {country?.gos.map((go: Go, index) => (
          <div key={index} className="flex justify-between gap-4 mb-1">
            <span>{go.key}:</span>
            <div className="flex items-center gap-3">
              <span className="text-blue-800 dark:text-yellow-400">
                {go.value}
              </span>
              {usr?.role == "ADMIN" ? <DeleteGO goId={go.id} /> : ""}
              {/*               <UpdateGO go={go} />
               */}{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YieldCurveComp;
