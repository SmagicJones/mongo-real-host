import { client } from "../utils/mongo.js";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { Button } from "../components/ui/button";
import { useRef } from "react";

export default function Notes() {
  const movies = useActionData();
  const formRef = useRef();

  if (formRef.current) {
    formRef.current.reset();
  }

  return (
    <main>
      <div className="heading-wrapper">
        <div>
          <h1 className="heading">Search By Director</h1>
        </div>
      </div>
      <div className="w-[100%] flex justify-center items-center p-4">
        <Form
          method="post"
          ref={formRef}
          className="grid md:grid-cols-2 gap-2 p-4 bg-slate-300 rounded"
        >
          <label htmlFor="director">Enter Director</label>
          <input
            type="text"
            name="director"
            id="director"
            className="rounded"
          />
          <Button>Search</Button>
        </Form>
      </div>

      {movies && (
        <section>
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
        </section>
      )}
    </main>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const formEntry = Object.fromEntries(formData);
  const director = formEntry.director;
  const santisedDirector = director.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );

  let db = await client.db("sample_mflix");
  let collection = await db.collection("movies");
  let movies = await collection
    .find({ directors: santisedDirector })
    .limit(10)
    .toArray();

  return movies;
}
