import { Outlet, Link } from "@remix-run/react";
import { Button } from "../components/ui/button";

export default function Dashboard() {
  return (
    <div className="">
      <div className="dashboard-header">
        <div>
          <h1>Search Movies</h1>
          <Link to="/" prefetch="render">
            <Button>Home</Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 pt-4">
        <Link to="/dashboard/year" className="flex justify-center items-center">
          <Button>Search by Year</Button>
        </Link>
        <Link
          to="/dashboard/actor"
          className="flex justify-center items-center"
        >
          <Button>Search by Actor</Button>
        </Link>
        <Link
          to="/dashboard/director"
          className="flex justify-center items-center"
        >
          <Button>Search by Director</Button>
        </Link>
      </div>
      <div className="dashboard-outlet-wrapper">
        <Outlet />
      </div>
    </div>
  );
}
