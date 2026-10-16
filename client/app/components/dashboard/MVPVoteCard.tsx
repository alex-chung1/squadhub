import { useState } from "react";
import { Award, CheckCircle2, Vote } from "lucide-react";
import type { Player } from "~/types/player";

export type MVPGame = {
  id: number;
  title: string;
  date: string;
  candidates: Player[];
  votingOpen: boolean;
};

type MVPVoteCardProps = {
  game: MVPGame | null;
};

export default function MVPVoteCard({ game }: MVPVoteCardProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const candidates = game?.candidates ?? [];
  const selectedPlayer = candidates.find((player) => player.id === selectedId);

  return (
    <section className="flex h-full flex-col rounded-2xl border border-violet-400/20 bg-gradient-to-br from-[#24213A] via-[#1B2033] to-[#111923] p-5 sm:p-6">
      <div className="flex items-center gap-3">
        <Award size={22} className="text-violet-300" />
        <h2 className="text-lg font-bold text-white">Vote MVP</h2>
      </div>

      <p className="mt-2 text-xs text-slate-400">Player of the Match</p>

      {!game ? (
        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <div className="rounded-2xl border border-violet-300/15 bg-violet-300/10 p-5">
            <Vote size={36} className="text-violet-300" />
          </div>

          <h3 className="mt-5 text-base font-bold text-white">
            Who was your MVP?
          </h3>

          <p className="mt-2 max-w-[240px] text-xs leading-5 text-slate-400">
            Voting opens after a completed match.
          </p>

          <button
            type="button"
            disabled
            className="mt-5 w-full cursor-not-allowed rounded-xl bg-violet-400/15 px-4 py-3 text-sm font-semibold text-violet-200/60"
          >
            No Active Vote
          </button>
        </div>
      ) : (
        <div className="mt-5 flex flex-1 flex-col">
          <p className="text-sm font-bold text-white">{game.title}</p>

          <p className="mt-1 text-xs text-slate-400">{game.date}</p>

          <div className="mt-4 max-h-[190px] space-y-2 overflow-y-auto">
            {candidates.map((player) => {
              const selected = selectedId === player.id;

              return (
                <button
                  key={player.id}
                  type="button"
                  disabled={!game.votingOpen}
                  onClick={() => setSelectedId(player.id)}
                  aria-pressed={selected}
                  className={`flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition ${
                    selected
                      ? "border-violet-300/60 bg-violet-400/15"
                      : "border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-400/15 text-xs font-bold text-violet-200">
                    {player.name.charAt(0).toUpperCase()}
                  </div>

                  <span className="min-w-0 flex-1 truncate text-sm font-semibold text-white">
                    {player.name}
                  </span>

                  {selected && (
                    <CheckCircle2 size={18} className="text-violet-300" />
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            disabled
            className="mt-auto w-full cursor-not-allowed rounded-xl bg-violet-400/15 px-4 py-3 text-sm font-semibold text-violet-200/60"
          >
            {selectedPlayer
              ? `Vote for ${selectedPlayer.name} — Coming Soon`
              : "Voting Backend Coming Soon"}
          </button>
        </div>
      )}
    </section>
  );
}
