import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, teachersData } from "@/lib/data";
import { renderRowTeacher } from "@/lib/types";
import { table } from "console";
import Image from "next/image";
import Link from "next/link";

function TeacherList() {
  const columns = [
    { header: "info", accessor: "info" },
    {
      header: "Teacher ID",
      accessor: "teacherId",
      className: "hidden md:table-cell",
    },
    {
      header: "Subjects",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },
    {
      header: "Classes",
      accessor: "classes",
      className: "hidden md:table-cell",
    },
    { header: "Phone", accessor: "phone", className: "hidden lg:table-cell" },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    {
      header: "Actions",
      accessor: "actions",
    },
  ];

  function renderRow(rowData: renderRowTeacher) {
    return (
      <tr
        key={rowData.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lightPurple"
      >
        <td className="flex items-center gap-4 p-4">
          <Image
            width={40}
            height={40}
            className="rounded-full md:hidden xl:block w-10 h-10 object-cover"
            alt=""
            src={rowData.photo}
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{rowData.name}</h3>
            <p className="text-xs text-gray-500">{rowData.email}</p>
          </div>
        </td>
        <td className="hidden md:table-cell">{rowData.teacherId}</td>
        <td className="hidden md:table-cell">{rowData.subjects.join(", ")}</td>
        <td className="hidden md:table-cell">{rowData.classes.join(", ")}</td>
        <td className="hidden md:hidden lg:table-cell">{rowData.phone}</td>
        <td className="hidden md:hidden lg:table-cell">{rowData.address}</td>
        <td>
          <div className="flex items-center gap-2">
            {role === "admin" && (
              <>
                <FormModal
                  modalData={{
                    table: "teacher",
                    type: "update",
                    id: rowData.id,
                  }}
                />

                <FormModal
                  modalData={{
                    table: "teacher",
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

  return (
    <div className="bg-white p-4 m-4 mt-0 flex-1 rounded-md">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
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
              // <button className="bg-normalPurple rounded-full flex items-center justify-center w-7 h-7">
              //   <Image src="/delete.png" alt="" width={16} height={16} />
              // </button>

              <FormModal modalData={{ table: "teacher", type: "create" }} />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={teachersData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
}

export default TeacherList;
