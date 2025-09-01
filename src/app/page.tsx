"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";

import { Advocate } from "@/db/schema";
import { filterSearch } from "./utils/search";
import Table from "./components/table";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAdvocates = useMemo(() => filterSearch(searchTerm, advocates), [advocates, searchTerm]);

  useEffect(() => {
    console.log("loading advocates...");
    fetchAdvocates();
  }, []);

  const fetchAdvocates = async (searchTerm?: string) => {
    const url = `/api/advocates${searchTerm ? `/${searchTerm}` : ''}`;
    const response = await fetch(url);
    const jsonResponse = await response.json();
    setAdvocates(jsonResponse.data);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchAdvocates(value);
  };

  const onReset = () => {
    setSearchTerm('');
    fetchAdvocates();
  };

  return (
    <main style={{ margin: "24px" }} className="flex flex-col justify-center items-center bg-gray-100 gap-4">
      <h1 className="text-5xl font-bold">Solace Advocates</h1>
      <div className="flex w-4xl">
        <input value={searchTerm} style={{ border: "1px solid black" }} placeholder="Example: 'adhd', 'new york', etc." onChange={onChange} className="block w-full p-4 m-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" />
        <button onClick={onReset} className="text-white bg-emerald-900 whitespace-nowrap font-medium rounded-lg text-sm p-4 m-2 hover:bg-emerald-800 focus:ring-4 focus:outline-hidden focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Reset Search</button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Table data={filteredAdvocates} />
      </Suspense>
    </main>
  );
}
