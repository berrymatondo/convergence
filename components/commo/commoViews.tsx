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
import { ScrollArea } from "../ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import HistoCommoItem from "./histoCommoItem";
import { Suspense } from "react";
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
  commos?: any;
};
const commoViews = async ({ commo, commos }: commoViewsProps) => {
  //console.log("commo:", commo);

  //console.log("commo.historicalDataCommo:", commo.historicalDataCommo);
  let commoH;
  let tempo = [];
  if (commo?.historicalDataCommo) {
    commoH = [...commo.historicalDataCommo];

    for (let i = 0; i < commoH.length && i < 500; i++) {
      tempo.push({
        date: commoH[i].date,
        //desktop: i,
        desktop: commoH[i].close.toFixed(2),
      });
    }

    tempo.sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date));
  }

  //console.log("tempo:", tempo.length);

  return (
    <Card className="border-none">
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
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        {/*        <ScrollArea className="mt-4 w-full h-60 max-md:h-[20rem] pr-2">
          <Table>
            <TableHeader className="">
              <TableRow className="">
                <TableHead className="max-md:w-[100px] md:pl-4">Date</TableHead>
                <TableHead className="text-center">Close</TableHead>
                <TableHead className="text-center">Change</TableHead>
                <TableHead className="text-right md:pr-4">Change %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="">
              {commo?.historicalDataCommo
                ?.sort(
                  (a: any, b: any) => Date.parse(b.date) - Date.parse(a.date)
                )
                .map((histoCommo: any) => (
                  <HistoCommoItem histoCommo={histoCommo} key={histoCommo.id} />
                ))}
            </TableBody>
          </Table>
        </ScrollArea> */}
      </CardFooter>
    </Card>
  );
};

export default commoViews;
