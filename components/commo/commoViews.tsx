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
    color: "hsl(var(--chart-2))",
  },
  mobile: {
    label: "Price",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

type commoViewsProps = {
  commo: any;
  commos?: any;
};
const commoViews = async ({ commo, commos }: commoViewsProps) => {
  //console.log("commo:", commo?.length);
  //console.log("commo:", commo[0]?.close, commo[commo?.length - 1]?.close);
  const t0 = +commo[0]?.close;
  const t1 = +commo[commo?.length - 1]?.close;

  //console.log("to", t0, t1);

  //if (t0 < t1) console.log("red");
  // else console.log("green");

  //console.log("commo.historicalDataCommo:", commo.historicalDataCommo);
  /*   let commoH;
  let tempo = [];
  if (commo?.historicalDataCommo) {
    commoH = [...commo.historicalDataCommo];

    for (let i = 0; i < commoH.length && i < 500; i++) {
      tempo.push({
        date: commoH[i].date,
        desktop: commoH[i].close.toFixed(2),
      });
    }

    tempo.sort((a: any, b: any) => Date.parse(a.date) - Date.parse(b.date));
  }
 */
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
            data={commo}
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
              fill={t0 < t1 ? "var(--color-mobile)" : "var(--color-desktop)"}
              fillOpacity={0.2}
              stroke={t0 < t1 ? "var(--color-mobile)" : "var(--color-desktop)"}
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
