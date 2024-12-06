"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

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
    color: "hsl(var(--chart-3))",
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

    // console.log("fund23H", fund23H);

    for (let i = 0; i < fundH.length && i < 200; i++) {
      tempo.push({
        date: fundH[i].date,
        desktop: fundH[i].close.toFixed(2),
        desktop23: fund23H[i].close.toFixed(2),
        /*    fund23H.length > 0
            ? fund23H[i].close.toFixed(2)
            : (fundH[i].close + 1).toFixed(2), */
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
          <LineChart
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
            <YAxis
              yAxisId="left-axis"
              domain={["dataMin", "dataMax"]}
              tickMargin={8}
            />
            <YAxis
              yAxisId="right-axis"
              domain={[0, "dataMax + 50"]}
              tickMargin={8}
              orientation="right"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />

            <Line
              dataKey="desktop"
              yAxisId="left-axis"
              type="linear"
              //  fill="var(--color-desktop)"
              //   fillOpacity={0.2}
              stroke="var(--color-desktop)"
              dot={false}
            />
            <Line
              dataKey="desktop23"
              yAxisId="right-axis"
              type="linear"
              //   fill="var(--color-desktop23)"
              //   fillOpacity={0.2}
              stroke="var(--color-desktop23)"
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default FundViews;

/* 
<YAxis type="number" domain={['dataMin', 'dataMax']} />
<YAxis type="number" domain={[0, 'dataMax']} />
<YAxis type="number" domain={['auto', 'auto']} />
<YAxis type="number" domain={[0, 'dataMax + 1000']} />
<YAxis type="number" domain={['dataMin - 100', 'dataMax + 100']} />
<YAxis type="number" domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} /> */
