"use client";
import React from "react";
import { MdDelete } from "react-icons/md";
import { Button } from "../ui/button";
import { deleteGo } from "@/lib/_goActions";
import { deleteYc } from "@/lib/_ycActions";

type DeleteYCProps = {
  ycId: number;
};
const DeleteYC = ({ ycId }: DeleteYCProps) => {
  return (
    <form>
      <Button
        type="submit"
        variant="empty"
        formAction={() => {
          "use serer";
          deleteYc(ycId);
        }}
      >
        <MdDelete size={25} className="text-red-600" />
      </Button>
    </form>
  );
};

export default DeleteYC;
