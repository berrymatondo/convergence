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
import { GoSchema } from "@/lib/schemas";
import { createGO, updateGO } from "@/lib/_goActions";
import { useRouter } from "next/navigation";

type AddGeneralOverviewProps = {
  go?: any;
  countryId: any;
};

const AddGeneralOverview = ({ go, countryId }: AddGeneralOverviewProps) => {
  const [add, setAdd] = useState(go ? false : true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  //console.log("countryId", countryId);
  //console.log("go", go);

  const form = useForm<z.infer<typeof GoSchema>>({
    resolver: zodResolver(GoSchema),
    defaultValues: {
      id: go?.id ? go.id : undefined,
      key: go ? go.key : "",
      value: go ? go.value : "",
      order: "0",
      countryId: +countryId,
    },
  });

  const procesForm = async (values: z.infer<typeof GoSchema>) => {
    setLoading(true);
    console.log("Value: ", values);
    //console.log("usr: ", usr);

    let res;
    if (go) res = await updateGO(values);
    else res = await createGO(values);

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

    if (go)
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
        General Overview
      </h1>
      {add ? (
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
      )}
      {!add && (
        <div className="flex justify-center bg-black p-4 my-2 border rounded-lg">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(procesForm)}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-4">
                  <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Libellé"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer le libellé"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2">
                          <FormLabel>{"Valeur"}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Entrer la valeur"
                              type="text"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="order"
                  render={({ field }) => {
                    return (
                      <FormItem className="hidden">
                        <FormLabel>{"Numéro d'ordre"}</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Entrer le numéro d'ordre"
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
              </div>
              <div className="flex gap-2">
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

export default AddGeneralOverview;
