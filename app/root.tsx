import { LinksFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "~/css/styles.css?url";
import tailwind from "~/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwind },
  { rel: "stylesheet", href: styles },
];

import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* <div className="[--header-height:calc(theme(spacing.14))]">
          <SidebarProvider className="flex flex-col">
            <SiteHeader />
            <div className="flex flex-1">
              <AppSidebar />
              <SidebarInset>
                <div className="flex flex-1 flex-col gap-4 p-4">
                  <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                    <Outlet />
                  </div>
                </div>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </div> */}
        <Outlet />

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
