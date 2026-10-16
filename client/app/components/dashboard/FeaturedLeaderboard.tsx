import { Footprints, Trophy, Users } from "lucide-react";

import FeaturedPlayerCard from "./FeaturedPlayerCard";
import type { Player } from "~/types/player";

export type PlayerStat = {
  player: Player;
  value: number;
};

type FeaturedLeaderboardProps = {
  title: string;
  type: "goals" | "assists";
  leader: PlayerStat | null;
  isDemo?: boolean;
};

export default function FeaturedLeaderboard({
  title,
  type,
  leader,
  isDemo = false,
}: FeaturedLeaderboardProps) {
  const isGoals = type === "goals";

  const accent = isGoals ? "text-amber-300" : "text-sky-300";

  return (
    <section
      className={`
        flex h-full flex-col rounded-2xl border
        bg-gradient-to-br from-[#1A222D] to-[#101821]
        p-5 sm:p-6
        ${isGoals ? "border-amber-400/20" : "border-sky-400/20"}
      `}
    >
      <div className="flex items-center gap-3">
        {isGoals ? (
          <Trophy size={22} className={accent} />
        ) : (
          <Footprints size={22} className={accent} />
        )}

        <h2 className="text-lg font-bold text-white">{title}</h2>

        {isDemo && (
          <span className="ml-auto rounded-full border border-white/10 px-2 py-1 text-[10px] text-slate-400">
            Demo
          </span>
        )}
      </div>

      {leader ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 py-5 sm:flex-row sm:gap-8">
          <FeaturedPlayerCard player={leader.player} />

          <div className="min-w-0 text-center sm:text-left">
            <p
              className={`text-[10px] font-bold uppercase tracking-[0.15em] ${accent}`}
            >
              {isGoals ? "Golden Boot" : "Top Playmaker"}
            </p>

            <h3 className="mt-2 break-words text-xl font-black text-white">
              {leader.player.name}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
              {leader.player.position} · {leader.player.rating} OVR
            </p>

            <p className={`mt-4 text-5xl font-black ${accent}`}>
              {leader.value}
            </p>

            <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">
              {type}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[220px] flex-1 flex-col items-center justify-center text-center">
          <Users size={30} className="text-slate-500" />

          <p className="mt-3 text-sm text-slate-400">
            Add players to display the leader.
          </p>
        </div>
      )}
    </section>
  );
}
