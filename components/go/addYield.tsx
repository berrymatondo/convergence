"use client";
import React, { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { YcSchema } from "@/lib/schemas";
import { createGO, updateGO } from "@/lib/_goActions";
import { usePathname, useRouter } from "next/navigation";
import { createYC } from "@/lib/_ycActions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ContinentsList } from "@prisma/client";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type AddYieldProps = {
  yc?: any;
  countryId?: any;
  continent?: any;
  userSession: any;
};

const AddYield = ({ yc, countryId, continent, userSession }: AddYieldProps) => {
  const [add, setAdd] = useState(yc ? false : true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const usr: any = userSession?.user;

  //console.log("continent", continent);

  //console.log("countryId", countryId);
  console.log("yc", yc);

  const pathname = usePathname();
  console.log("pathname", pathname);

  const conti = pathname.split("continents/")[1];

  const form = useForm<z.infer<typeof YcSchema>>({
    resolver: zodResolver(YcSchema),
    defaultValues: {
      id: yc?.id ? yc.id : undefined,
      tenor: yc ? yc.tenor : "",
      yld: yc ? yc.yld : "",

      countryId: countryId ? +countryId : undefined,
      continent: conti ? conti : "",
      //  isContinent: yc?.isContinent ? yc?.isContinent : false,
    },
  });

  // const conti = form.watch("isContinent");

  const procesForm = async (values: z.infer<typeof YcSchema>) => {
    setLoading(true);
    console.log("Value:", values);
    //console.log("usr: ", usr);YcSchema
    let res;
    if (yc) res = await createYC(values);
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

    setLoading(false);
    form.reset();
    setAdd(true);
    //router.push("/admin/countries");
  };

  return (
    <div className="relative border-b border-white/30 mb-2 ">
      <h1 className=" uppercase text-center mb-2 text-teal-600 font-semibold">
        Yield Curve
      </h1>
      {usr?.role == "ADMIN" ? (
        add ? (
          <MdAdd
            onClick={() => setAdd(!add)}
            size={25}
            className="bg-teal-600 p-1 rounded-full absolute right-0 top-0 "
          />
        ) : (
          <MdRemove
            onClick={() => setAdd(!add)}
            size={25}
            className="bg-red-600 p-1 rounded-full absolute right-0 top-0 "
          />
        )
      ) : (
        ""
      )}
      {!add && (
        <div className="flex justify-center bg-teal-600/40 p-4 my-2 border rounded-lg">
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

                {/*                 <FormField
                  control={form.control}
                  name="isContinent"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                                        <Input
                        {...field}
                        placeholder="Confirmer le mot de passe"
                        type="password"
                      /> 
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label className="ml-2" htmlFor="isAdmin">
                          Continent ?{" "}
                          <span className="">
                            {field.value ? "OUI " : "NON "}
                          </span>
                        </Label>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                /> */}

                {continent && (
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

                  /*                   <FormField
                    control={form.control}
                    name="continent"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>Continent</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger id="framework">
                              <SelectValue placeholder="Sélectionner un continent" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                              {Object.values(ContinentsList)?.map((ur: any) => (
                                <SelectItem key={ur} value={ur}>
                                  {ur}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>

                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  /> */
                )}
                {/* 
                {!continent && (
                  <FormField
                    control={form.control}
                    name="countryId"
                    render={({ field }) => {
                      return (
                        <FormItem className="hidden">
                          <FormLabel>{"countryId"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer votre message ici"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                )} */}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setLoading(!loading);
                    form.reset();
                  }}
                  variant="empty"
                  className="w-full"
                >
                  {"Reinitialiser"}
                </Button>
                <Button type="submit" className="w-full">
                  {loading ? "En cours de traitemnt ..." : "Enregistrer"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AddYield;
