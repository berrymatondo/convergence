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

export default function AreaChartUsageExampleWithClickEvent() {
  const [value, setValue] = useState<EventProps>(null);
  return (
    <div className="flex justify-center ">
      <div className="p-2 flex max-md:flex-col bg-gray-200 dark:bg-dark-tremor-background my-4 rounded-lg w-full md:w-1/2 justify-center ">
        {/*       <h3 className="my-2 text-center text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Closed Pull Requests
      </h3> */}
        <AreaChart
          className="mt-4 h-72"
          data={chartdata}
          index="date"
          categories={["2022", "2023"]}
          colors={["blue", "red"]}
          yAxisWidth={30}
          onValueChange={(v) => setValue(v)}
          connectNulls={true}
        />
        {/*       <pre className="rounded-lg bg-dark-tremor-brand-faint p-8 text-white md:w-1/4">
        <code>{JSON.stringify(value, null, 2)}</code>
      </pre> */}
        {/*       <BiCodeBlock
        source={JSON.stringify(value, null, 2)}
        variant="empty"
        className="mt-8"
      /> */}
      </div>
    </div>
  );
}
