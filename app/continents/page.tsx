import { TbHandFinger } from "react-icons/tb";

import React from "react";

const GeneralOverviewPage = ({ params }: { params: { slug?: string[] } }) => {
  const { slug } = params;
  if (!slug) {
    return (
      <div className="flex items-center gap-2">
        {"Sélectionner un continent"}
        <TbHandFinger size={20} className="text-blue-600" />
      </div>
    );
  }
  return <div className=""> </div>;
};

export default GeneralOverviewPage;
