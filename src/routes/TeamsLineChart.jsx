import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const TeamsLineChart = ({ data }) => (
  <LineChart
    width={500}
    height={300}
    data={data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line
      type="monotone"
      dataKey="away"
      stroke="#82ca9d"
      activeDot={{ r: 8 }}
    />
    <Line
      type="monotone"
      dataKey="home"
      stroke="#8884d8"
      activeDot={{ r: 8 }}
    />
  </LineChart>
);

export default TeamsLineChart;