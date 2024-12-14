import { getAllStaticIndexes } from "@/lib/_indexActions";
import Link from "next/link";
import React from "react";

const AllStaticIndexes = async () => {
  const rs = await getAllStaticIndexes();
  const indexes = rs?.data;

  return (
    <>
      {indexes?.map((el: any) => (
        <div key={el.id} className="">
          <Link
            href={`/admin/indexes/${el.id}`}
            className=" text-sky-600 text-lg hover:text-sky-400 flex gap-2 my-2 "
          >
            <div className="flex">
              <div className="-mt-2 z-50   p-1">{el?.assetName}</div>
              {/*               <div className=" z-50 rounded-full bg-blue-900/30 p-1">
                {Flag(el?.country?.flagCode)}
              </div> */}
            </div>
          </Link>
        </div>
      ))}
    </>
  );
};

export default AllStaticIndexes;

const Flag = async (flagCode: any) => {
  let flag = "https://flagcdn.Com/w40/" + flagCode + ".png";
  if (flagCode == "zz") flag = "/continents/uemoa.gif";

  return (
    <div className="  rounded-full overflow-hidden">
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
