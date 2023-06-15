"use client";
import { supabase } from "@/lib/supabase/supabaseConfig";
import useDebounce from "@/lib/utils/useDebounce";
import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function SearchBar() {
  const [loading, setloading] = useState(false);
  // const [expanded, setExpanded] = useState(false);
  const [searchParm, setSearchParm] = useState("");
  const [modalShown, setModalShown] = useState(false);
  const value = useDebounce(searchParm, 1000);

  const [fetchRes, setFetchRes] = useState<
    { id: string; poster_img: string; title: string; tags: string }[]
  >([]);

  useEffect(() => {
    const fetch = async () => {
      setloading(true);
      console.log("||||| Fetching");
      let { data, error } = await supabase
        .from("movies")
        .select("id, poster_img,title,tags")
        // @ts-ignore
        .ilike("title", `%${value}%`);

      if (error || !data) {
        setFetchRes([]);
      } else {
        setFetchRes(data);
      }
      setloading(false);
    };

    if (value) fetch();
    else setFetchRes([]);
  }, [value]);

  console.log(fetchRes);

  return (
    <div className="relative max-w-md">
      <input
        type="text"
        placeholder="Search here"
        className="transition-all border border-neutral-900 text-sm focus:outline-none focus:border-red-600 bg-neutral-900 mx-1 px-4 py-2 rounded-full"
        // style={{ display: expanded ? "block" : "none" }}
        onChange={({ target }) => setSearchParm(target.value)}
        onBlur={() => setModalShown(false)}
        onFocus={() => setModalShown(true)}
        // value={searchParm}
      />

      {searchParm != "" && modalShown && value != "" && (
        <div className="absolute top-9 mt-2 rounded-xl w-full sm:w-96 right-0 p-2 bg-neutral-900">
          {loading ? (
            <div className="flex items-center justify-center py-3">
              Loading....
            </div>
          ) : !fetchRes[0] ? (
            <div className="flex items-center justify-center py-3">
              Nothing Here 😥
            </div>
          ) : (
            fetchRes.map((value, key) => (
              <div
                className="flex hover:bg-neutral-700 rounded-md overflow-hidden items-center"
                key={key}
              >
                <Image
                  src={value.poster_img}
                  width={40}
                  height={100}
                  alt={value.title}
                  className="rounded-md"
                />
                <div className="p-2">
                  <p className="block font-bold">{value.title}</p>
                  <p className="block text-sm">{value.tags}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* <button
        className="focus:bg-neutral-900 border border-transparent focus:border-neutral-800 rounded-full p-1"
        onClick={() => setExpanded(!expanded)}
      >
        <MagnifyingGlassIcon width={24} />
      </button> */}
    </div>
  );
}
