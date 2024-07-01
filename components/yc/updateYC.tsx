"use client";
import React, { useEffect, useState } from "react";
import { MdClose, MdDelete, MdUpdate } from "react-icons/md";
import { Button } from "../ui/button";
import { deleteGo } from "@/lib/_goActions";
import {
  createYC,
  deleteYc,
  getYC,
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

type UpdateYCProps = {
  yc?: any;
  tenor: number;
  countryId?: any;
  continent?: any;
  userSession: any;
  openDialog: boolean;
};

const UpdateYC = ({
  yc,
  tenor,
  userSession,
  countryId,
  continent,
  openDialog,
}: UpdateYCProps) => {
  const [open, setOpen] = useState(openDialog);
  const [readYC, setReadYC] = useState(yc);
  const [show, setShow] = useState(false);
  const [upd, setUpd] = useState(true);
  const [add, setAdd] = useState(yc ? false : true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const usr: any = userSession?.user;

  //console.log("yc", yc);

  const pathname = usePathname();
  console.log("pathname", pathname);

  const conti = pathname.split("continents/")[1];

  /*   console.log(
    "DATE",
    yc.date.toLocaleDateString().split("/").reverse().join("-")
  );
 */
  const form = useForm<z.infer<typeof YcSchema>>({
    resolver: zodResolver(YcSchema),
    defaultValues: {
      id: yc?.id ? readYC?.id : undefined,
      tenor: yc ? readYC?.tenor.toString() : "",
      yld: yc ? readYC?.yield.toString() : "",
      date: yc
        ? // ? yc.date.toLocaleDateString().split("/").reverse().join("-")
          readYC?.date
        : undefined,
      //date: "2024-06-21",

      countryId: countryId ? +countryId : undefined,
      continent: conti ? conti : "",
      //  isContinent: yc?.isContinent ? yc?.isContinent : false,
    },
  });

  useEffect(() => {
    const fetchYCToUpdate = async (idd: any) => {
      const resu = await getYC(idd);
      const dat = resu?.data;
      setReadYC(dat);

      //  console.log("IDd ", dat);
    };
    if (yc) fetchYCToUpdate(yc.id);
  }, [form, yc.id, yc]);
  //console.log("YC ", yc);

  const procesForm = async (values: z.infer<typeof YcSchema>) => {
    // console.log("LOAD: ", loading);
    //  console.log("UPD: ", upd);

    if (!upd) return;

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
    else
      toast.success(`La donnée a été créée avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });

    if (continent) syncYCConti(continent, tenor);

    setLoading(false);
    form.reset();
    //setAdd(true);
    setOpen(false);
    setUpd(true);
    //router.refresh();
    window.location.reload();
  };

  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="empty">
            <MdUpdate size={25} className="text-gray-400" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
              <span>Mettre à jour la courbe de rendement</span>
              <span>
                <MdClose
                  size={25}
                  className="text-red-600"
                  onClick={() => setOpen(!open)}
                />
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Cette transaction permet de mettre à jour la courbe de rendement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {!add && (
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
                        {loading
                          ? "En cours de traitemnt ..."
                          : "Enregistrement"}
                      </Button>
                    </AlertDialogFooter>
                  </div>
                </form>
              </Form>
            </div>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UpdateYC;
