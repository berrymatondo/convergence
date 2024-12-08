import { getContinent } from "@/lib/_continentActions";
import React from "react";

type TestPros = {
  name: number;
};
const Test = async ({ name }: TestPros) => {
  const details = await getContinent(name);

  console.log("details: ", details?.data);

  return <div>{name}</div>;
};

export default Test;
