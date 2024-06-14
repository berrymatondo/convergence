import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <p className="text-center">
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
