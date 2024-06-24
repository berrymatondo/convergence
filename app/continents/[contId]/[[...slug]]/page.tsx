import { auth } from "@/auth";
import Continent from "@/components/continent/continent";
import AddYield from "@/components/go/addYield";
import Signaletique from "@/components/go/signaletique";
import YieldCurveComp from "@/components/go/yieldCurve";
import YiedlGraphe from "@/components/graphes/yiedlGRaphe";
import { headers } from "next/headers";
import React from "react";

const DetailPage = async ({ params }: { params: { slug?: string[] } }) => {
  const { slug } = params;

  const session = await auth();
  const usr: any = session?.user;

  //console.log("sulg2:", slug);

  const headersList = headers();
  //const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("referer") || "";
  const continent = fullUrl.split("continents/")[1];

  //console.log(fullUrl);

  //console.log("continent:=" + continent);

  // IF CONTINENT
  if (!slug) {
    return (
      <div className="max-md:full w-1/2">
        {/*         {"Sélectionner un pays"}
         */}{" "}
        {/*         <AddYield continent={continent} userSession={session} />
         */}{" "}
        <YieldCurveComp continent={continent} />
      </div>
    );
  }
  return (
    <div className=" w-full flex flex-col  gap-4">
      <div className="w-full flex max-md:flex-col gap-4">
        <Signaletique slug={slug} />
        <YieldCurveComp slug={slug} />
      </div>
      <YiedlGraphe continent={continent} countryId={+slug[0]} />
    </div>
  );
};

export default DetailPage;
