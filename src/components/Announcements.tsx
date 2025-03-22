import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

async function Announcements() {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role: string })?.role;
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };
  const data = await prisma.announcement.findMany({
    take: 8,
    orderBy: { date: "desc" },
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleConditions[role as keyof typeof roleConditions] || {} },
        ],
      }),
    },
  });
  // console.log(data);
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between ">
        <h1 className="font-semibold text-xl">Announcements</h1>
        <span className="text-sm text-gray-400">View all</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data.map(function (unitItem, index) {
          return (
            <div
              className={`${
                index % 3 === 0
                  ? "bg-lightShadeColor p-4 rounded-md"
                  : index % 3 === 1
                  ? "bg-lightPurple p-4 rounded-md"
                  : "bg-lightYellow p-4 rounded-md"
              }`}
              // className="bg-lightShadeColor p-4 rounded-md"
              key={unitItem.id}
            >
              <div className="flex justify-between items-center">
                <h2 className="font-medium">{unitItem.title}</h2>
                <span className="text-xs bg-white px-1 py-1 text-gray-400 rounded-md">
                  {unitItem.date.toLocaleTimeString("en-Us", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {unitItem.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Announcements;
