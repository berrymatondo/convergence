"use client";
import React, { useState } from "react";
import { MdDelete, MdUpdate } from "react-icons/md";
import { Button } from "../ui/button";
import { deleteGo } from "@/lib/_goActions";
import AddGeneralOverview from "./addGeneralOverview";

type UpdateGOProps = {
  go: any;
};
const UpdateGO = ({ go }: UpdateGOProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MdUpdate
        size={25}
        className="text-blue-600"
        onClick={() => setOpen(!open)}
      />
      {open && <AddGeneralOverview countryId={go.countryId} go={go} />}
    </>
    /*     <form>
      <Button
        type="submit"
        variant="empty"
        formAction={() => {
          "use serer";
          deleteGo(goId);
        }}
      >
        <MdUpdate size={25} className="text-blue-600" />
      </Button>
    </form> */
  );
};

export default UpdateGO;
