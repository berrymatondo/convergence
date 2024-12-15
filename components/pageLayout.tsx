"use client";

import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";
import Title from "./title";
import Link from "next/link";

type PageLayoutProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  position?: string;
  flagCode?: string;
  wid?: string;
};
const PageLayout = ({
  title,
  description,
  position,
  flagCode,
  children,
  wid,
}: PageLayoutProps) => {
  // console.log("ici ");

  return (
    <div
      className={
        wid ? wid + " max-md:mx-2" : "md:container mx-auto max-w-screen-2xl"
      }
    >
      <div className="">
        {title && (
          <Title
            flagCode={flagCode}
            title={title}
            description={description}
            position={position}
          />
        )}
        <div className=" gap-4 mt-4 h-full ">
          <div className="rounded-lg bg-transparent md:p-2  ">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
