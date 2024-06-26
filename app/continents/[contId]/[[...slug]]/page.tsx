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
      <div className="max-md:w-full w-1/2">
        {/*         {"Sélectionner un pays"}
         */}{" "}
        {/*         <AddYield continent={continent} userSession={session} />
         */}{" "}
        <YieldCurveComp continent={continent} />
      </div>
    );
  }
  return (
    <div>
      <div className="grid md:grid-cols-5 ">
        <div className="md:col-span-1 ">
          <Signaletique slug={slug} />
        </div>
        <div className="md:border md:border-blue-600 rounded-lg md:p-1 md:col-span-3 grid md:grid-cols-3 md:mx-2 max-md:my-2 gap-2">
          <div>
            <YieldCurveComp slug={slug} />
          </div>
          <div>
            <YieldCurveComp slug={slug} />
          </div>
          <div>
            <YieldCurveComp slug={slug} />
          </div>
        </div>
        <div className="col-span-1">
          <YieldCurveComp slug={slug} />
        </div>
      </div>
      <div className="grid md:grid-cols-5 gap-1 rounded-lg overflow-hidden">
        <div className="md:col-span-1">
          <YiedlGraphe continent={continent} countryId={+slug[0]} />
        </div>
        <div className="md:col-span-3">
          <YiedlGraphe continent={continent} countryId={+slug[0]} />
        </div>
        <div className="md:col-span-1">
          <YiedlGraphe continent={continent} countryId={+slug[0]} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
