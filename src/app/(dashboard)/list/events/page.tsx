import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { role, eventsData } from "@/lib/data";
import { renderRowEvents } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

function EventsList() {
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
      header: "Actions",
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
        <td className="hidden lg:table-cell">{rowData.class}</td>
        <td className="hidden md:table-cell">{rowData.date}</td>
        <td className="hidden md:table-cell">{rowData.startTime}</td>
        <td className="hidden md:table-cell">{rowData.endTime}</td>

        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/teachers/${rowData.id}`}>
              <button className="bg-lightColor rounded-full flex items-center justify-center w-7 h-7">
                <Image src="/edit.png" alt="" width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && (
              <button className="bg-normalPurple rounded-full flex items-center justify-center w-7 h-7">
                <Image src="/delete.png" alt="" width={16} height={16} />
              </button>
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
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-normalYellow">
              <Image width={14} height={14} src="/plus.png" alt="" />
            </button>
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={eventsData} />
      {/* PAGINATION */}
      <Pagination />
    </div>
  );
}

export default EventsList;
