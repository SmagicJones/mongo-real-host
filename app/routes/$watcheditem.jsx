import { useLoaderData, useActionData, Link, Form } from "@remix-run/react";
import { client } from "../utils/mongo.js";
import { ObjectId } from "mongodb";
import { Button } from "../components/ui/button";

export default function Item() {
  const movie = useLoaderData();
  // console.log(movie);
  const newDoc = useActionData();
  // console.log(newDoc, "New Doc!!!");
  console.log(movie);
  return (
    <main>
      <div className="heading-wrapper">
        <div>
          <h1 className="heading">{movie.title}</h1>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/movies" prefetch="render">
              <Button>Search More Movies</Button>
            </Link>
            <Link to="/watchlist" prefetch="render">
              <Button>Back to Watchlist</Button>
            </Link>
          </div>

          <div>
            <ul className="text-sm p-4">
              <li>{movie.title} Minutes</li>
            </ul>

            <div>
              <h3 className="text-2xl">Your Comment</h3>
              <div className="text-sm p-4">{movie.comment}</div>
            </div>
            <Form method="post" className="text-black grid gap-2">
              <input
                type="text"
                name="comment"
                id="comment"
                className="border"
              />

              <input type="hidden" name="movieid" defaultValue={movie._id} />
              <Button>Add Comment</Button>
            </Form>
          </div>
        </div>
      </div>
      <div className="single-movie-box">
        {/* <div className="flex justify-center gap-4">
          <div className="grid grid-cols-1 p-4">
            <h3 className="text-center text-2xl p-4">Comments</h3>
            <div className="rounded bg-slate-500 p-4">
              <h5 className="text-center">Add a comment</h5>
              <div className="grid md:grid-cols-2 gap-4 p-2">
                <div>
                  <Form method="post" className="text-black">
                    <input type="text" name="comment" id="comment" />
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="hidden"
                        name="movieid"
                        defaultValue={movie._id}
                      />
                      <Button>Add Comment</Button>
                    </div>
                  </Form>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div> */}

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
  let collection = await db.collection("watchlist");

  const id = params.watcheditem;

  let movie = await collection.findOne({
    _id: new ObjectId(id),
  });

  return movie;
}

export async function action({ request }) {
  const formData = await request.formData();
  const formEntry = Object.fromEntries(formData);

  let comment = formEntry.comment;
  const movieid = formEntry.movieid;

  let db = await client.db("sample_mflix");
  let collection = await db.collection("watchlist");
  const filter = { _id: new ObjectId(movieid) };
  const updateDocument = {
    $set: {
      comment: comment,
    },
  };
  const result = await collection.updateOne(filter, updateDocument);

  return result;
}
