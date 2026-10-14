import type { Route } from "./+types/generate";
import TeamGenerator from "~/components/teamgeneration/TeamGenerator";
import SquadHeader from "~/components/SquadHeader";
import type { Player } from "~/types/player";

const API_URL = "http://localhost:3000";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Generate Teams | SquadHub" },
    {
      name: "description",
      content: "Generate balanced teams",
    },
  ];
}

export async function loader() {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/players`);
  } catch (error) {
    console.error("Unable to connect to SquadHub API:", error);

    throw new Response(
      "Cannot connect to the SquadHub backend. Check that your Express server is running on port 3000.",
      { status: 503, statusText: "Service Unavailable" },
    );
  }

  if (!response.ok) {
    const errorBody = await response.text();

    console.error("Failed to fetch players:", {
      status: response.status,
      body: errorBody,
    });

    throw new Response(
      `Failed to fetch players. Backend returned HTTP ${response.status}.`,
      {
        status: response.status,
        statusText: "Players API Error",
      },
    );
  }

  try {
    const players = (await response.json()) as Player[];

    if (!Array.isArray(players)) {
      throw new Error("Expected an array of players");
    }

    return players;
  } catch (error) {
    console.error("Invalid players API response:", error);

    throw new Response("The SquadHub backend returned invalid player data.", {
      status: 502,
      statusText: "Bad Gateway",
    });
  }
}

export default function Generate({ loaderData }: Route.ComponentProps) {
  return (
    <main className="min-h-screen bg-[#070b12] text-white">
      <SquadHeader />

      <div className="mx-auto max-w-[1600px] px-6 py-10 lg:px-10">
        <TeamGenerator players={loaderData} />
      </div>
    </main>
  );
}
