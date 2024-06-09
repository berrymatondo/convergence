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
import { ContactSchema } from "@/lib/schemas";
import { createContact, updateContact } from "@/lib/_contactActions";
import { Textarea } from "../ui/textarea";
import { ContactStatuses } from "@prisma/client";
import Link from "next/link";

type ContactFormProps = {
  ctc?: any;
};

const ContactForm = ({ ctc }: ContactFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  //console.log("usr: ", usr);

  const form = useForm<z.infer<typeof ContactSchema>>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      id: ctc?.id ? ctc.id : undefined,
      firstname: ctc ? ctc.firstname : "",
      lastname: ctc ? ctc.lastname : "",
      email: ctc ? ctc.email : "",
      message: ctc ? ctc.message : "",
      comments: ctc ? ctc.comments : "",
      status: ctc ? ctc.status : "NOUVEAU",
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

  const procesForm = async (values: z.infer<typeof ContactSchema>) => {
    setLoading(true);
    //console.log("Value: ", values);
    //console.log("usr: ", usr);

    // const result = await registerUser(values);
    let res;
    if (ctc) res = await updateContact(values);
    else res = await createContact(values);

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

    if (ctc)
      toast.success(`Le message a été mis à jour avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });
    else
      toast.success(`Le message a été envoyé avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });

    setLoading(false);
    form.reset();
    router.push("/contact");
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(procesForm)} className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between gap-4">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => {
                  return (
                    <FormItem className="w-1/2">
                      <FormLabel>{"Prénom"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer votre prénom"
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
                name="lastname"
                render={({ field }) => {
                  return (
                    <FormItem className="w-1/2">
                      <FormLabel>{"Nom"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer votre nom"
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
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Email"}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Entrer votre adresse mail"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Message"}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Entrer votre message ici"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {ctc && (
              <div className="flex justify-between gap-2">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>{"Message"}</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Entrer votre message ici"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-1/2">
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger id="framework">
                            <SelectValue placeholder="Sélectionner un statut" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {Object.values(ContactStatuses)?.map((ur: any) => (
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
            )}
          </div>
          <div className="flex gap-2">
            <Button type="submit" className="w-full">
              {loading ? "En cours de traitemnt ..." : "Envoyer"}
            </Button>
          </div>
        </form>
      </Form>
      <p className="text-center m-2 underline">
        <Link className="text-sm " href="/admin/contacts">
          Voir tous les messages
        </Link>
      </p>
    </div>
  );
};

export default ContactForm;
