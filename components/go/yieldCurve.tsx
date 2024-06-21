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
import AddYC from "../yc/addYC";

type YieldCurveProps = {
  slug?: string[];
  continent?: string;
};

const YieldCurveComp = async ({ slug, continent }: YieldCurveProps) => {
  //console.log("slug: ", slug);
  //console.log("slug: ", slug);

  const session: any = await auth();
  const usr: any = session?.user;

  //console.log("usr: ", usr);

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

    //console.log("Continent:", conts);
  }

  //console.log("LOS", session);

  //console.log("Country: ", country?.data);

  return (
    <div className="w-1/2 max-md:w-full p-4  rounded-lg  backdrop-blur-md bg-gray-100 dark:bg-opacity-10">
      {slug ? (
        <>
          <AddYield countryId={+slug[0]} userSession={session} />
          <ScrollArea className="h-96 mx-auto  rounded-md border">
            <Table>
              <TableCaption>A list of your recent countrie.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Tenor</TableHead>
                  <TableHead
                    className={`usr.role != 'ADMIN' ? text-right : ''`}
                  >
                    Yield
                  </TableHead>
                  {usr.role == "ADMIN" && <TableHead>Date</TableHead>}
                  {usr.role == "ADMIN" && (
                    <TableHead className="text-right">Actions</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {country?.yieldcurve
                  .sort((a, b) => a.tenor - b.tenor)
                  .map((ct) => (
                    <TableRow key={ct.id}>
                      <TableCell className="font-medium">{ct.tenor}</TableCell>
                      <TableCell
                        className={`usr.role != 'ADMIN' ? text-right : ''`}
                      >
                        {ct.yield}
                      </TableCell>
                      {usr.role == "ADMIN" && (
                        <TableCell className="font-medium">
                          {ct.date?.toLocaleDateString()}
                        </TableCell>
                      )}
                      {usr.role == "ADMIN" && (
                        <TableCell className="flex justify-end gap-6 ">
                          <DeleteYC ycId={ct.id} />

                          <MdEdit size={20} className="text-gray-300" />
                        </TableCell>
                      )}
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
      ) : (
        <>
          {/*           <AddYield continent={continent} userSession={session} />
           */}{" "}
          <AddYC
            continent={continent}
            userSession={session}
            openDialog={false}
          />
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
                  <TableHead className="text-right  max-md:pr-2"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conts?.map((ct) => (
                  <TableRow key={ct.id}>
                    <TableCell className="font-medium ">{ct.tenor}</TableCell>
                    <TableCell className="font-medium">{ct.yield}</TableCell>
                    <TableCell className="font-medium">
                      {ct.date?.toLocaleDateString()}
                    </TableCell>
                    <TableCell className=" flex justify-center">
                      <DeleteYC ycId={ct.id} />
                      <UpdateYC
                        yc={ct}
                        userSession={session}
                        openDialog={false}
                      />
                      {/*                       <MdEdit size={20} className="text-gray-300" />
                       */}{" "}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>{" "}
          </ScrollArea>
        </>
      )}
    </div>
  );
};

export default YieldCurveComp;
