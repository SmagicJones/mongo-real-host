import { Outlet, Link } from "@remix-run/react";
import { Button } from "../components/ui/button";

export default function Dashboard() {
  return (
    <div className="">
      <div className="dashboard-header">
        <div>
          <h1 className="text-2xl p-4">Welcome to the Dashboard</h1>
          <Link to="/" prefetch="render" className="p-4">
            <Button>Home</Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 pt-4">
        <Link to="/dashboard/year">
          <Button>Search by Year</Button>
        </Link>
        <Link to="/dashboard/actor">
          <Button>Search by Actor</Button>
        </Link>
        <Link to="/dashboard/director">
          <Button>Search by Director</Button>
        </Link>
        <Link to="/watchlist">
          <Button>Go to the watchlist</Button>
        </Link>
      </div>
      <div className="dashboard-outlet-wrapper">
        <Outlet />
      </div>
    </div>
  );
}
