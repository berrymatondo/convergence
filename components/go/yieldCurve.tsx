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
import DeleteYC from "../yc/deleteYC";
import { ScrollArea } from "../ui/scroll-area";
import UpdateYC from "../yc/updateYC";

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

    //console.log("Country:", country);
  }

  if (continent) {
    res2 = await getYCByContinent(continent);
    conts = res2?.data;

    console.log("Continent:", conts);
  }
  const session: any = await auth();
  const usr: any = session?.user;
  //console.log("LOS", session);

  //console.log("Country: ", country?.data);

  return (
    <div className="w-1/2 max-md:w-full p-4  rounded-lg  backdrop-blur-md bg-gray-100 dark:bg-opacity-10">
      {slug ? (
        <>
          <AddYield countryId={+slug[0]} userSession={session} />
          <div>
            <Table>
              <TableCaption>A list of your recent countrie.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Tenor</TableHead>
                  <TableHead>Yield</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {country?.yieldcurve
                  .sort((a, b) => a.tenor - b.tenor)
                  .map((ct) => (
                    <TableRow key={ct.id}>
                      <TableCell className="font-medium">{ct.tenor}</TableCell>
                      <TableCell className="font-medium">{ct.yield}</TableCell>
                      <TableCell className="font-medium">
                        {ct.date?.toLocaleDateString()}
                      </TableCell>
                      <TableCell className="flex justify-end gap-6 ">
                        <DeleteYC ycId={ct.id} />

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
      ) : (
        <>
          <AddYield continent={continent} userSession={session} />
          <ScrollArea className="h-96 w-full mx-auto  rounded-md border">
            <Table>
              <TableCaption>
                A list of your recent yields for {continent}.
              </TableCaption>
              <TableHeader>
                <TableRow className="">
                  <TableHead className="w-[100px]">Tenor</TableHead>
                  <TableHead>Yield</TableHead>
                  <TableHead className="">Date</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conts?.map((ct) => (
                  <TableRow key={ct.id}>
                    <TableCell className="font-medium max-md:flex max-md:flex-col">
                      {ct.tenor}
                    </TableCell>
                    <TableCell className="font-medium">{ct.yield}</TableCell>
                    <TableCell className="font-medium">
                      {ct.date?.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="flex justify-end gap-6 ">
                      <DeleteYC ycId={ct.id} />
                      <UpdateYC ycId={ct.id} userSession={session} />
                      {/*                       <MdEdit size={20} className="text-gray-300" />
                       */}{" "}
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
          </ScrollArea>
        </>
      )}
      {/*       <div className="">
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
                          <UpdateGO go={go} />
       
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default YieldCurveComp;
