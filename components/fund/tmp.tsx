import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const Dual = () => {
  // Sample data
  const data = [
    { x: 1, y: 23, z: 122 },
    { x: 2, y: 3, z: 73 },
    { x: 3, y: 15, z: 32 },
    { x: 4, y: 35, z: 23 },
    { x: 5, y: 45, z: 20 },
    { x: 6, y: 25, z: 29 },
    { x: 7, y: 17, z: 61 },
    { x: 8, y: 32, z: 45 },
    { x: 9, y: 43, z: 93 },
  ];
  return (
    <>
      {" "}
      {/*       <LineChart width={500} height={700} data={data}>
        <CartesianGrid />
        <XAxis dataKey="x" />
        <YAxis yAxisId="left-axis" />
        <YAxis yAxisId="right-axis" orientation="right" />
        <Line yAxisId="left-axis" type="monotone" dataKey="y" stroke="green" />
        <Line yAxisId="right-axis" type="monotone" dataKey="z" stroke="red" />
      </LineChart> */}
    </>
  );
};

export default Dual;
