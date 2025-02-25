"use client";
import Image from "next/image";
import React, { PureComponent } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Girls",
    count: 50,
    fill: "#FAE161",
  },
  {
    name: "Boys",
    count: 65,
    fill: "#8BDDF9",
  },
  {
    name: "Total",
    count: 115,
    fill: "#FFFFFF",
  },
];

function Countchart() {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      {/* TITLE */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <Image src="/moreDark.png" width={20} height={20} alt="" />
      </div>
      {/* CHART */}
      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="140%"
            barSize={50}
            data={data}
          >
            <RadialBar
              //   label={{ position: "insideStart", fill: "#fff" }}
              background
              dataKey="count"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <Image
          width={50}
          height={50}
          src="/maleFemale.png"
          alt=""
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lightColor rounded-full"></div>
          <h1 className="font-bold">2000</h1>
          <h2 className="text-xs text-gray-300">Boys (55%)</h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-normalYellow rounded-full"> </div>
          <h1 className="font-bold">2100</h1>
          <h2 className="text-xs text-gray-300">Girls (65%)</h2>
        </div>
      </div>
    </div>
  );
}

export default Countchart;
