import React, { Suspense } from "react";
import { headers } from "next/headers";
import { getAllStaticCommo, getCommo } from "@/lib/_commoActions";
import CommoViews from "@/components/commo/commoViews";
import { setTimeout } from "timers/promises";
import PageLayout from "@/components/pageLayout";

const CommoDetail2Page = async () => {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("x-current-path") || "";

  //const commoId = fullUrl.split("/commodities/")[1];

  const commoId = 1;

  let commo: any;
  let commos: any;
  if (commoId) {
    const res = await getCommo(+commoId);
    commo = res?.data;
    const res2 = await getAllStaticCommo();
    commos = res2?.data;
  }

  console.log("Commo", commoId);
  console.log("Commo", commo);
  console.log("Commos", commos);

  await setTimeout(5000);

  return (
    <div>
      <PageLayout
        title="Détails matière première"
        description="Détails et historiques d'une matière première"
      >
        {commoId && commo && commos && (
          <div className="max-w-[800px]">
            <Suspense fallback={<p className="text-3xl">Loading feed...</p>}>
              <CommoViews commo={commo} commos={commos} />
            </Suspense>
          </div>
        )}
      </PageLayout>
    </div>
  );
};

export default CommoDetail2Page;
