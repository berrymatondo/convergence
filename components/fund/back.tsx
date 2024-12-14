"use client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
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
    label: "MSCI World ",
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

  //console.log("fund.historicalDataFund:", fund.historicalDataIndex);
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
          <AreaChart
            data={tempo}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
              style={{ fontSize: "12px", color: "#666" }}
            />
            <YAxis
              domain={["auto", "auto"]}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              style={{ fontSize: "12px", color: "#666" }}
            />
            <Tooltip
              content={<CustomTooltip payload={tempo} />}
              cursor={{ stroke: "#ccc", strokeWidth: 1 }}
            />

            <Area
              type="monotone"
              dataKey="desktop"
              stroke="#4CAF50"
              fill="rgba(76, 175, 80, 0.2)"
              strokeWidth={2}
              /*     dot={{ r: 3, strokeWidth: 2 }}
              activeDot={{ r: 6 }} */
            />
            <Line
              type="monotone"
              dataKey="desktop23"
              stroke="#FF5722"
              strokeWidth={2}
              /*      dot={{ r: 3, strokeWidth: 2 }}
              activeDot={{ r: 6 }} */
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default FundViews;

type Cusprops = {
  active?: any;
  payload?: any;
  label?: any;
};
const CustomTooltip = ({ active, payload, label }: Cusprops) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>{label}</p>
        {payload.map((item: any, index: any) => (
          <p key={index} style={{ margin: 0, color: item.color }}>
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/* 
<YAxis type="number" domain={['dataMin', 'dataMax']} />
<YAxis type="number" domain={[0, 'dataMax']} />
<YAxis type="number" domain={['auto', 'auto']} />
<YAxis type="number" domain={[0, 'dataMax + 1000']} />
<YAxis type="number" domain={['dataMin - 100', 'dataMax + 100']} />
<YAxis type="number" domain={[dataMin => (0 - Math.abs(dataMin)), dataMax => (dataMax * 2)]} /> */
