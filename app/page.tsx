import AreaChartUsageExampleWithClickEvent from "@/components/nav/area-charts";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    /*     <div className="flex min-h-screen flex-col items-center justify-between p-24">
     */ <div className="container py-24 max-md:py-4 flex flex-col gap-4 justify-center my-auto bg-gray-100 dark:bg-transparent">
      <p className="text-center py-4 text-6xl text-teal-600 font-semibold">
        Emerging Markets
      </p>
      <p className="text-center  text-xl">
        {"Connecting You To Tomorrow’s Market Leaders"}
      </p>
      <p className="text-center my-4">
        <Link
          href="/auth/login"
          className="text-white py-4 px-8 font-semibold bg-gradient-to-r from-purple-600 to-orange-600 rounded-lg"
        >
          START HERE !
        </Link>
      </p>
      <AreaChartUsageExampleWithClickEvent />
    </div>
  );
}
