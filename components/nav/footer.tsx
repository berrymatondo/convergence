import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    /*     <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
     */ <div className="">
      <p className="text-center text-sm">
        &copy; 2024{" "}
        <Link
          className="hover:text-yellow-600 hover:cursor-pointer"
          href="https://emergingmarkets.com"
          target="_blank"
        >
          emergingmarkets.com
        </Link>{" "}
      </p>
    </div>
  );
};

export default Footer;
