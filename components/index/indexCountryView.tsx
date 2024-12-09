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

const chartConfig = {
  desktop: {
    label: "Price",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type IndexCountryViewProps = {
  equities?: any;
};
const IndexCountryView = async ({ equities }: IndexCountryViewProps) => {
  //console.log("commo:", equities);

  //console.log("commo.historicalDataCommo:", commo.historicalDataCommo);
  let fxsH: any = [];

  for (let i = 0; i < equities.length && i < 220; i++) {
    fxsH.push(equities[i]);
  }

  //console.log("tempo:", fxsH);

  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="text-sky-700 dark:text-sky-500"></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <ChartContainer
          style={{ width: "100%", maxHeight: "200px" }}
          config={chartConfig}
        >
          <AreaChart
            accessibilityLayer
            data={fxsH.reverse()}
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
              dataKey="close"
              type="linear"
              fill="var(--color-desktop)"
              fillOpacity={0.2}
              stroke="var(--color-desktop)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default IndexCountryView;
