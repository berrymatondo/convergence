"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BiEditAlt } from "react-icons/bi";

import { Button } from "../ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";

type UserItemProps = {
  ctc: any;
};

const ContactItem = ({ ctc }: UserItemProps) => {
  //console.log("usr: ", usr);

  const router = useRouter();
  return (
    <div
      key={ctc.id}
      className="border-b border-gray-400/40 gap-2 flex justify-between shadow-md md:my-2 md:py-2 max-md:m-2  hover:cursor-pointer"
    >
      <div
        onClick={() => router.push(`/admin/contacts/${ctc.id}`)}
        className=" grid grid-cols-3 "
      >
        <div className="relative col-span-2 flex flex-col items-start my-2 ml-2 ">
          <p className="max-md:text-xs text-sm ">{ctc.firstname}</p>
          <p className="italic text-blue-600 max-md:text-xs text-sm">
            {ctc.lastname}
          </p>
        </div>
      </div>
      <div className="md:hidden flex justify-between gap-4 items-center mx-4 text-white">
        <p
          className={
            ctc.status == "NOUVEAU"
              ? "w-20 text-center text-xs py-1 px-2 rounded-full bg-green-600"
              : ctc.status == "ENCOURS"
              ? "w-20 text-center text-xs py-1 px-2 rounded-full bg-red-500"
              : "w-20 text-center text-xs py-1 px-2 rounded-full bg-orange-500"
          }
        >
          {ctc.status}
        </p>
        <MdOutlineDeleteForever
          className="text-red-400"
          onClick={() => router.push(`/admin/conctacts/delete/${ctc.id}`)}
          size={30}
        />

        <BiEditAlt
          onClick={() => router.push(`/admin/conctacts/update/${ctc.id}`)}
          className="text-gray-600"
          size={30}
        />
      </div>
      <div className="flex justify-between gap-4 items-center mx-4 max-md:hidden">
        <p
          className={
            ctc.status == "NOUVEAU"
              ? "w-20 text-center text-xs py-1 px-2 rounded-full bg-green-600"
              : ctc.status == "ENCOURS"
              ? "w-20 text-center text-xs py-1 px-2 rounded-full bg-red-500"
              : "w-20 text-center text-xs py-1 px-2 rounded-full bg-orange-500"
          }
        >
          {ctc.status}
        </p>
        <Button
          className=" text-red-400"
          variant="secondary"
          onClick={() => router.push(`/admin/conctacts/delete/${ctc.id}`)}
        >
          Supprimer
        </Button>
        <Button
          className=""
          onClick={() => router.push(`/admin/conctacts/update/${ctc.id}`)}
        >
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default ContactItem;
