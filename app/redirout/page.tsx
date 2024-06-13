"use client";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/_userActions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const SignOutPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  console.log("OUT ");

  // await signOut();
  //logoutUser();

  console.log("OUT 2");
  // redirect("/redirect");

  return (
    <form
      action={async () => {
        logoutUser();
        // console.log("in");

        //window.location.reload;
        console.log("out");
        router.refresh();
      }}
    >
      {session && session.user && (
        <Button
          className="md:hidden px-2 bg-gray-600"
          // onClick={() => router.push("/redirout")}
          variant="empty"
          type="submit"
        >
          CONFIRMER
        </Button>
      )}
      {!session && (
        <p className=" text-center">
          <Link className="underline " href="/">
            {"Retour à la page d'accueil"}
          </Link>
        </p>
      )}
    </form>
  );
};

export default SignOutPage;
