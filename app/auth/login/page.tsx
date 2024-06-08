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

const LoginPage = () => {
  return (
    <div>
      <AuthPageLayout
        title="Connexion"
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
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/auth/users">Utilisateurs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
