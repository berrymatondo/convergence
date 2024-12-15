import AreaChartUsageExampleWithClickEvent from "@/components/nav/area-charts";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import im from "../public/cap1.jpg";

export default function Home() {
  return (
    /*     <div className="flex min-h-screen flex-col items-center justify-between p-24">
     */ <div className="container py-48 max-md:py-4 flex max-md:flex-col gap-4 justify-between my-auto bg-gray-100 dark:bg-transparent">
      {/*       <p className="text-center py-4 max-md:text-4xl text-6xl text-teal-600 font-semibold">
        Emerging Markets
      </p> */}
      <div className="md:w-1/2 flex flex-col gap-8 max-md:gap-4">
        <p className="text-center py-4 max-md:text-4xl text-6xl  font-semibold">
          {/* {"Connecting You To Tomorrow’s Market Leaders"} */}
          The{" "}
          <span className="bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
            Next-Generation Financial Tool
          </span>{" "}
          to{" "}
          <span className="bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">
            Empower
          </span>{" "}
          {"Tomorrow's Global Market Leaders"}
        </p>
        <p className="flex justify-center mx-auto w-full md:w-3/4 py-2 bg-gradient-to-r from-purple-600 to-orange-600 rounded-lg my-4 hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500 hover:cursor-pointer">
          <Link
            href="/auth/login"
            className="bgw-full text-white  px-8 max-md:px-4 max-md:py-2 font-semibold "
          >
            START HERE !
          </Link>
        </p>
      </div>
      <div className="md:w-1/2">
        <Image
          alt="bcg"
          src={im}
          placeholder="blur"
          quality={100}
          sizes="100vw"
          className="object-cover -z-10 "
        />
      </div>
      {/*       <AreaChartUsageExampleWithClickEvent />
       */}{" "}
    </div>
  );
}
