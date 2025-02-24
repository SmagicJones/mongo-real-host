import { client } from "../utils/mongo.js";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";

export default function Search() {
  const movies = useActionData();

  return (
    <main>
      <p className="text-8xl">Testing</p>
      <div className="heading-wrapper">
        <h1 className="heading">Search</h1>
      </div>
      <div className="form-wrapper">
        <Form method="post" className="form">
          <label htmlFor="year">Enter a Year</label>
          <input type="number" name="year" id="year" />
          {/* <label htmlFor="title">Enter Title</label>
          <input type="text" name="title" id="title" /> */}
          <button>Go</button>
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
  const year = formEntry.year;
  const yearNum = Number(year);
  // const title = formEntry.title;

  let db = await client.db("sample_mflix");
  let collection = await db.collection("movies");
  let movies = await collection.find({ year: yearNum }).limit(200).toArray();

  return movies;
}
