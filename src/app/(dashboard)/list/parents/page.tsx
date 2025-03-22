import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { ITEM_PER_PAGE } from "@/lib/pageSettings";
import prisma from "@/lib/prisma";
import { renderRowParent } from "@/lib/types";
import { role } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const columns = [
  { header: "info", accessor: "info" },
  {
    header: "Students",
    accessor: "students",
    className: "hidden md:table-cell",
  },
  {
    header: "Email",
    accessor: "email",
    className: "hidden lg:table-cell",
  },

  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },

  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: `${role === "admin" ? "Actions" : ""}`,
    accessor: "actions",
  },
];

function renderRow(rowData: renderRowParent) {
  return (
    <tr
      key={rowData.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
    >
      <td className="flex items-center gap-4 p-4">
        {/* <Image
            width={40}
            height={40}
            className="rounded-full md:hidden xl:block w-10 h-10 object-cover"
            alt=""
            src={rowData.photo}
          /> */}
        <div className="flex flex-col">
          <h3 className="font-semibold">{rowData.name}</h3>
          <p className="text-xs text-gray-500">{rowData.email}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">
        {rowData.students.map((itemName) => itemName.name).join(", ")}
      </td>
      <td className="hidden md:table-cell">{rowData.email}</td>

      <td className="hidden md:hidden lg:table-cell">{rowData.phone}</td>
      <td className="hidden md:hidden lg:table-cell">{rowData.address}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormModal
                modalData={{ table: "parent", type: "update", data: rowData }}
              />

              <FormModal
                modalData={{
                  table: "parent",
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

async function ParentList({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) {
  const { page, ...queryParams } = searchParams;
  const p = page ? parseInt(page) : 1;

  const query: Prisma.ParentWhereInput = {};

  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "search":
            query.name,
              (query.email = {
                contains: value,
                mode: "insensitive",
              });
            break;
          default:
        }
      }
    }
  }

  const [parentPrismaData, count] = await prisma.$transaction([
    prisma.parent.findMany({
      include: {
        students: true,
      },
      where: query,
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.parent.count({ where: query }),
  ]);

  return (
    <div className="bg-white p-4 m-4 mt-0 flex-1 rounded-md">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Students</h1>
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
                  table: "parent",
                  type: "create",
                }}
              />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={parentPrismaData} />
      {/* PAGINATION */}
      <Pagination page={p} count={count} />
    </div>
  );
}

export default ParentList;
