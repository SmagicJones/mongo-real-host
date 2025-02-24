import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main>
      <div className="heading-wrapper">
        <h1 className="heading">Movies</h1>
      </div>
      <div className="dashboard-links">
        <Link prefetch="render" to="/movies">
          All Movies
        </Link>
        <Link prefetch="render" to="/search">
          Search Movies
        </Link>
      </div>
    </main>
  );
}
