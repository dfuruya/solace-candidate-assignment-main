import React from "react";

import { Advocate } from "@/db/schema";
import { tableRowBorderClass } from "../utils/style";

type Column = {
  key: Partial<keyof Advocate>;
  label: string;
  span: number;
};

type TableProps = {
  data: Advocate[];
};

const columns: Column[] = [
  { key: "firstName", label: "First Name", span: 1 },
  { key: "lastName", label: "Last Name", span: 1 },
  { key: "city", label: "City", span: 2 },
  { key: "degree", label: "Degree", span: 1 },
  { key: "specialties", label: "Specialties", span: 3 },
  { key: "yearsOfExperience", label: "Years of Experience", span: 1 },
  { key: "phoneNumber", label: "Phone Number", span: 2 },
];

function Table({ data }: TableProps) {
  if (data.length === 0) {
    return <div>No advocates found</div>;
  }

  return (
    <div className="max-w-4xl border-separate border-spacing-y-4">
      <div className="bg-blue-500 grid grid-cols-6">
        {columns.map((column, idx) => (
          <div key={column.key} className={`${tableRowBorderClass(idx, columns.length)} p-4 col-span-${column.span}`}>{column.label}</div>
        ))}
      </div>
      {data.map((advocate: Advocate) => (
        <div key={advocate.id} className="bg-blue-100 m-2 grid grid-cols-11">
          {columns.map((column, idx) => (
            <div key={column.key} className={`${tableRowBorderClass(idx, columns.length)} bg-blue-200 p-4 col-span-${column.span}`}>{String(advocate[column.key])}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Table;
