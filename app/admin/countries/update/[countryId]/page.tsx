import RegisterForm from "@/components/auth/registerForm";
import CountryForm from "@/components/country/countryForm";
import PageLayout from "@/components/pageLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCountry } from "@/lib/_countryActions";
import { getUser } from "@/lib/_userActions";

import React from "react";

type UpdateCtrPageProps = {
  params: {
    countryId: number;
  };
};

const UpdateCtrPage = async ({ params }: UpdateCtrPageProps) => {
  const res = await getCountry(params.countryId);
  const ctr = await res?.data;

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
      title="Editer un pays"
      description="Cette page permet d'éditer un pays"
    >
      <CustomBreadcrumb name="Editer un pays" />
      <div className=" mx-auto p-2 rounded-b-lg ">
        <CountryForm ctr={ctr} />
      </div>
    </PageLayout>
  );
};

export default UpdateCtrPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/countries">Pays</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
