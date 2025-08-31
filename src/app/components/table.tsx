import React from "react";

import { Advocate } from "@/db/schema";

type Column = {
  key: Partial<keyof Advocate>;
  label: string;
  span: string;
};

type TableProps = {
  data: Advocate[];
};

const columns: Column[] = [
  { key: "firstName", label: "First Name", span: "col-span-1" },
  { key: "lastName", label: "Last Name", span: "col-span-1" },
  { key: "city", label: "City", span: "col-span-1" },
  { key: "degree", label: "Degree", span: "col-span-1" },
  { key: "yearsOfExperience", label: "Experience (years)", span: "col-span-1" },
  { key: "specialties", label: "Specialties", span: "col-span-3" },
  { key: "phoneNumber", label: "Phone Number", span: "col-span-2" },
];

function Table({ data }: TableProps) {
  if (data.length === 0) {
    return <div>No advocates found</div>;
  }

  return (
    <div className="max-w-4xl border-separate border-spacing-y-4">
      <div className="grid grid-cols-10 m-2 border-2 border-emerald-700 rounded-xl overflow-hidden">
        {columns.map((column, idx) => (
          <div key={column.key} className={`p-4 bg-emerald-900 text-white ${column.span}`}>{column.label}</div>
        ))}
      </div>
      {data.map((advocate: Advocate) => (
        <div key={advocate.id} className="grid grid-cols-10 m-2 border-2 rounded-xl overflow-hidden">
          {columns.map((column, idx) => (
            <div key={column.key} className={`p-4 bg-white ${column.span}`}>{String(advocate[column.key])}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Table;
