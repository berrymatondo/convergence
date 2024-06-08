import React from "react";
import Header from "./header";
import { auth } from "@/auth";

const AppBar = async () => {
  const session = await auth();

  return <Header userSession={session} />;
};

export default AppBar;
