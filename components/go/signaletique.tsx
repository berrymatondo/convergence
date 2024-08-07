import React from "react";
import AddGeneralOverview from "./addGeneralOverview";
import { getCountry } from "@/lib/_countryActions";
import { Go } from "@prisma/client";
import { MdDelete } from "react-icons/md";
import DeleteGO from "./deleteGo";
import UpdateGO from "./updateGo";
import { auth } from "@/auth";

const Signaletique = async ({ slug }: { slug: string[] }) => {
  //console.log("slug: ", slug);
  //console.log("slug: ", slug[1]);

  const res = await getCountry(+slug[0]);
  const country = res?.data;
  const session: any = await auth();
  const usr: any = session?.user;
  //console.log("LOS", session);

  //console.log("Country: ", country?.data);

  return (
    <div className="w-full max-md:w-full p-4  rounded-lg  backdrop-blur-md border bg-gray-100 dark:bg-opacity-0 ">
      <AddGeneralOverview countryId={+slug[0]} userSession={session} />
      <div className="">
        <p className="uppercase text-center font-semibold text-sky-700 dark:text-sky-500 p-2 rounded-lg  gap-2 mb-1">
          <span className="">{country?.name}</span>
        </p>
        {country?.gos.map((go: Go, index) => (
          <div
            key={index}
            className="flex justify-between items-center gap-4 mb-1"
          >
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

export default Signaletique;
