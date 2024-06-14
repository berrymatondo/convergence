import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const RedirectPage = async () => {
  const session = await auth();

  let usr: any = session?.user;
  let continent: any;
  let countryId: any;

  // console.log("SESSION: ", session);
  //console.log("usr: ", usr);

  if (session) usr = session?.user;

  {
    //console.log("ici");

    if (usr?.role === "AGENT" && usr.countryId && usr.status === "ACTIF")
      redirect(`/continents/${usr?.continent}/${usr?.countryId}`);
    // redirect(`/conts/${usr?.continent}/count/${usr?.countryId}`);
    if (usr?.role === "ADMIN" && usr.status === "ACTIF")
      redirect(`/continents`);
  }

  return <div>{"Vous n'avez pas les autorisations nécessaires"}</div>;
};

export default RedirectPage;
