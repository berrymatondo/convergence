import AuthPageLayout from "@/components/auth/authPageLayout";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LoginForm from "@/components/auth/loginForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await auth();

  if (session?.user) redirect("/admin/countries");

  return (
    <div>
      <AuthPageLayout
        title="Login"
        position="items-center"
        descPosition="items-center"
        description="Cette page permet de se connecter à l'application"
      >
        {/*         <CustomBreadcrumb name="Connexion" />
         */}{" "}
        <div className="max-w-[800px] mx-auto p-2">
          <LoginForm />{" "}
        </div>
      </AuthPageLayout>
    </div>
  );
};

export default LoginPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/auth/users">Users</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
