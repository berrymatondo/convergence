import React from "react";
import { headers } from "next/headers";
import { getAllStaticCommo, getCommo } from "@/lib/_commoActions";
import CommoViews from "@/components/commo/commoViews";

const CommoDetail2Page = async () => {
  const headersList = headers();
  const domain = headersList.get("host") || "";
  const fullUrl = headersList.get("x-current-path") || "";

  const commoId = fullUrl.split("/commodities/")[1];

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

  return (
    <div>
      {commoId && commo && commos && (
        <div>
          <CommoViews commo={commo} commos={commos} />
        </div>
      )}
    </div>
  );
};

export default CommoDetail2Page;
