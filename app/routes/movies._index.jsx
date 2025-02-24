import { Link, useLoaderData } from "@remix-run/react";
import { client } from "../utils/mongo.js";

export default function Movies() {
  const movies = useLoaderData();
  console.log(movies);
  return (
    <main>
      <div className="heading-wrapper">
        <h1 className="heading">Movies</h1>
      </div>
      <div className="grid-wrapper">
        <div className="grid-container">
          {movies.map((movie) => {
            return (
              <Link
                prefetch="render"
                to={`/movies/${movie._id}`}
                key={movie._id}
                className="movie-box"
              >
                <h3 className="movie-title">{movie.title}</h3>
                <div className="image-wrapper"></div>
                {movie.poster && (
                  <div className="image-wrapper">
                    <img className="image" src={movie.poster} />
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export async function loader() {
  let db = await client.db("sample_mflix");
  let collection = await db.collection("movies");
  let movies = await collection.find({}).limit(200).toArray();
  return movies;
}
