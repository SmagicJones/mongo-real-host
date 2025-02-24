import { Link, useLoaderData } from "@remix-run/react";
import { client } from "../utils/mongo.js";
import { Button } from "../components/ui/button";

export default function WatchList() {
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
      <div className="flex justify-center items-center p-4">
        <div className="grid md:grid-cols-4 gap-4">
          {movies.map((movie) => {
            return (
              <Link prefetch="render" key={movie._id} className="movie-box">
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
  let collection = await db.collection("watchlist");
  let movies = await collection.find({}).limit(10).toArray();
  return movies;
}
