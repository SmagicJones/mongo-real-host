import { Link, useLoaderData, Form } from "@remix-run/react";
import { client } from "../utils/mongo.js";
import { Button } from "../components/ui/button";
import { ObjectId } from "mongodb";

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
              <div key={movie._id} className="movie-box">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="p-4">{movie.plot}</p>
                {movie.poster && (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="rounded"
                  />
                )}
                <div className="flex justify-center items-center gap-4 p-4">
                  <Form method="post">
                    <input name="deleteid" hidden defaultValue={movie._id} />
                    <Button>Delete</Button>
                  </Form>
                  <Link to={`/movies/${movie.movie_id}`}>
                    <Button>More Info</Button>
                  </Link>
                </div>
              </div>
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
  let movies = await collection.find({}).toArray();
  return movies;
}

export async function action({ request }) {
  const formData = await request.formData();
  const formEntry = Object.fromEntries(formData);
  const deleteId = formEntry.deleteid;

  let db = await client.db("sample_mflix");
  let collection = await db.collection("watchlist");
  await collection.deleteOne({ _id: new ObjectId(deleteId) });
  return null;
}
