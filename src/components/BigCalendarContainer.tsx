import prisma from "@/lib/prisma";
import { BigCalendarModal } from "@/lib/types";
import BigCalendar from "./BigCalendar";
import { adjustedSchedule } from "@/lib/utils";

async function BigCalendarContainer({ type, id }: BigCalendarModal) {
  const resData = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });

  const data = resData.map(function (unitLesson) {
    return {
      title: unitLesson.name,
      start: unitLesson.startTime,
      end: unitLesson.endTime,
    };
  });
  const schedule = adjustedSchedule(data);

  return (
    <div className="">
      <BigCalendar data={data} />
    </div>
  );
}

export default BigCalendarContainer;
