import { TbHandFinger } from "react-icons/tb";

import React from "react";
import Test from "@/components/continent/test";
import { getAllContinents } from "@/lib/_continentActions";
import { GiAfrica } from "react-icons/gi";
import { Country } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const GeneralOverviewPage = async ({
  params,
}: {
  params: { slug?: string[] };
}) => {
  const { slug } = params;

  //console.log("slug: ", slug);
  const res = await getAllContinents();
  const allCont = res?.data;

  if (allCont) console.log("allCont: ", allCont);

  if (!slug) {
    return (
      <div className="flex  justify-center items-center gap-2">
        {/*         {"Sélectionner un continent"}
         */}{" "}
        <Accordion type="single" collapsible className="w-full flex">
          {allCont?.map((ct: any) => (
            <AccordionItem
              value={ct?.name}
              key={ct.id}
              className="flex flex-col gap-8 relative p-8 bg-blue-950/30 h-60 w-60 rounded-full"
            >
              <AccordionTrigger>{ct.name}</AccordionTrigger>

              <AccordionContent>
                <div>
                  Nr de pays :{ct?.countries?.length}
                  {ct?.countries?.map((c: any) => (
                    <div>
                      <p>{c.name}</p>
                      <p className="text-xs">Currency: {c.currency.mic}</p>
                      <p className="text-xs">Fx: {c._count.fxMapping}</p>
                      <p className="text-xs">
                        staticInfoBond: {c._count.staticInfoBond}
                      </p>
                    </div>
                  ))}
                </div>
              </AccordionContent>

              <GiAfrica
                className=" top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-600 absolute -z-10"
                size={200}
              />
            </AccordionItem>
          ))}
          <TbHandFinger size={20} className="text-blue-600" />
        </Accordion>
      </div>
    );
  }
  return <div className=""></div>;
};

export default GeneralOverviewPage;
