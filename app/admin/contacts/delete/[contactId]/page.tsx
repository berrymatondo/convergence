import ContactFormDelete from "@/components/contact/contactFormDelete";
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

type DeleteCtcPageProps = {
  params: {
    contactId: number;
  };
};

const DeleteCtcPage = async ({ params }: DeleteCtcPageProps) => {
  const res = await getContact(params.contactId);
  const ctc = await res?.data;
  //console.log("params.zoneId", params.zoneId);
  //console.log("USR", usr);

  return (
    <PageLayout
      title="Supprimer un message"
      description="Cette page permet de supprimer un message"
    >
      <CustomBreadcrumb name="Suppression message" />
      <div className="max-w-[800px] m-auto p-4 rounded-lg border ">
        <ContactFormDelete ctc={ctc} />
      </div>
    </PageLayout>
  );
};

export default DeleteCtcPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  ">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/admin/contacts">Messages</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
