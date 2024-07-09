"use client";

import { TrendingUp } from "lucide-react";
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
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Change",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type commoViewsProps = {
  commo: any;
};
const commoViews = ({ commo }: commoViewsProps) => {
  //console.log("commo:", commo);

  //console.log("commo.historicalDataCommo:", commo.historicalDataCommo);
  let commoH;
  let tempo = [];
  if (commo?.historicalDataCommo) {
    commoH = [...commo.historicalDataCommo];

    for (let i = 0; i < commoH.length && i < 10; i++) {
      tempo.push({
        date: commoH[i].date,
        //desktop: i,
        desktop: commoH[i].changePercentage.toFixed(2),
      });
    }

    tempo.sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date));
  }

  // console.log("tempo:", tempo);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sky-700 dark:text-sky-500">
          Area Chart - Linear
        </CardTitle>
        <CardDescription>Showing values of the last 10 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
            <YAxis tickMargin={8} />
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
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default commoViews;
