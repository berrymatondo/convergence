import AuthPageLayout from "@/components/auth/authPageLayout";
import React from "react";

const LoginPage = () => {
  return (
    <div>
      <AuthPageLayout
        title="Connexion"
        description="Cette page permet de se connecter à l'application"
        position="items-center"
      >
        <div className="max-w-[800px] mx-auto p-2 bg-yellow-400">
          Login
          {/*         <LoginForm />
           */}{" "}
        </div>
      </AuthPageLayout>
    </div>
  );
};

export default LoginPage;
