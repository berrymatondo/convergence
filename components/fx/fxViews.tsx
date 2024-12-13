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
    label: "Price",
    color: "hsl(var(--chart-2))",
  },
  mobile: {
    label: "Price",
    color: "hsl(var(--chart-5))",
  },
  g2: {
    label: "Price",
    color: "hsl(var(--chart-1))",
  },
  g3: {
    label: "Price",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

function trouverMinEtMax(tab: any) {
  if (!Array.isArray(tab) || tab.length === 0) {
    //  throw new Error("Le tableau est vide ou invalide.");
    return 0;
  }

  // Initialisation des valeurs min et max avec le premier élément
  let minObj = tab[0];
  let maxObj = tab[0];

  // Parcourir le tableau pour trouver les min et max
  for (let i = 1; i < tab.length; i++) {
    if (tab[i].close < minObj.close) {
      minObj = tab[i];
    }
    if (tab[i].close > maxObj.close) {
      maxObj = tab[i];
    }
  }

  //return { min: minObj, max: maxObj };
  return Math.abs(Math.floor(maxObj.close - minObj.close));
}

type FxViewsProps = {
  fx: any;
};
const FxViews = async ({ fx }: FxViewsProps) => {
  const t1 = +fx[0]?.close;
  const t0 = +fx[fx?.length - 1]?.close;

  let offset = trouverMinEtMax(fx);
  //console.log("commo: ", offset);

  const min = "dataMin - " + offset;
  const max = "dataMax + " + offset;

  return (
    <Card className="border-none  max-md:w-full">
      <CardHeader>
        <CardTitle className="text-sky-700 dark:text-sky-500"></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <ChartContainer style={{ width: "100%" }} config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={fx.reverse()}
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
            <YAxis domain={[min, max]} tickMargin={20} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Line
              dataKey="close"
              type="linear"
              fillOpacity={0.2}
              stroke={t0 < t1 ? "var(--color-mobile)" : "var(--color-desktop)"}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default FxViews;
