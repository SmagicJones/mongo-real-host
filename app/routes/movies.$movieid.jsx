import { useLoaderData } from "@remix-run/react";
import { client } from "../utils/mongo.js";
import { ObjectId } from "mongodb";

export default function Movie() {
  const movie = useLoaderData();

  return (
    <main>
      <div className="heading-wrapper">
        <h1 className="heading">{movie.title}</h1>
      </div>
      <div className="single-movie-box">
        <p>{movie.plot}</p>
      </div>
      <h3>Written by</h3>
      <ul>
        {movie.writers.map((writer) => {
          return <li>{writer}</li>;
        })}
      </ul>
    </main>
  );
}

export async function loader({ params }) {
  let db = await client.db("sample_mflix");
  let collection = await db.collection("movies");
  const id = params.movieid;

  // const id = "573a13b5f29313caabd439db";
  let movie = await collection.findOne({
    _id: new ObjectId(id),
  });
  return movie;
}
