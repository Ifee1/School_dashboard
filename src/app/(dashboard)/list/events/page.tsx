import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
// import { role, eventsData } from "@/lib/data";
import { ITEM_PER_PAGE } from "@/lib/pageSettings";
import prisma from "@/lib/prisma";
import { renderRowEvents } from "@/lib/types";
import { currentUserId, role } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const columns = [
  { header: "Title", accessor: "title" },
  {
    header: "Class",
    accessor: "class",
    className: "hidden lg:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },

  {
    header: `${role === "admin" ? "Actions" : ""}`,

    accessor: "actions",
  },
];

function renderRow(rowData: renderRowEvents) {
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
      <td className="hidden lg:table-cell">
        {rowData.class?.name || "All Students"}
      </td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(rowData.startTime)}
      </td>
      <td className="hidden md:table-cell">
        {rowData.startTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </td>
      <td className="hidden md:table-cell">
        {rowData.endTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </td>

      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal
                modalData={{
                  table: "event",
                  type: "update",
                  id: rowData.id,
                }}
              />

              <FormModal
                modalData={{
                  table: "event",
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

async function EventsList({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;
  const query: Prisma.EventWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.title = { contains: value, mode: "insensitive" };
            break;
          default:
            break;
        }
      }
    }
  }

  // switch (role) {
  //   case "admin":
  //     break;

  //   case "teacher":
  //     query.OR = [
  //       { classId: null },
  //       {
  //         class: {
  //           lessons: {
  //             some: {
  //               teacherId: currentUserId,
  //             },
  //           },
  //         },
  //       },
  //     ];
  //     break;

  //   case "student":
  //     query.class = {
  //       students: {
  //         some: {
  //           id: currentUserId,
  //         },
  //       },
  //     };
  //     break;

  //   case "parent":
  //     query.OR = [
  //       { classId: null },
  //       {
  //         class: {
  //           students: {
  //             some: {
  //               parentId: currentUserId,
  //             },
  //           },
  //         },
  //       },
  //     ];
  //     break;

  //   default:
  //     break;
  // }

  // CHATGPT SIMPLIFICATION
  const roleConditions = {
    teacher: { lessons: { some: { teacherId: currentUserId } } },
    student: { students: { some: { id: currentUserId } } },
    parent: { students: { some: { parentId: currentUserId } } },
  };

  query.OR = [
    { classId: null },
    { class: roleConditions[role as keyof typeof roleConditions] || {} },
  ];

  const [eventsPrismaData, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
      include: { class: true },
    }),
    prisma.event.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 m-4 mt-0 flex-1 rounded-md">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Events</h1>
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
                  table: "event",
                  type: "create",
                }}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={eventsPrismaData} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
}

export default EventsList;
