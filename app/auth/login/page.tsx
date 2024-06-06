import AuthPageLayout from "@/components/auth/authPageLayout";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      <AuthPageLayout
        title="Liste des adresses hôtes des cellules d'impact"
        description="La liste de toutes les adresses hôtes des cellules d'impact"
      >
        <div className="max-w-[800px] mx-auto p-2">
          Login
          {/*         <LoginForm />
           */}{" "}
        </div>
      </AuthPageLayout>
    </div>
  );
};

export default LoginPage;
