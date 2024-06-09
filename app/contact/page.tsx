import AuthPageLayout from "@/components/auth/authPageLayout";
import ContactForm from "@/components/contact/contactForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const ContactPage = () => {
  return (
    <AuthPageLayout
      title="Contactez-nous"
      position="items-center"
      descPosition="items-center"
      description="Nous sommes disponibles pour vous aider"
    >
      {/*       <CustomBreadcrumb name="Nouveau Message" />
       */}{" "}
      <div className="max-w-[800px] mx-auto p-2">
        <ContactForm />{" "}
      </div>
    </AuthPageLayout>
  );
};

export default ContactPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2 ">
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
