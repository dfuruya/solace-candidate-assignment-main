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
      <h1 className="text-4xl font-bold">Solace Advocates</h1>
      <div className="relative flex gap-4">
        <input value={searchTerm} style={{ border: "1px solid black" }} placeholder="Example: 'adhd', 'new york', etc." onChange={onChange} className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        <button onClick={onReset} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset Search</button>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Table data={filteredAdvocates} />
      </Suspense>
    </main>
  );
}
