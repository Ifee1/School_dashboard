import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
// import { lessonsData, role } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/pageSettings";
import prisma from "@/lib/prisma";
import { renderRowLessons } from "@/lib/types";
import { role } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const columns = [
  { header: "Subject Name", accessor: "subject" },

  {
    header: "Class",
    accessor: "class",
    className: "hidden lg:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden lg:table-cell",
  },

  {
    header: `${role === "admin" ? "Actions" : ""}`,
    accessor: "actions",
  },
];

function renderRow(rowData: renderRowLessons) {
  return (
    <tr
      key={rowData.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{rowData.subject.name}</h3>
        </div>
      </td>

      <td className="hidden md:hidden lg:table-cell">{rowData.class.name}</td>

      <td className="hidden md:hidden lg:table-cell">{rowData.teacher.name}</td>

      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal
                modalData={{
                  table: "lesson",
                  type: "update",
                  id: rowData.id,
                }}
              />

              <FormModal
                modalData={{
                  table: "lesson",
                  type: "delete",
                  id: rowData.id,
                }}
              />
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

async function LessonsList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.LessonWhereInput = {};
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            // query.name = { contains: value, mode: "insensitive" };
            query.OR = [
              { subject: { name: { contains: value, mode: "insensitive" } } },
              { teacher: { name: { contains: value, mode: "insensitive" } } },
            ];
            break;
          case "teacherId":
            query.teacherId = value;
          case "classId":
            query.classId = parseInt(value);
        }
      }
    }
  }

  const [lessonsPrismaData, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where: query,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      include: {
        class: { select: { name: true } },
        teacher: { select: { name: true } },
        subject: { select: { name: true } },
      },
    }),
    prisma.lesson.count({ where: query }),
  ]);
  return (
    <div className="bg-white p-4 m-4 mt-0 flex-1 rounded-md">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />

          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-normalYellow">
              <Image width={14} height={14} src="/filter.png" alt="" />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-normalYellow">
              <Image width={14} height={14} src="/sort.png" alt="" />
            </button>
            {role === "admin" && (
              <FormModal
                modalData={{
                  table: "lesson",
                  type: "create",
                }}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={lessonsPrismaData} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
}

export default LessonsList;
