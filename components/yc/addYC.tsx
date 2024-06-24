"use client";
import React, { useState } from "react";
import { MdAdd, MdClose, MdDelete, MdUpdate } from "react-icons/md";
import { Button } from "../ui/button";
import { deleteGo } from "@/lib/_goActions";
import {
  createYC,
  deleteYc,
  syncYC,
  syncYCConti,
  updateYC,
} from "@/lib/_ycActions";
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
import { usePathname, useRouter } from "next/navigation";
import { YcSchema } from "@/lib/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type AddYCProps = {
  yc?: any;
  countryId?: any;
  continent?: any;
  userSession: any;
  openDialog: boolean;
};

const AddYC = ({
  yc,
  userSession,
  countryId,
  continent,
  openDialog,
}: AddYCProps) => {
  const [open, setOpen] = useState(openDialog);
  const [show, setShow] = useState(false);
  const [upd, setUpd] = useState(true);
  const [add, setAdd] = useState(yc ? false : true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const usr: any = userSession?.user;

  //console.log("yc", yc);
  // console.log("add", add);

  const pathname = usePathname();
  //console.log("pathname", pathname);

  const conti = pathname.split("continents/")[1];

  /*   console.log(
    "DATE",
    yc.date.toLocaleDateString().split("/").reverse().join("-")
  );
 */
  const form = useForm<z.infer<typeof YcSchema>>({
    resolver: zodResolver(YcSchema),
    defaultValues: {
      id: yc?.id ? yc.id : undefined,
      tenor: yc ? yc.tenor.toString() : "",
      yld: yc ? yc.yield.toString() : "",
      date: yc
        ? yc.date.toLocaleDateString().split("/").reverse().join("-")
        : undefined,
      //date: "2024-06-21",

      countryId: countryId ? +countryId : undefined,
      continent: conti ? conti : "",
      //  isContinent: yc?.isContinent ? yc?.isContinent : false,
    },
  });

  const procesForm = async (values: z.infer<typeof YcSchema>) => {
    //console.log("LOAD: ", loading);
    //console.log("UPD: ", upd);

    //if (!upd) return;

    setLoading(true);
    //console.log("Value: ", values);
    //console.log("usr: ", usr);YcSchema
    let res;
    if (yc) res = await updateYC(values);
    else res = await createYC(values);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    if (res?.error) {
      //console.log(res?.error);
      setLoading(false);
      toast.error(` ${res?.error}`, {
        description: new Date().toISOString().split("T")[0],
      });
      return;
    }

    if (yc)
      toast.success(`La donnée a été mise à jour avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });
    else {
      //console.log("RES", res);
      syncYCConti(res?.data?.continent as string, res?.data?.tenor as number);
      toast.success(`La donnée a été créée avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });
    }

    syncYC(conti);

    setLoading(false);
    form.reset();
    setAdd(true);
    setOpen(false);
    setUpd(true);
    //router.push("/admin/countries");
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <div
          onClick={() => setOpen(!open)}
          className="w-full flex justify-end mb-2"
        >
          <Button
            variant="empty"
            className="bg-teal-600 rounded-full p-1 px-2 mx-3"
          >
            <MdAdd size={25} className="text-white" />
          </Button>
        </div>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
              <span>Nouveau rendement</span>
              <span>
                <MdClose
                  size={25}
                  className="text-red-600"
                  onClick={() => setOpen(!open)}
                />
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              {"Cette transaction permet d'enregistrer de nouveaux rendements"}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-center  p-4 my-2  rounded-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(procesForm)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex justify-between gap-4">
                    <FormField
                      control={form.control}
                      name="tenor"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2">
                            <FormLabel>{"Tenor"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrer le Tenor"
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="yld"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2">
                            <FormLabel>{"Yield"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrer la yield"
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <div className="flex justify-between gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2">
                            <FormLabel>{"Date"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrer le Tenor"
                                type="date"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    {conti && (
                      <FormField
                        control={form.control}
                        name="continent"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel>{"Continent"}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Entrer le Tenor"
                                  type="text"
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="md:flex md:gap-2">
                  <Button
                    onClick={() => {
                      setUpd(false);
                      setOpen(!open);
                      //  setLoading(false);
                      //  form.reset();
                    }}
                    variant="empty"
                    className="w-full text-red-400"
                  >
                    {"Annuler"}
                  </Button>
                  <AlertDialogFooter>
                    <Button type="submit">
                      {loading ? "En cours de traitemnt ..." : "Enregistrement"}
                    </Button>
                  </AlertDialogFooter>
                </div>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddYC;
