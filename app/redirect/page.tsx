import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const RedirectPage = async () => {
  const session = await auth();

  let usr: any;
  let continent: any;
  let countryId: any;

  //console.log("SESSION:", session);

  if (session) usr = session?.user;

  {
    if (usr?.role === "AGENT" && usr.countryId && usr.status === "ACTIF")
      redirect(`/continents/${usr?.continent}/${usr?.countryId}`);
    if (usr?.role === "ADMIN" && usr.status === "ACTIF")
      redirect(`/continents/continents`);
  }

  return <div>{"Vous n'avez pas les autorisations nécessaires"}</div>;
};

export default RedirectPage;
