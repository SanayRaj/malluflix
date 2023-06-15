import BlurImage from "@/components/BlurImage";
import { supabase } from "@/lib/supabase/supabaseConfig";
import Link from "next/link";

export const revalidate = 10;

export async function getMovies() {
  let { data, error } = await supabase
    .from("movies")
    .select("id, poster_img, title, duration, release");
  if (error) {
    console.log("Supabase Error", error);
  }
  return data;
}

export default async function page() {
  const data = await getMovies();

  return (
    <main className="w-full container mx-auto px-3">
      <div className="gap-2 sm:gap-6 w-full grid grid-cols-2 sm:grid-cols-5 rounded-xl pt-12 sm:pt-5 mb-6">
        {data?.map((value, i) => (
          <Link
            href={`/movie/${value.id}`}
            key={i}
            className="relative w-full rounded-xl aspect-[9/14] overflow-hidden"
          >
            <BlurImage
              src={value.poster_img}
              className="absolute inset-0 -z-10"
              alt={value.title}
              fill
            />
            <div className="bg-gradient-to-b from-transparent to-gray-950 absolute bottom-0 left-0 right-0 top-1/2 flex flex-col justify-end p-2 ">
              <h1 className="font-bold font-title text-sm sm:text-lg">
                {value.title}
              </h1>
              <p className="text-neutral-500 text-xs sm:text-sm">
                {value.release} • {value.duration}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <footer className="container bg-gray-900 rounded-t-xl mx-auto px-3 py-5 text-center font-title">
        <h1 className="text-gray-500 font-bold">© Malluflix 2023</h1>
        <div className="flex justify-center text-sm text-gray-400 gap-2">
          <Link href={"https://facebool/malluflix"}>Facebook</Link>
          <Link href={"https://tgram.me"}>Telegram</Link>
          <Link href={"https://github.com/malluflix"}>Github</Link>
        </div>
      </footer>
    </main>
  );
}
