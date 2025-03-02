import { TableProps } from "@/lib/types";

function Table({ columns, renderRow, data }: TableProps) {
  return (
    <table className="mt-4 w-full">
      <thead>
        <tr className="text-left text-sm text-gray-500">
          {columns.map(function (col) {
            return (
              <th className={col.className} key={col.accessor}>
                {col.header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map(function (unitData) {
          return renderRow(unitData);
        })}
      </tbody>
    </table>
  );
}

export default Table;
