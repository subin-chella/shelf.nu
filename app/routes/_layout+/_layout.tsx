import type {
  LinksFunction,
  LoaderArgs,
  LoaderFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Breadcrumbs } from "~/components/layout/breadcrumbs";
import Sidebar from "~/components/layout/sidebar";
import { Toaster } from "~/components/shared/toast";
import { requireAuthSession } from "~/modules/auth";
import { getUserByEmail } from "~/modules/user";
import styles from "~/styles/layout/index.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const authSession = await requireAuthSession(request);

  const user = authSession
    ? await getUserByEmail(authSession?.email)
    : undefined;

  return json({
    user,
  });
};

// @TODO here we need to adjust the shouldRevalidate to only validate when the user is being updated/changed

export default function App() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div id="container" className="flex min-h-screen min-w-[320px] flex-col">
      <div className="flex flex-col md:flex-row">
        <Sidebar user={user} />
        <main className="w-full bg-gray-25 px-4 py-8 md:px-8">
          <div className="flex h-full flex-1 flex-col">
            <Breadcrumbs />
            <Outlet />
          </div>
          <Toaster />
        </main>
      </div>
    </div>
  );
}