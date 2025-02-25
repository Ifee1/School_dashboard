"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function FinanceChart() {
  const data = [
    {
      name: "Jan",
      income: 4000,
      expense: 2400,
      amt: 2400,
    },
    {
      name: "Feb",
      income: 3000,
      expense: 1398,
      amt: 2210,
    },
    {
      name: "March",
      income: 2000,
      expense: 9800,
      amt: 2290,
    },
    {
      name: "April",
      income: 2780,
      expense: 3908,
      amt: 2000,
    },
    {
      name: "May",
      income: 1890,
      expense: 4800,
      amt: 2181,
    },
    {
      name: "June",
      income: 2390,
      expense: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      income: 3490,
      expense: 4300,
      amt: 2100,
    },
  ];
  return (
    <div className="bg-white rounded-lg h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finance</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="" />
      </div>
      <ResponsiveContainer width="100%" height="100%">
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
          {/*
           */}
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="income" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default FinanceChart;
