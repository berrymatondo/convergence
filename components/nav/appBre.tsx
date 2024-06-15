import { auth, signIn, signOut } from "@/auth";
import React from "react";
import Link from "next/link";

const AppBre = async () => {
  const session = await auth();
  return (
    <div className="  gap-2">
      {session && session.user && (
        <div className="ml-auto">
          {session && session.user ? (
            <div>
              <div className="flex justify-between">
                <p>
                  <span className="text-xs">Welcome, </span>
                  <span className="text-blue-600 text-sm font-semibold">
                    {session?.user?.name}
                  </span>
                </p>

                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                >
                  <button
                    className="m-1 p-1 text-xs text-white bg-red-600 rounded-full"
                    type="submit"
                  >
                    Se Déconnecter
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <Link href="/auth/login">Sing IN</Link>
            /*          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <Button type="submit">Sign in</Button>
          </form> */
          )}
        </div>
      )}
    </div>
  );
};

export default AppBre;
