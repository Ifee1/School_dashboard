import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import FormModal from "@/components/FormModal";
import PerformanceChart from "@/components/PerformanceChart";
import { table } from "console";
import Image from "next/image";
import Link from "next/link";

function SingleTeacherPage() {
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
                src="https://images.pexels.com/photos/32976/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                width={144}
                height={144}
                className="rounded-full w-36 h-36 object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Casper Okafor</h1>
                <FormModal
                  modalData={{
                    id: 1,
                    table: "teacher",
                    type: "update",
                    data: {
                      id: 1,
                      username: "Casper Okafor",
                      email: "yy@gmail.com",
                      bloodType: "O+",
                    },
                  }}
                />
              </div>
              <p className="text-gray-500 text-sm">
                I teach French and German. Students surprisingly love it.
              </p>
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>O+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>January, 2025</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>
                    casperokafor
                    <br />
                    @gmail.com
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>+234 7844</span>
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
                <h1 className="text-xl font-semibold">5</h1>
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
                <h1 className="text-xl font-semibold">8</h1>
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
                <h1 className="text-xl font-semibold">7</h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px]">
          <h1>Teacher's Schedule</h1>
          <BigCalendar />
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
              Teacher's Classes
            </Link>
            <Link
              className="p-3 rounded-md bg-lightShadeColor"
              href={`/list/students?teacherId=${"teacher2"}`}
            >
              Teacher's Students
            </Link>
            <Link
              className="p-3 rounded-md bg-lightPurple"
              href={`/list/lessons?teacherId=${"teacher2"}`}
            >
              Teacher's Lessons
            </Link>
            <Link
              className="p-3 rounded-md bg-lightYellow"
              href={`/list/exams?teacherId=${"teacher12"}`}
            >
              Teacher's Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/assignments?teacherId=${"teacher2"}`}
            >
              Teacher's Assignments
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
