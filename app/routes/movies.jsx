import { useLoaderData } from "@remix-run/react";
import { client } from "../utils/mongo.js";

export default function Movies() {
  const movies = useLoaderData();
  console.log(movies);
  return (
    <main>
      <div style={{ textAlign: "center" }}>
        <h1>Movies</h1>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "25% 25% 25% 25%",
          gap: "20px",
        }}
      >
        {movies.map((movie) => {
          return (
            <div
              style={{
                background: "#000",
                padding: "2em",
                textAlign: "center",
                color: "#fff",
                fontFamily: "monospace",
              }}
            >
              {movie.title}
            </div>
          );
        })}
      </div>
    </main>
  );
}

export async function loader() {
  let db = await client.db("sample_mflix");
  let collection = await db.collection("movies");
  let movies = await collection.find({ year: 2012 }).limit(10).toArray();
  return movies;
}
