"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const CommoDetailPage = () => {
  const pathname = usePathname();
  console.log("pathname", pathname);
  const commoId = pathname.split("commodities/")[1];
  /*     useEffect(() => {
        const fetchYCToUpdate = async (idd: any) => {
          const resu = await getYC(idd);
          const dat = resu?.data;
          setReadYC(dat);
    
          //  console.log("IDd ", dat);
        };
        commo(yc.id);
      }, [form, yc.id, yc]);
 */
  return <div>CommoDetailPage - {commoId}</div>;
};

export default CommoDetailPage;
