import React from "react";
import { getCountry } from "@/lib/_countryActions";
import { ContinentsList, Go, YieldCurve } from "@prisma/client";
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
import { Button } from "../ui/button";
import SyncYC from "../yc/syncYC";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

type YieldCurveProps = {
  slug?: string[];
  continent?: string;
  title?: string;
};

const YieldCurveComp = async ({ slug, continent, title }: YieldCurveProps) => {
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
    <div className="w-full max-md:w-full p-4  rounded-lg  backdrop-blur-md bg-red-100 dark:bg-opacity-0">
      {slug ? (
        <>
          {/*           <AddYield countryId={+slug[0]} userSession={session} />
           */}
          <div>
            <p className="text-center my-2 text-teal-400 uppercase">{title}</p>
            <div className="flex justify-between items-center">
              <SyncYC continent={continent} />
              <AddYC
                countryId={+slug[0]}
                countryName={country?.name}
                userSession={session}
                openDialog={false}
              />
            </div>
          </div>

          <ScrollArea className="h-96 max-md:h-48 mx-auto  rounded-md border">
            <Table className=" border-none">
              <TableCaption>{"Country Yield curbe"}.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8 md:w-8 ">Tenor</TableHead>
                  <TableHead
                    className={
                      usr.role != "ADMIN" ? "text-right " : " px-0 text-center "
                    }
                  >
                    Yield
                  </TableHead>
                  {usr.role == "ADMIN" && (
                    <TableHead className="text-center">Date</TableHead>
                  )}
                  {usr.role == "ADMIN" && (
                    <TableHead className="text-right"></TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {country?.yieldcurve
                  /*                   .filter((el) => el.type == "L")
                   */ .sort((a: any, b: any) => a.tenor - b.tenor)
                  .map((ct: any) => (
                    <TableRow key={ct.id}>
                      <TableCell className="font-medium">{ct.tenor}</TableCell>
                      <TableCell
                        className={usr.role != "ADMIN" ? "text-right" : ""}
                      >
                        {ct.yield}
                      </TableCell>
                      {usr.role == "ADMIN" && (
                        <TableCell className="font-medium px-0 text-black ">
                          {ct.date}{" "}
                        </TableCell>
                      )}
                      {usr.role == "ADMIN" && (
                        <TableCell className="flex justify-start ">
                          {/*                           <DeleteYC ycId={ct.id} />
                           */}
                          <DeleteYC
                            ycId={ct.id}
                            tenor={ct.tenor}
                            countryId={country.id}
                            openDialog={false}
                          />

                          <UpdateYC
                            yc={ct}
                            tenor={ct.tenor}
                            userSession={session}
                            openDialog={false}
                            countryId={country.id}
                          />
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
          <div className="flex justify-between items-center">
            <SyncYC continent={continent} />
            <AddYC
              continent={continent}
              userSession={session}
              openDialog={false}
            />
          </div>
          <ScrollArea className="h-96 w-full mx-auto  rounded-md border">
            <Table>
              <TableCaption>
                A list of your recent yields for {continent}.
              </TableCaption>
              <TableHeader>
                <TableRow className="">
                  <TableHead className="w-[100px]">Tenor</TableHead>
                  <TableHead>Yield</TableHead>
                  <TableHead className="">Change</TableHead>
                  <TableHead className="text-right  max-md:pr-2"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {conts?.map((ct) => (
                  <TableRow key={ct.id}>
                    <TableCell className="font-medium max-md:text-xs">
                      {ct.tenor}Y
                    </TableCell>
                    <TableCell className="font-medium max-md:text-xs ">
                      {ct.yield}%
                    </TableCell>
                    <TableCell className="text-xs mx-0 w-full">
                      {/*                       {ct.date?.toLocaleDateString()}
                       */}{" "}
                      {ct.type == "L" ? (
                        <div className="py-1 gap-2 w-full flex max-md:flex-col max-md:justify-center justify-between">
                          {ct.change >= 0 ? (
                            <p className="text-center ml-1 font-semibold text-green-600 p-1">
                              +{ct.change.toFixed(2)}%
                            </p>
                          ) : (
                            <p className="text-center ml-1 font-semibold text-red-400 p-1">
                              {ct.change.toFixed(2)}%
                            </p>
                          )}
                          <p className="text-black text-center py-1 flex-1 dark:text-white rounded-full w-full ">
                            {ct.date}{" "}
                          </p>
                          {/* <AccordionDemo date={ct.date} /> */}
                        </div>
                      ) : (
                        <p className="text-center py-1 px-2 bg-neutral-400 text-black dark:text-white rounded-full w-full ">
                          {ct.date}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className=" flex justify-center">
                      <DeleteYC
                        ycId={ct.id}
                        tenor={ct.tenor}
                        continent={ct.continent as ContinentsList}
                        openDialog={false}
                      />
                      <UpdateYC
                        yc={ct}
                        tenor={ct.tenor}
                        userSession={session}
                        openDialog={false}
                        continent={ct.continent as ContinentsList}
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

type DateProps = {
  date: any;
};
export function AccordionDemo({ date }: DateProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Détails</AccordionTrigger>
        <AccordionContent>
          {" "}
          <p className="py-1 px-2 bg-neutral-400 text-white rounded-full w-full text-center">
            {date}
          </p>
        </AccordionContent>
      </AccordionItem>
      {/*       <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem> */}
    </Accordion>
  );
}
