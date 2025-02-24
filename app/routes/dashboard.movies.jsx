import { Link, useLoaderData } from "@remix-run/react";
import { client } from "../utils/mongo.js";
import { Button } from "../components/ui/button";

export default function Beans() {
  const movies = useLoaderData();
  return (
    <main>
      <div className="heading-wrapper">
        <div>
          <h1 className="heading">Movies</h1>
          <Link to="/" prefetch="render">
            <Button>Home</Button>
          </Link>
        </div>
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
                <p className="p-4">{movie.plot}</p>
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
