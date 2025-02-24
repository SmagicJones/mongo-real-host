import { Outlet, Link } from "@remix-run/react";
import { Button } from "../components/ui/button";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Search Movies</h1>
          <Link to="/" prefetch="render">
            <Button>Home</Button>
          </Link>
        </div>
      </div>

      <div className="dashboard-links">
        <Link to="/dashboard/year">Search by Year</Link>
        <Link to="/dashboard/actor">Search by Actor</Link>
        <Link to="/dashboard/director">Search by Director</Link>
      </div>
      <div className="dashboard-outlet-wrapper">
        <Outlet />
      </div>
    </div>
  );
}
