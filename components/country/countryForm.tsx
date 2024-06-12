"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { toast } from "sonner";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { CountrySchema } from "@/lib/schemas";
import { createCountry, updateCountry } from "@/lib/_countryActions";
import { ContinentsList } from "@prisma/client";

type CountryFormProps = {
  ctr?: any;
};

const CountryForm = ({ ctr }: CountryFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //console.log("usr: ", usr);

  const form = useForm<z.infer<typeof CountrySchema>>({
    resolver: zodResolver(CountrySchema),
    defaultValues: {
      id: ctr?.id ? ctr.id : undefined,
      name: ctr ? ctr.name : "",
      continent: ctr ? ctr.continent : "AFRICA",
    },
  });
  /*   useEffect(() => {
    const fetchCels = async () => {
      const res = await getAllCels();
      const data = await res?.data;

      setCels(data);

      //console.log("data celes: ", data);
    };
    fetchCels();
  }, []); */

  //const client = form.watch("isClient");
  //const admin = form.watch("role");

  const procesForm = async (values: z.infer<typeof CountrySchema>) => {
    setLoading(true);
    //console.log("Value: ", values);
    //console.log("usr: ", usr);

    // const result = await registerUser(values);
    let res;
    if (ctr) res = await updateCountry(values);
    else res = await createCountry(values);

    // console.log("result registerForm:", result);
    //console.log("result registerForm:", result?.success);

    /*     if (result?.success) {
      //console.log({ data: result.data });
      toast.success("Utilisateur créé avec succès");
      form.reset();
      //  return;
    } else {
      //console.log(result?.error);
      toast.error(JSON.stringify(result?.error));
    } */

    /*     const res = await addGiAction(values);

    if (!res) {
      console.log("Une erreur est sub...");
    }

    if (res!.error) {
      //console.log(res!.error);
      return;
    }

    toast.success("Groupe d'impact créé avec succès.", {
      description: new Date().toISOString().split("T")[0],
    });
    setOpen(false); */

    //console.log("res:", res);

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

    if (ctr)
      toast.success(`Le pays a été mis à jour avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });
    else
      toast.success(`Le pays a été envoyé avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });

    setLoading(false);
    form.reset();
    router.push("/admin/countries");
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(procesForm)} className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem className="w-1/2">
                      <FormLabel>{"Nom du pays"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nom du pays"
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
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="w-full">
              {loading ? "En cours de traitemnt ..." : "Envoyer"}
            </Button>
          </div>
        </form>
      </Form>
      {/*       <p className="text-center m-2 underline">
        <Link className="text-sm " href="/admin/contacts">
          Voir tous les messages
        </Link>
      </p> */}
    </div>
  );
};

export default CountryForm;
