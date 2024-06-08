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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
/* import { LoginSchema } from "@/schemas";
import { loginUser, loginlogin } from "@/actions/login"; */
import { useRouter } from "next/navigation";
import { LoginSchema } from "@/lib/schemas";
import { loginlogin } from "@/lib/_userActions";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  //const { name, setName } = useUserStore();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const procesForm = async (values: z.infer<typeof LoginSchema>) => {
    setLoading(true);
    //console.log("Value:", values);

    const result = await loginlogin(values);

    //

    //console.log("RESRES:", result);

    if (result?.error) {
      toast.error(result?.error.toString());
    }
    //console.log("result registerForm:", result);
    //console.log("result registerForm:", result?.success);

    /*     if (result?.success) {
      //console.log({ data: result.data });
      toast.success("Utilisateur créé avec succès");
      form.reset();
      return;
    } else {
      //console.log(result?.error);
      toast.error(JSON.stringify(result?.error));
    } */

    // const session = await auth();
    // console.log("session user Name:", session?.user);

    setLoading(false);
  };

  return (
    <div
      /*       headerLabel="Se connecter à la plateforme"
      backButtonLabel="Je n'ai pas encorede compte"
      title="Connexion"
      backButtonHref="/auth/login" */
      className="max-md:p-2 md:container"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(procesForm)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Utilisateur"}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Entrer l'utilisateur"
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
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Mot de passe"}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Entrer un mot de passe"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? "En cours de connexion ..." : "Se Connecter"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
