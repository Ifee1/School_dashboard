"use client";
import { countChartType } from "@/lib/types";
import Image from "next/image";
import React, { PureComponent } from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Countchart({ boys, girls }: countChartType) {
  const data = [
    {
      name: "Girls",
      count: girls,
      fill: "#FAE161",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#8BDDF9",
    },
    {
      name: "Total",
      count: boys + girls,
      fill: "#FFFFFF",
    },
  ];
  return (
    <>
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
    </>
  );
}

export default Countchart;
