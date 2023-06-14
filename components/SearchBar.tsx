"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { NextPage, NextPageContext } from "next";
import React, { useState } from "react";

export default function SearchBar() {
  const [expanded, setExpanded] = useState(false);
  const [searchParm, setSearchParm] = useState("");
  return (
    <div className="flex justify-end max-w-md">
      <input
        type="text"
        placeholder="Search here"
        className="transition-all border border-neutral-900 text-sm focus:outline-none focus:border-red-600 bg-neutral-900 mx-1 px-3 py-1 rounded-full"
        style={{ display: expanded ? "block" : "none" }}
      />
      <button
        className="focus:bg-neutral-900 border border-transparent focus:border-neutral-800 rounded-full p-1"
        onClick={() => setExpanded(!expanded)}
      >
        <MagnifyingGlassIcon width={24} />
      </button>
    </div>
  );
}
