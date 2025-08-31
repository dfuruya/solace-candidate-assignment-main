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
      <Suspense fallback={<div>Loading...</div>}>
        <Table data={filteredAdvocates} />
      </Suspense>
    </main>
  );
}
