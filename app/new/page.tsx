"use client";

import BlurImage from "@/components/BlurImage";
import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { supabase } from "@/lib/supabase/supabaseConfig";

interface FormType {
  created_at: string | undefined;
  discription: string | undefined;
  id: string | undefined;
  title: string | undefined;
  poster_img: string | undefined;
  release: number | undefined;
  duration: string | undefined;
  tags: string | undefined;
  director: string | undefined;
}

export default function Page() {
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [imageFileBody, setImageFileBody] = useState<any>();
  const [formData, setFormData] = useState<FormType>({
    created_at: undefined,
    discription: undefined,
    id: undefined,
    title: undefined,
    poster_img: undefined,
    release: undefined,
    duration: undefined,
    director: undefined,
    tags: undefined,
  });

  const handleTextChange = (name: string, value: string) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleImagePicking = (value: null | FileList) => {
    console.log(value);
    setImageFileBody(value?.[0]);
    setFormData((prev) => ({
      ...prev,
      poster_img: URL.createObjectURL(value?.[0]),
    }));
  };

  const handleSubmit = async (e: any) => {
    console.log("Triggered");

    e.preventDefault();
    const imageSlug = formData.title?.toLowerCase().replace(" ", "_");
    setUploadingPhoto(true);
    const { data, error } = await supabase.storage
      .from("movie_poster")
      .upload(`/${imageSlug}.jpg`, imageFileBody);
    console.log("52", data);
    setUploadingPhoto(false);
    // Insert data into supabase
    if (data) {
      setFormData((prev) => ({
        ...prev,
        poster_img: `https://dmntoayafhrbudarqswq.supabase.co/storage/v1/object/public/movie_poster/${data?.path}`,
      }));
      const { error } = await supabase.from("movies").insert(formData);

      if (error) {
        console.error("57", error);
        // delete file if Insert faild
        await supabase.storage.from("movie_poster").remove([`/${imageSlug}`]);
      } else {
        alert("Movie Data Added");
      }
    }

    console.error("70", error);
  };
  return (
    <main className="w-full container mx-auto mb-6 px-3 mt-0 ">
      <form
        className="grid grid-cols-[280px_auto] grid-flow-col mt-4 mx-4"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="w-[280px] flex aspect-[9/14] rounded-2xl overflow-hidden">
          {formData.poster_img != undefined ? (
            <div className="relative">
              <BlurImage
                src={formData.poster_img}
                className="rounded-2xl w-full aspect-[9/14]"
                alt={"Image"}
                width={280}
                height={0}
              />
              <div
                className="absolute inset-0 transition-opacity opacity-0 hover:opacity-100 grid place-items-center bg-neutral-900/70 z-20"
                onClick={() => {
                  URL.revokeObjectURL(formData.poster_img);
                  setFormData((prev) => ({ ...prev, poster_img: undefined }));
                }}
              >
                <XMarkIcon
                  width={66}
                  className={`p-1 rounded-full fill-red-400 outline-none`}
                />
                {uploadingPhoto && "Uploading"}
              </div>
            </div>
          ) : (
            <>
              <input
                required
                type="file"
                id="poster_img"
                name="Poster Img"
                className="hidden"
                multiple={false}
                onChange={(e) => handleImagePicking(e.target.files)}
              />
              <label
                htmlFor="poster_img"
                className="w-[280px] h-full grid place-items-center bg-neutral-900 hover:bg-neutral-900/70 transition-colors text-neutral-400"
              >
                Pick Poster
              </label>
            </>
          )}
        </div>
        <div className="px-4 pt-4 sm:ml-4 sm:mt-4 bg-black -mt-10 rounded-t-3xl">
          <input
            required
            autoComplete="off"
            name="title"
            type="text"
            placeholder="Movie Title"
            className="text-2xl bg-transparent outline-none border-b border-b-neutral-800 focus:border-b-red-600 sm:text-4xl font-extrabold font-title"
            value={formData?.title}
            onChange={(e) => handleTextChange(e.target.name, e.target.value)}
          />

          <p className="text-neutral-400 mt-3">
            <input
              required
              autoComplete="off"
              onChange={(e) => handleTextChange(e.target.name, e.target.value)}
              name="release"
              placeholder="Release Year"
              type="number"
              className="bg-transparent outline-none border-b border-b-neutral-800 focus:border-b-red-600 w-36"
              maxLength={4}
              value={formData.release}
            />{" "}
            •{" "}
            <input
              required
              autoComplete="off"
              onChange={(e) => handleTextChange(e.target.name, e.target.value)}
              name="duration"
              type="text"
              placeholder="Movie Duration"
              className="bg-transparent outline-none border-b border-b-neutral-800 focus:border-b-red-600 w-36"
              value={formData.duration}
            />
          </p>
          <textarea
            required
            onChange={(e) => handleTextChange(e.target.name, e.target.value)}
            name="discription"
            spellCheck="false"
            className="text-lg min-h-[60px] text-neutral-400 w-full mt-3 bg-transparent outline-none border-b border-b-neutral-800 focus:border-b-red-600"
            value={formData.discription}
            placeholder="Movie Discription"
          />
          <input
            required
            autoComplete="off"
            type="text"
            onChange={(e) => handleTextChange(e.target.name, e.target.value)}
            name="director"
            spellCheck="false"
            className="text-base text-neutral-400 w-full mt-3 bg-transparent outline-none border-b border-b-neutral-800 focus:border-b-red-600"
            value={formData.director}
            placeholder="Movie Director"
          />
          <input
            type="text"
            spellCheck={false}
            autoComplete="off"
            required
            name="tags"
            className="flex gap-2 my-2 text-base text-neutral-400 w-full mt-3 bg-transparent outline-none border-b border-b-neutral-800 focus:border-b-red-600"
            value={formData.tags}
            placeholder="Tags comma(,) seperated"
            onChange={(e) => handleTextChange(e.target.name, e.target.value)}
          />
          <button
            type="submit"
            className=" bg-neutral-800 hover:bg-red-600 rounded-2xl p-2 w-full mt-20 transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}
