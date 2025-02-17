import { useLoaderData } from "@remix-run/react";
import { client } from "../utils/mongo.js";

export default function Movie() {
  const movie = useLoaderData();
  console.log(movie);
  return <h1>{movie.title}</h1>;
}

export async function loader() {
  let db = await client.db("sample_mflix");
  let collection = await db.collection("movies");
  let movie = await collection.findOne();
  return movie;
}
