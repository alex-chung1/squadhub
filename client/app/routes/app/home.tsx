import type { Route } from "./+types/home";
import type { Player } from "~/types/player";

import DashboardHeader from "~/components/dashboard/DashboardHeader";
import DashboardGrid from "~/components/dashboard/DashboardGrid";

const API_URL = "http://localhost:3000";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | SquadHub" },
    {
      name: "description",
      content: "SquadHub club dashboard",
    },
  ];
}

export async function loader() {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/players`);
  } catch {
    throw new Response("Cannot connect to the SquadHub backend.", {
      status: 503,
    });
  }

  if (!response.ok) {
    throw new Response("Failed to load players.", {
      status: response.status,
    });
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Response("Invalid players response.", {
      status: 502,
    });
  }

  return data as Player[];
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main className="min-h-screen bg-[#090F19] text-white">
      <div className="mx-auto max-w-[1700px] px-5 pb-12 pt-8 sm:px-8 lg:px-10">
        <DashboardHeader />

        <DashboardGrid players={loaderData} />
      </div>
    </main>
  );
}
