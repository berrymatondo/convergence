"use client";
import React, { useState } from "react";
import { MdClose, MdDelete } from "react-icons/md";
import { Button } from "../ui/button";
import { deleteGo } from "@/lib/_goActions";
import { deleteYc, syncYC } from "@/lib/_ycActions";
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
import { Form } from "../ui/form";

type DeleteYCProps = {
  ycId: number;
  continent: string;
  openDialog: boolean;
};
const DeleteYC = ({ ycId, continent, openDialog }: DeleteYCProps) => {
  const [open, setOpen] = useState(openDialog);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="empty">
          <MdDelete size={25} className="text-red-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span>Supprimer un rendement</span>
            <span>
              <MdClose
                size={25}
                className="text-red-600"
                onClick={() => setOpen(!open)}
              />
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette transaction permet de supprimer in rendement.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className=" w-full flex justify-center  p-4 my-2  rounded-lg">
          <Button
            onClick={() => {
              setOpen(!open);
            }}
            variant="empty"
            className="w-full text-red-400"
          >
            {"Annuler"}
          </Button>

          <form>
            <Button
              type="submit"
              formAction={() => {
                "use serer";
                deleteYc(ycId);
                syncYC(continent);
                setOpen(!open);
              }}
            >
              Confirmer
            </Button>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>

    /*     <form>
      <Button
        type="submit"
        variant="empty"
        formAction={() => {
          "use serer";
          deleteYc(ycId);
          syncYC(continent);
        }}
      >
        <MdDelete size={25} className="text-red-600" />
      </Button>
    </form> */
  );
};

export default DeleteYC;
