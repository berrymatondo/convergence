"use client";
import { AreaChart, EventProps } from "@tremor/react";
import { useState } from "react";
import { BiCodeBlock } from "react-icons/bi";

const chartdata = [
  {
    date: "Jan 23",
    2022: 45,
    2023: 78,
  },
  {
    date: "Feb 23",
    2022: 52,
    2023: 71,
  },
  {
    date: "Mar 23",
    2022: 48,
    2023: 80,
  },
  {
    date: "Apr 23",
    2022: 61,
    2023: 65,
  },
  {
    date: "May 23",
    2022: 55,
    2023: 58,
  },
  {
    date: "Jun 23",
    2022: 67,
    2023: 62,
  },
  {
    date: "Jul 23",
    2022: 60,
    2023: 54,
  },
  {
    date: "Aug 23",
    2022: 72,
    2023: 49,
  },
  {
    date: "Sep 23",
    2022: 65,
    2023: 52,
  },
  {
    date: "Oct 23",
    2022: 68,
    2023: null,
  },
  {
    date: "Nov 23",
    2022: 74,
    2023: null,
  },
  {
    date: "Dec 23",
    2022: 71,
    2023: null,
  },
];

type AreaCharYieldCurveProps = {
  data: any[];
};

export default function AreaCharYieldCurve({ data }: AreaCharYieldCurveProps) {
  console.log("dataxxxx: ", data);

  //console.log(Object.keys(data[0])[0]);
  let index: string = "";
  let country: string = "";
  let contin: string = "";

  if (data.length > 0) {
    index = Object?.keys(data[0])[0];
    country = Object?.keys(data[0])[1];
    contin = Object?.keys(data[0])[2];
  }

  const [value, setValue] = useState<EventProps>(null);
  return (
    <div className="flex justify-center ">
      {data && index && (
        <AreaChart
          className=" mt-4 h-72"
          data={data}
          index={index}
          categories={[country, contin]}
          colors={["orange", "green"]}
          yAxisWidth={30}
          onValueChange={(v) => setValue(v)}
          connectNulls={true}
        />
      )}
      {/*       <pre className="rounded-lg bg-dark-tremor-brand-faint p-8 text-white md:w-1/4">
        <code>{JSON.stringify(value, null, 2)}</code>
      </pre> */}
      {/*       <BiCodeBlock
        source={JSON.stringify(value, null, 2)}
        variant="empty"
        className="mt-8"
      /> */}
    </div>
  );
}
