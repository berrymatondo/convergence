import AuthPageLayout from "@/components/auth/authPageLayout";
import RegisterForm from "@/components/auth/registerForm";
import PageLayout from "@/components/pageLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const RagisterPage = () => {
  return (
    <AuthPageLayout
      title="Création utilisateur"
      position="items-center"
      descPosition="items-center"
      description="Cette page permet de créer un nouvel utilisateur du système"
    >
      {/*       <CustomBreadcrumb name="Nouvel utilisateur" />
       */}
      <div className="max-w-[800px] mx-auto p-2">
        <RegisterForm />{" "}
      </div>
    </AuthPageLayout>
  );
};

export default RagisterPage;

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
