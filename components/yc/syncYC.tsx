"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { syncYC } from "@/lib/_ycActions";

type SyncYCProps = {
  continent: any;
};

const SyncYC = ({ continent }: SyncYCProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <form
      action={() => {
        setLoading(true);
        syncYC(continent);
        setLoading(false);
      }}
    >
      <Button
        type="submit"
        variant="empty"
        className="border border-blue-800 dark:text-blue-800 bg-gray-100"
      >
        {loading ? "En cours de traitement" : "Mettre à jour les rendements"}
      </Button>
    </form>
  );
};

export default SyncYC;
