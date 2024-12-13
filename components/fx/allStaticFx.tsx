import { getAllStaticFx } from "@/lib/_fxActions";
import Link from "next/link";
import React from "react";

const AllStaticFx = async () => {
  const rs = await getAllStaticFx();
  const fxs = rs?.data;

  return (
    <>
      {fxs?.map((el: any) => (
        <div key={el.id} className="">
          <Link
            href={`/admin/fxrates/${el.id}`}
            className=" text-sky-600 text-lg hover:text-sky-400 flex gap-2 my-2 "
          >
            <div className="flex">
              <div className="-mt-2 z-50 rounded-full bg-blue-900/30 p-1">
                {Flag(el?.country?.flagCode)}
              </div>
              <div className="-ml-3 z-50 rounded-full bg-blue-900/30 p-1">
                {Flag(el?.country2?.flagCode)}
              </div>
            </div>
            {el?.currency1?.mic}/{el?.currency2?.mic}
          </Link>
        </div>
      ))}
    </>
  );
};

export default AllStaticFx;

const Flag = async (flagCode: any) => {
  let flag = "https://flagcdn.Com/w40/" + flagCode + ".png";
  if (flagCode == "zz") flag = "/continents/uemoa.gif";

  return (
    <div className=" -mb-4 rounded-full overflow-hidden">
      {flagCode && (
        <img
          src={flag}
          alt="Flag"
          style={{ width: "1.5rem", height: "1.5rem" }}
        />
      )}
    </div>
  );
};
