import FormContainer from "@/components/FormContainer";
import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/pageSettings";
import prisma from "@/lib/prisma";
import { renderRowExams } from "@/lib/types";
import { currentUserId, role } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const columns = [
  { header: "Subject", accessor: "subject" },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },

  {
    header: `${role === "admin" || "teacher" ? "Actions" : ""}`,
    accessor: "actions",
  },
];

function renderRow(rowData: renderRowExams) {
  return (
    <tr
      key={rowData.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{rowData.lesson.subject.name}</h3>
        </div>
      </td>
      <td className="hidden md:table-cell">{rowData.lesson.class.name}</td>
      <td className="hidden md:table-cell">{rowData.lesson.teacher.name}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(rowData.startTime)}
      </td>

      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormContainer
                modalData={{
                  table: "exam",
                  type: "update",
                  id: rowData.id,
                }}
              />

              <FormContainer
                modalData={{
                  table: "exam",
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

async function ExamList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.ExamWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.lesson = {
              OR: [
                { subject: { name: { contains: value, mode: "insensitive" } } },
                { teacher: { name: { contains: value, mode: "insensitive" } } },
              ],
            };
            break;
          case "teacherId":
            query.lesson = { teacherId: value };
            break;

          case "classId":
            query.lesson = { classId: parseInt(value) };
            break;
        }
      }
    }
  }

  switch (role) {
    case "admin":
      break;

    case "teacher":
      query.lesson = { teacherId: currentUserId };
      break;

    case "student":
      query.lesson = {
        class: {
          students: {
            some: {
              id: currentUserId,
            },
          },
        },
      };
      break;

    case "parent":
      query.lesson = {
        class: {
          students: {
            some: {
              parentId: currentUserId,
            },
          },
        },
      };
      break;

    default:
      break;
  }

  const [examsPrismaData, count] = await prisma.$transaction([
    prisma.exam.findMany({
      where: query,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true } },
            class: { select: { name: true } },
          },
        },
      },
    }),
    prisma.exam.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 m-4 mt-0 flex-1 rounded-md">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />

          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-normalYellow">
              <Image width={14} height={14} src="/filter.png" alt="" />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-normalYellow">
              <Image width={14} height={14} src="/sort.png" alt="" />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormContainer
                modalData={{
                  table: "exam",
                  type: "create",
                }}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={examsPrismaData} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
}

export default ExamList;
