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
import { getUser } from "@/lib/_userActions";

import React from "react";

type UpdateCtcPageProps = {
  params: {
    userId: number;
  };
};

const UpdateCtcPage = async ({ params }: UpdateCtcPageProps) => {
  const res = await getUser(params.userId);
  const usr = await res?.data;

  /*   const res1 = await getAllCels();
  const cels = await res1?.data; */

  // console.log("USR:", usr);

  //const res1 = await getAllZones();
  //const allZones = await res1?.data;

  //console.log("params.zoneId", params.zoneId);
  //console.log("personId", params.personId);
  //console.log("PER", per);

  return (
    <PageLayout
      title="Editer un message"
      description="Cette page permet d'éditer un utilisateur"
    >
      <CustomBreadcrumb name="Editer un utilisateur" />
      <div className=" mx-auto p-2 rounded-b-lg ">
        <RegisterForm usr={usr} />
      </div>
    </PageLayout>
  );
};

export default UpdateCtcPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/users">Utilisateurs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
