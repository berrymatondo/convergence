import ContactFormDelete from "@/components/contact/contactFormDelete";
import CountryFormDelete from "@/components/country/countryFormDelete";
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

import React from "react";

type DeleteCtrPageProps = {
  params: {
    countryId: number;
  };
};

const DeleteCtrPage = async ({ params }: DeleteCtrPageProps) => {
  const res = await getCountry(params.countryId);
  const ctr = await res?.data;
  //console.log("params.zoneId", params.zoneId);
  console.log("ctr", ctr);

  return (
    <PageLayout
      title="Supprimer un pays"
      description="Cette page permet de supprimer un pays"
    >
      <CustomBreadcrumb name="Suppression pays" />
      <div className="max-w-[800px] m-auto p-4 rounded-lg border ">
        <CountryFormDelete ctr={ctr} />
      </div>
    </PageLayout>
  );
};

export default DeleteCtrPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  ">
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
