import AuthPageLayout from "@/components/auth/authPageLayout";
import React from "react";

const ContactPage = () => {
  return (
    <AuthPageLayout
      title="Contact Us"
      description="We are available to answer your questions"
    >
      <div className="border border-blue-400/40 w-full">Contact us now</div>
    </AuthPageLayout>
  );
};

export default ContactPage;
