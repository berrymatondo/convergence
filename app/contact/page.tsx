import { auth } from "@/auth";
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

const ContactPage = async () => {
  const session = await auth();

  return (
    <AuthPageLayout
      title="Contact Us"
      position="items-center"
      descPosition="items-center"
      description="We are available to help you"
    >
      {/*       <CustomBreadcrumb name="Nouveau Message" />
       */}{" "}
      <div className="max-w-[800px] mx-auto p-2">
        <ContactForm userSession={session} />{" "}
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
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
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
