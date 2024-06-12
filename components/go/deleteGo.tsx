"use client";
import React from "react";
import { MdDelete } from "react-icons/md";
import { Button } from "../ui/button";
import { deleteGo } from "@/lib/_goActions";

type DeleteGOProps = {
  goId: number;
};
const DeleteGO = ({ goId }: DeleteGOProps) => {
  return (
    <form>
      <Button
        type="submit"
        variant="empty"
        formAction={() => {
          "use serer";
          deleteGo(goId);
        }}
      >
        <MdDelete size={25} className="text-red-600" />
      </Button>
    </form>
  );
};

export default DeleteGO;
