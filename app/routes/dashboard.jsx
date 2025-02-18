import { Outlet } from "@remix-run/react";
import { Link } from "@remix-run/react";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>I'm the dashboard</h1>
      </div>

      <div className="dashboard-links">
        <Link to="/dashboard/notes">Go to the notes</Link>
        <Link to="/dashboard/beans">Go to beans</Link>
      </div>
      <div className="dashboard-outlet-wrapper">
        <Outlet />
      </div>
    </div>
  );
}
