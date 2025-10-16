import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import PerformanceChart from "@/components/PerformanceChart";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import prisma from "@/lib/prisma";
import { role } from "@/lib/utils";
import { Class, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

async function SingleStudentPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const student:
    | (Student & {
        class: Class & { _count: { lessons: number } };
      })
    | null = await prisma.student.findUnique({
    where: { id },
    include: {
      class: {
        include: {
          _count: { select: { lessons: true } },
        },
      },
    },
  });

  if (!student) {
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
                // src="https://images.pexels.com/photos/6256103/pexels-photo-6256103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                src={
                  student.img ||
                  "https://images.pexels.com/photos/6256103/pexels-photo-6256103.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
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
                  {student.name + " " + student.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer
                    modalData={{
                      table: "student",
                      type: "update",
                      data: student,
                    }}
                  />
                )}
              </div>
              <p className="text-gray-500 text-sm">
                I really love Mathematics. And Coloring
              </p>
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>{student.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  {new Intl.DateTimeFormat("en-US").format(student.birthday)}
                  <span></span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>{student.email}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>{student.phone || "-"}</span>
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
              <Suspense fallback="loading...">
                <StudentAttendanceCard id={student.id} />
              </Suspense>
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
                  {student.class.name.charAt(0)}
                </h1>
                <span className="text-sm text-gray-400">Grade</span>
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
                  {student.class._count.lessons}
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
                <h1 className="text-xl font-semibold">{student.class.name}</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Student&aposs Schedule</h1>
          <BigCalendarContainer type="classId" id={student.class.id} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md">
          <h2 className="text-xl font-semibold">Shortcuts</h2>
          <div className="flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-lightColor"
              href={`/list/teachers?classId=${3}`}
            >
              Student&aposs Teachers
            </Link>
            <Link
              className="p-3 rounded-md bg-lightShadeColor"
              href={`/list/results?classId=${2}`}
            >
              Student&aposs Result
            </Link>
            <Link
              className="p-3 rounded-md bg-lightPurple"
              href={`/list/lessons?studentId=${"student2"}`}
            >
              Student&aposs Lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-lightYellow"
              href={`/list/exams?classId=${2}`}
            >
              Student&aposs Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/assignments?classId=${2}`}
            >
              Student&aposs Assignments
            </Link>
          </div>
        </div>
        <PerformanceChart />
        <Announcements />
      </div>
    </div>
  );
}

export default SingleStudentPage;
