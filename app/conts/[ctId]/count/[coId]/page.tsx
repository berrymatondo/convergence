"use client";
import { usePathname } from "next/navigation";
import React from "react";

const PaysDetailPage = () => {
  const path = usePathname();
  return <div>PaysDetailPage - {path}</div>;
};

export default PaysDetailPage;
