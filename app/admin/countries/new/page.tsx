import ContactFormDelete from "@/components/contact/contactFormDelete";
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
import UserFormDelete from "@/components/user/userFormDelete";
import { getContact } from "@/lib/_contactActions";
import { getUser } from "@/lib/_userActions";

import React from "react";

const AddCtcPage = async () => {
  return (
    <PageLayout
      title="Ajouter un pays"
      description="Cette page permet d'ajouter un pays dans le système'"
    >
      <CustomBreadcrumb name="Ajouter pays" />
      <div className="max-w-[800px] m-auto p-4 rounded-lg border ">
        <CountryForm />
      </div>
    </PageLayout>
  );
};

export default AddCtcPage;

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
