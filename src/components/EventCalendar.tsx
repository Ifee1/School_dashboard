"use client";
import { eventsData } from "@/lib/data";
import Image from "next/image";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

function EventCalendar() {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar onChange={onChange} value={value} />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-8">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {eventsData.map(function (event) {
          return (
            <div
              className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lightColor even:border-t-normalPurple
            "
              key={event.id}
            >
              <div className="flex items-center justify-between">
                <h1 className="font-semibold text-gray-600">{event.title}</h1>
                <span className="text-xs text-gray-300">{event.startTime}</span>
              </div>
              <p className="mt-2 text-gray-400 text-sm">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
                sequi maiores delectus earum quam nulla!
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EventCalendar;
