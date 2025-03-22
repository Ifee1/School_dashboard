import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/pageSettings";
import prisma from "@/lib/prisma";
import { renderRowResults } from "@/lib/types";
import { currentUserId, role } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const columns = [
  { header: "Title", accessor: "subject" },
  {
    header: "Class",
    accessor: "class",
    className: "hidden lg:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Student",
    accessor: "teacher",
    className: "table-cell",
  },
  {
    header: "Score",
    accessor: "score",
    className: "table-cell",
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

function renderRow(rowData: renderRowResults) {
  return (
    <tr
      key={rowData.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{rowData.title}</h3>
        </div>
      </td>
      <td className="table-cell">{rowData.className}</td>
      <td className="hidden lg:table-cell">{rowData.teacherName}</td>
      <td className="hidden lg:table-cell">{rowData.studentName}</td>
      <td className="table-cell">{rowData.score}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(rowData.startTime)}
      </td>

      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormModal
                modalData={{
                  table: "result",
                  type: "update",
                  id: rowData.id,
                }}
              />

              <FormModal
                modalData={{
                  table: "result",
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

async function ResultsList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.ResultWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.OR = [
              { exam: { title: { contains: value, mode: "insensitive" } } },
              { student: { name: { contains: value, mode: "insensitive" } } },
              {
                exam: {
                  lesson: {
                    teacher: { name: { contains: value, mode: "insensitive" } },
                  },
                },
              },
            ];

            break;

          case "studentId":
            query.studentId = value;
            break;
          default:
            break;
        }
      }
    }
  }

  switch (role) {
    case "admin":
      break;
    case "teacher":
      query.OR = [
        { exam: { lesson: { teacherId: currentUserId } } },
        { assignment: { lesson: { teacherId: currentUserId } } },
      ];
      break;
    case "student":
      query.studentId = currentUserId;
      break;
    case "parent":
      query.student = { parentId: currentUserId };
  }

  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      where: query,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      include: {
        student: { select: { name: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true } },
              },
            },
          },
        },
        assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true } },
              },
            },
          },
        },
      },
    }),
    prisma.result.count({ where: query }),
  ]);

  const resultsPrismaData = dataRes.map((data) => {
    const assessment = data.exam || data.assignment;
    if (!assessment) return null;
    const isExam = "startTime" in assessment;
    return {
      id: data.id,
      title: assessment.title,
      studentName: data.student.name,
      teacherName: assessment.lesson.teacher.name,
      score: data.score,
      className: assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime : assessment.startDate,
    };
  });

  return (
    <div className="bg-white p-4 m-4 mt-0 flex-1 rounded-md">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Results</h1>
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
              <FormModal
                modalData={{
                  table: "result",
                  type: "create",
                }}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={resultsPrismaData} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
}

export default ResultsList;
