"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Price22",
    color: "hsl(var(--chart-2))",
  },
  desktop23: {
    label: "Price23",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type FundViewsProps = {
  fund: any;
  funds?: any;
  fund23?: any;
};
const FundViews = async ({ fund, funds, fund23 }: FundViewsProps) => {
  //console.log("fund:", fund);
  //console.log("fund23:", fund23);

  console.log("fund.historicalDataFund:", fund.historicalDataIndex);
  let fundH;
  let fund23H;
  let tempo = [];
  if (fund?.historicalDataIndex) {
    fundH = [...fund.historicalDataIndex];
    fund23H = [...fund23.historicalDataIndex];

    for (let i = 0; i < fundH.length && i < 500; i++) {
      tempo.push({
        date: fundH[i].date,
        desktop: fundH[i].close.toFixed(2),
        desktop23: fundH[i].close.toFixed(2),
      });
    }

    tempo.sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date));
    /*     console.log(
      tempo.sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date))
    ); */
  }

  return (
    <Card className="border-none  w-full">
      <CardHeader>
        <CardTitle className="text-sky-700 dark:text-sky-500"></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <ChartContainer style={{ width: "100%" }} config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={tempo}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <YAxis domain={["dataMin", "dataMax"]} tickMargin={8} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="desktop"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.2}
              stroke="var(--color-desktop)"
            />
            <Area
              dataKey="desktop23"
              type="linear"
              fill="var(--color-desktop23)"
              fillOpacity={0.2}
              stroke="var(--color-desktop23)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default FundViews;
