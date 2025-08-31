"use client";

import React, { useEffect, useMemo, useState } from "react";

import { Advocate } from "@/db/schema";
import { filterSearch } from "./utils/search";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAdvocates = useMemo(() => filterSearch(searchTerm, advocates), [advocates, searchTerm]);

  useEffect(() => {
    console.log("loading advocates...");
    fetchAdvocates();
  }, []);

  const fetchAdvocates = async () => {
    const response = await fetch("/api/advocates");
    const jsonResponse = await response.json();
    setAdvocates(jsonResponse.data);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onReset = () => {
    console.log('clearing search');
    setSearchTerm('');
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input value={searchTerm} style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onReset}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((s) => (
                    <div key={`${advocate.id}_${s}`}>{s}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
