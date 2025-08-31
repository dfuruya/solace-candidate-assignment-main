import { Advocate } from "@/db/schema";
import React from "react";

type Column = {
  key: Partial<keyof Advocate>;
  label: string;
};

type TableProps = {
  data: Advocate[];
};

const columns: Column[] = [
  { key: "firstName", label: "First Name" },
  { key: "lastName", label: "Last Name" },
  { key: "city", label: "City" },
  { key: "degree", label: "Degree" },
  { key: "specialties", label: "Specialties" },
  { key: "yearsOfExperience", label: "Years of Experience" },
  { key: "phoneNumber", label: "Phone Number" },
];

function Table({ data }: TableProps) {
  if (data.length === 0) {
    return <div>No advocates found</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((advocate: Advocate) => {
          return (
            <tr key={advocate.id}>
              {columns.map(column => (
                <td key={column.key}>{String(advocate[column.key])}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
