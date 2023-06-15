import BlurImage from "@/components/BlurImage";
import { supabase } from "@/lib/supabase/supabaseConfig";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getMovie(id: string) {
  let { data, error } = await supabase.from("movies").select().eq("id", id);
  if (error || !data) {
    notFound();
  } else return { movie: data[0] };
}

const page = async ({ params }: { params: { id: string } }) => {
  const movie = (await getMovie(params.id)).movie;
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
    <main className="w-full container mx-auto mb-6 sm:px-3 -mt-14 sm:mt-0">
      <section className="grid sm:grid-cols-[280px_auto] sm:grid-flow-col sm:mt-4 sm:mx-4">
        <div className="sm:w-[280px] aspect-square sm:aspect-[9/14] w-full rounded-2xl overflow-hidden -z-10">
          <BlurImage
            src={movie?.poster_img}
            className="rounded-2xl w-full aspect-[9/14]"
            alt={movie?.title}
            width={280}
            height={0}
          />
        </div>

        <div className="px-4 pt-4 sm:ml-4 sm:mt-4 bg-black -mt-10 rounded-t-3xl">
          <h1 className="text-2xl sm:text-4xl font-extrabold font-title">
            {movie?.title}
          </h1>

          <p className="text-neutral-400">
            {movie.release} • {movie.duration}
          </p>
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
};

export default page;
