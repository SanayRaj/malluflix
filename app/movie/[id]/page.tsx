import BlurImage from "@/components/BlurImage";
import { supabase } from "@/lib/supabase/supabaseConfig";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function getMovie(id) {
  let { data, error } = await supabase.from("movies").select().eq("id", id);
  console.log(data, error);

  if (error) console.log("Supabase Error", error);
  if (!data[0]) {
    notFound();
  }
  return data[0];
}

export default async function page({ params }) {
  const movie = await getMovie(params.id);
  const awailableDownloads = [
    {
      size: "364MB",
      name: "360p",
      url: "https://malluflix/static/movies/2018/360p",
    },
    {
      size: "500MB",
      name: "480p",
      url: "https://malluflix/static/movies/2018/480p",
    },
    {
      size: "1.4GB",
      name: "HD - 720p",
      url: "https://malluflix/static/movies/2018/720-hd",
    },
    {
      size: "2.6GB",
      name: "FullHD - 1080p",
      url: "https://malluflix/static/movies/2018/1080-fullhd",
    },
  ];

  return (
    <main className="w-full container mx-auto mb-6">
      <section className="flex flex-col sm:flex-row sm:mt-4 sm:mx-6">
        <BlurImage
          src={movie?.poster_img}
          className="sm:rounded-2xl w-full aspect-[9/12] sm:w-[280px]"
          alt={movie?.title}
          width={280}
          height={100}
        />

        <div className="px-4 pt-4 sm:ml-4 sm:mt-4 bg-black -mt-10 rounded-t-3xl">
          <span className="flex items-end">
            <h1 className="text-2xl sm:text-4xl font-extrabold font-title">
              {movie?.title}
            </h1>
            <p className="text-neutral-400 ml-2">
              • {movie.release} • {movie.duration}
            </p>
          </span>
          <p className="text-lg text-neutral-400 mt-3">{movie.discription}</p>
          <div className="flex gap-2 my-2">
            {movie?.tags.split(",").map((v, i) => (
              <div
                className="bg-neutral-800 rounded-full p-1 px-2 text-sm"
                key={i}
              >
                {v}
              </div>
            ))}
          </div>
          <h2 className="mt-7 font-title text-xl font-bold">
            Available Downloads
          </h2>
          <div className="flex flex-col gap-2 mt-3">
            {awailableDownloads.map((v, i) => (
              <Link
                className="flex hover:bg-red-600 transition-color justify-between p-2 list-none bg-neutral-900 sm:w-72"
                key={i}
                href={v.url}
              >
                {v.name}
                <span className="opacity-40">{v.size}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
