import Continent from "@/components/continent/continent";
import Signaletique from "@/components/go/signaletique";
import React from "react";

const DetailPage = ({ params }: { params: { slug?: string[] } }) => {
  const { slug } = params;

  //console.log("sulg2:", slug);

  if (!slug) {
    return <div>{"Sélectionner un pays"}</div>;
  }
  return (
    <div className="">
      <Signaletique slug={slug} />
    </div>
  );
};

export default DetailPage;
