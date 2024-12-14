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

type IndexViewsProps = {
  index: any;
};
const IndexViews = async ({ index }: IndexViewsProps) => {
  const t0 = +index[0]?.close;
  const t1 = +index[index?.length - 1]?.close;

  //console.log("T1: ", index[0]);
  //console.log("T0: ", index[index?.length - 1]);

  let offset = trouverMinEtMax(index);
  //console.log("commo: ", offset);

  const min = "dataMin - " + offset;
  const max = "dataMax + " + offset;

  const fxTmp = [...index];

  let step = 5;

  // console.log("fxTmp.length", fxTmp.length);

  if (fxTmp.length < 6) step = 2;
  else if (fxTmp.length > 6 && fxTmp.length < 21) step = 4;
  else if (fxTmp.length > 20 && fxTmp.length < 60) step = 11;

  return (
    <Card className="border-none  max-md:w-full">
      <CardHeader>
        <CardTitle className="text-sky-700 dark:text-sky-500"></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <ChartContainer style={{ width: "100%" }} config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={fxTmp.reverse()}
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
              tickMargin={10}
              interval={0} // Affiche tous les ticks pour un contrôle précis avec tickFormatter
              tickFormatter={(value, index) => {
                const totalPoints = fxTmp.length;
                if (totalPoints < 5) {
                  // Si moins de 5 points, afficher tous les points
                  return value;
                }

                // Calcul des indices équidistants
                const step = (totalPoints - 1) / 4;
                const indicesToShow = [
                  0, // Premier point
                  Math.round(step), // Point à 1/4
                  Math.round(2 * step), // Point du milieu
                  Math.round(3 * step), // Point à 3/4
                  totalPoints - 1, // Dernier point
                ];

                // Afficher uniquement les points correspondant aux indices choisis
                return indicesToShow.includes(index) ? value : "";
              }}
            />

            <YAxis domain={[min, max]} tickMargin={20} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="close"
              type="linear"
              fillOpacity={0.2}
              stroke={t0 < t1 ? "var(--color-mobile)" : "var(--color-desktop)"}
              dot={false}
              fill={t0 < t1 ? "var(--color-mobile)" : "var(--color-desktop)"}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default IndexViews;
