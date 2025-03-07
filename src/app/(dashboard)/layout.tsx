"use client";

import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* LEFT DIV */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
        <Link
          href={"/"}
          className="flex items-center justify-between lg:justify-start gap-2"
        >
          <Image src="/logo.png" width={32} height={32} alt="" />
          <span className="hidden lg:block font-bold">Bookatee</span>
        </Link>
        <Menu />
      </div>
      {/* RIGHT DIV */}
      <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f7f8fa] overflow-scroll no-scrollbar flex flex-col relative">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
