import Continent from "@/components/continent/continent";
import Signaletique from "@/components/go/signaletique";
import React from "react";

const GeneralOverviewPage = ({ params }: { params: { slug?: string[] } }) => {
  const { slug } = params;
  if (!slug) {
    return <div>{"Sélectionner un continent"}</div>;
  }
  return <div className=""> </div>;
};

export default GeneralOverviewPage;
