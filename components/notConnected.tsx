import Link from "next/link";
import React from "react";

const NotConnected = () => {
  return (
    <div className="text-center py-24">
      <p>You are not connected</p>
      <p>
        Please,{" "}
        <Link className="text-sky-600 hover:text-sky-400" href="/auth/login">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default NotConnected;
