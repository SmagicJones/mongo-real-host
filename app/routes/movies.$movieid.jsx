import { Link, useLoaderData } from "@remix-run/react";
import { client } from "../utils/mongo.js";
import { ObjectId } from "mongodb";
import { Button } from "../components/ui/button";

export default function Movie() {
  const movie = useLoaderData();
  console.log(movie);

  return (
    <main>
      <div className="heading-wrapper">
        <div>
          <h1 className="heading">{movie.title}</h1>
          <Link to="/movies" prefetch="render">
            <Button>Back to Movies</Button>
          </Link>
          <div>
            <ul className="text-sm p-4">
              <li>{movie.runtime} Minutes</li>
            </ul>
            {movie.directors && (
              <ul className="text-sm">
                <b>Directed By:</b>
                {movie.directors.map((director, index) => {
                  return <li key={index}>{director}</li>;
                })}
              </ul>
            )}
            {movie.genres && (
              <ul className="text-sm p-4">
                {movie.genres.map((genre, index) => {
                  return <li key={index}>{genre}</li>;
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="single-movie-box">
        <div>
          <p>{movie.fullplot}</p>

          {movie.cast && (
            <ul className="p-4">
              <b>Starring:</b>
              {movie.cast.map((actor, index) => {
                return <li key={index}>{actor}</li>;
              })}
            </ul>
          )}

          {movie.writers && (
            <ul className="p-4 text-sm">
              <b>Written By:</b>
              {movie.writers.map((writer, index) => {
                return <li key={index}>{writer}</li>;
              })}
            </ul>
          )}
          {movie.poster && (
            <div className="image-wrapper">
              <img src={movie.poster} alt={movie.title} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export async function loader({ params }) {
  let db = await client.db("sample_mflix");
  let collection = await db.collection("movies");
  const id = params.movieid;
  let movie = await collection.findOne({
    _id: new ObjectId(id),
  });
  return movie;
}
