import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import FormModal from "@/components/FormModal";
import PerformanceChart from "@/components/PerformanceChart";
import prisma from "@/lib/prisma";
import { role } from "@/lib/utils";
import { Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function SingleTeacherPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          lessons: true,
          classes: true,
        },
      },
    },
  });

  if (!teacher) {
    return notFound();
  }
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/*LEFT  */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lightColor py-6 px-4 rounded-md flex flex-1 gap-4">
            <div className="w-1/3">
              <Image
                src={
                  teacher.img ||
                  "https://images.pexels.com/photos/32976/pexels-photo.jpg?=compress&cs=tinysrgb&w=600"
                }
                alt=""
                width={144}
                height={144}
                className="rounded-full w-36 h-36 object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">
                  {teacher.username + " " + teacher.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer
                    modalData={{
                      table: "teacher",
                      type: "update",
                      data: teacher,
                    }}
                  />
                )}
              </div>
              <p className="text-gray-500 text-sm">
                I teach French and German. Students surprisingly love it.
              </p>
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{teacher.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>
                    {new Intl.DateTimeFormat("en-US").format(teacher.birthday)}
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{teacher.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{teacher.phone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARD */}
          <div className="flex gap-4 flex-wrap flex-1">
            {/* CARD*/}
            <div className="w-full bg-white rounded-md p-4 flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleAttendance.png"
                width={24}
                height={24}
                className="w-6 h-6"
                alt=""
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* CARD*/}
            <div className="w-full bg-white rounded-md p-4 flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleBranch.png"
                width={24}
                height={24}
                className="w-6 h-6"
                alt=""
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher._count.subjects}
                </h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            {/* CARD*/}
            <div className="w-full bg-white rounded-md p-4 flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleLesson.png"
                width={24}
                height={24}
                className="w-6 h-6"
                alt=""
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher._count.lessons}
                </h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* CARD*/}
            <div className="w-full bg-white rounded-md p-4 flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <Image
                src="/singleClass.png"
                width={24}
                height={24}
                className="w-6 h-6"
                alt=""
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher._count.classes}
                </h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher&aposs Schedule</h1>
          {/* <BigCalendar /> */}
          <BigCalendarContainer type="teacherId" id={teacher.id} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-xl font-semibold">Shortcuts</h2>
          <div className="flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-lightColor"
              href={`/list/classes?supervisorId=${"teacher12"}`}
            >
              Teacher&aposs Classes
            </Link>
            <Link
              className="p-3 rounded-md bg-lightShadeColor"
              href={`/list/students?teacherId=${"teacher2"}`}
            >
              Teacher&aposs Students
            </Link>
            <Link
              className="p-3 rounded-md bg-lightPurple"
              href={`/list/lessons?teacherId=${"teacher2"}`}
            >
              Teacher&aposs Lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-lightYellow"
              href={`/list/exams?teacherId=${"teacher12"}`}
            >
              Teacher&aposs Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/assignments?teacherId=${"teacher2"}`}
            >
              Teacher&aposs Assignments
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <Announcements />
      </div>
    </div>
  );
}

export default SingleTeacherPage;
