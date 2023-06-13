import { NextRequest } from "next/server";

const MOVIES = [
  {
    title: "2018",
    image: "2018",
    duration: "2h 30m",
    discription:
      "A disaster film set during the 2018 Kerala Floods where people from all walks of life faced catastrophic consequences and put in collective efforts to survive the calamity.",
    director: "Jude Anthany Joseph",
    tags: ["Action", "Drama", "Thriller"],
    release: 2023,
  },
  {
    title: "Neelavelicham",
    image: "neelavelicham",
    duration: "2h 12m",
    discription:
      "A young, enthusiastic and free-spirited writer arrives to stay in a desolate mansion, rumored to be haunted by the apparition of a young woman who committed suicide when she was betrayed in love.",
    director: "Aashiq Abu",
    tags: ["Drama", "Horror", "Romance"],
    release: 2023,
  },
  {
    title: "Ayalvaashi",
    image: "ayal_vaashi",
    duration: "1h 47m",
    discription: "",
    director: "",
    tags: ["Comedy", "Drama"],
    release: 2023,
  },
  {
    title: "Romancham",
    image: "romancham",
    duration: "2h 10m",
    discription:
      "A game of Ouija board goes hilariously wrong when seven bachelors unexpectedly invite a spirit and try to make the best out of the situation.",
    director: "Jithu Madhavan",
    tags: ["Comedy", "Horror"],
    release: 2023,
  },
  //   hhasfhd fsnhfovfoirjr
  {
    title: "345",
    image: "ayal_vaashi",
    duration: "2h 30m",
    discription:
      "A disaster film set during the 2018 Kerala Floods where people from all walks of life faced catastrophic consequences and put in collective efforts to survive the calamity.",
    director: "Jude Anthany Joseph",
    tags: ["Action", "Drama", "Thriller"],
    release: 2023,
  },
  {
    title: "Kakka",
    image: "neelavelicham",
    duration: "2h 12m",
    discription:
      "A young, enthusiastic and free-spirited writer arrives to stay in a desolate mansion, rumored to be haunted by the apparition of a young woman who committed suicide when she was betrayed in love.",
    director: "Aashiq Abu",
    tags: ["Drama", "Horror", "Romance"],
    release: 2023,
  },
  {
    title: "Pucha Ser",
    image: "",
    duration: "1h 47m",
    discription: "",
    director: "",
    tags: ["Comedy", "Drama"],
    release: 2023,
  },
  {
    title: "Mara Patti",
    image: "romancham",
    duration: "2h 10m",
    discription:
      "A game of Ouija board goes hilariously wrong when seven bachelors unexpectedly invite a spirit and try to make the best out of the situation.",
    director: "Jithu Madhavan",
    tags: ["Comedy", "Horror"],
    release: 2023,
  },
];

export async function GET(request: NextRequest) {
  const movie = MOVIES.filter(({ title }, _a, array) => {
    if (title == request.body) {
      return array;
    }
  });

  console.log(movie, "Padam", request.body);

  return new Response(JSON.stringify(movie), { status: 200 });
}
