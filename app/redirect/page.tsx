import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const RedirectPage = async () => {
  const session = await auth();

  let usr: any;
  let continent: any;
  let countryId: any;

  console.log("SESSION:", session);

  if (session) usr = session?.user;

  {
    if (usr?.role === "AGENT")
      redirect(`/continents/${usr?.continent}/${usr?.countryId}`);
  }

  return <div>RedirectPage</div>;
};

export default RedirectPage;
