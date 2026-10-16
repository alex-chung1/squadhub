import type { Player } from "~/types/player";

import FeaturedLeaderboard from "./FeaturedLeaderboard";
import MVPVoteCard from "./MVPVoteCard";
import UpcomingGamesCard from "./UpcomingGamesCard";
import WeatherCard from "./WeatherCard";

import type { PlayerStat } from "./FeaturedLeaderboard";
import type { UpcomingGame } from "./UpcomingGamesCard";

type DashboardGridProps = {
  players: Player[];
};

const sampleGames: UpcomingGame[] = [
  {
    id: 1,
    title: "Saturday Pickup",
    time: "10:00 AM",
    location: "Location TBD",
  },
  {
    id: 2,
    title: "Weekend Football",
    time: "1:00 PM",
    location: "Location TBD",
  },
  {
    id: 3,
    title: "Friendly Match",
    time: "11:00 AM",
    location: "Location TBD",
  },
];

function demoLeader(
  players: Player[],
  index: number,
  value: number,
): PlayerStat | null {
  const player = players[index];

  if (!player) return null;

  return {
    player,
    value,
  };
}

export default function DashboardGrid({ players }: DashboardGridProps) {
  const topScorer = demoLeader(players, 0, 12);

  const topAssister = demoLeader(players, players.length > 1 ? 1 : 0, 9);

  return (
    <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-6">
      {/* TOP ROW: THREE CARDS */}
      <div className="md:col-span-1 xl:col-span-2">
        <FeaturedLeaderboard
          title="Top Goals"
          type="goals"
          leader={topScorer}
          isDemo
        />
      </div>

      <div className="md:col-span-1 xl:col-span-2">
        <FeaturedLeaderboard
          title="Top Assists"
          type="assists"
          leader={topAssister}
          isDemo
        />
      </div>

      <div className="md:col-span-2 xl:col-span-2">
        <MVPVoteCard game={null} />
      </div>

      {/* BOTTOM ROW: WEATHER + GAMES */}
      <div className="min-w-0 md:col-span-2 xl:col-span-4">
        <WeatherCard
          location="New York, NY"
          latitude={40.7128}
          longitude={-74.006}
        />
      </div>

      <div className="min-w-0 md:col-span-2 xl:col-span-2">
        <UpcomingGamesCard games={sampleGames} isDemo />
      </div>
    </div>
  );
}
