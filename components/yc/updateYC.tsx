"use client";
import React, { useState } from "react";
import { MdDelete, MdUpdate } from "react-icons/md";
import { Button } from "../ui/button";
import { deleteGo } from "@/lib/_goActions";
import { deleteYc } from "@/lib/_ycActions";
import AddYield from "../go/addYield";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

type UpdateYCProps = {
  ycId: number;
  userSession: any;
};

const UpdateYC = ({ ycId, userSession }: UpdateYCProps) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="empty">
            <MdUpdate size={25} className="text-gray-200" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mettre à jour le yield</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
            <AddYield userSession={userSession} yc={ycId} />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/*       <Button
        variant="empty"
        onClick={() => setShow(!show)}
      >
        <MdUpdate size={25} className="text-gray-200" />
      </Button>
      {show && <AddYield userSession={userSession} yc={ycId} />} */}
    </div>
  );
};

export default UpdateYC;
