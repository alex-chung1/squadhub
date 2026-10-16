import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  RotateCcw,
  Shuffle,
  Sparkles,
  Trophy,
  Users,
  WandSparkles,
} from "lucide-react";

import PlayerSelection from "~/components/teamgeneration/PlayerSelection";
import SoccerPitch from "../SoccerPitch";

import type { Player } from "~/types/player";
import type { Team } from "~/types/team";

type TeamGeneratorProps = {
  players: Player[];
};

export default function TeamGenerator({ players }: TeamGeneratorProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateTeams() {
    if (selectedPlayers.length === 0 || isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/teams/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerIds: selectedPlayers,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate teams. Please try again.");
      }

      const data = (await response.json()) as Team[];

      setTeams(data);
    } catch (err) {
      console.error("Team generation error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while generating teams.",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  function reset() {
    setSelectedPlayers([]);
    setTeams([]);
    setError(null);
  }

  function handleSelectionChange(playerIds: number[]) {
    setSelectedPlayers(playerIds);
    setTeams([]);
    setError(null);
  }

  return (
    <div className="mx-auto w-full max-w-[1500px] pb-16">
      {/* PLAYER SELECTION PANEL */}
      <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#141D29] shadow-[0_12px_35px_rgba(0,0,0,0.15)]">
        {/* PANEL HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-5 border-b border-white/[0.08] bg-gradient-to-r from-[#1C2B40] via-[#182436] to-[#141D29] px-5 py-6 sm:px-7">
          <div className="flex items-center gap-4">
            <div
              className="
                flex h-12 w-12 shrink-0 items-center justify-center
                rounded-xl border border-sky-300/20
                bg-sky-400/10 text-sky-200
                shadow-[0_0_20px_rgba(100,170,255,0.06)]
              "
            >
              <Users size={23} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Select Players
              </h2>
            </div>
          </div>

          {/* SELECTION COUNTER */}
          <div className="flex items-center gap-3 rounded-xl border border-sky-300/15 bg-[#0E1928]/80 px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-400/10 text-sky-300">
              <CheckCircle2 size={20} />
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                Selected
              </p>

              <p className="mt-0.5 text-lg font-black leading-tight text-white">
                <span className="text-sky-300">{selectedPlayers.length}</span>

                <span className="ml-1 text-xs font-medium text-slate-500">
                  / {players.length}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* PLAYER CARDS */}
        <div className="px-4 py-6 sm:px-6 sm:py-8">
          {players.length > 0 ? (
            <PlayerSelection
              players={players}
              selectedPlayers={selectedPlayers}
              onSelectionChange={handleSelectionChange}
            />
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0F1825] px-6 py-16 text-center">
              <Users size={36} className="text-slate-500" />

              <h3 className="mt-4 text-lg font-bold text-white">
                No Players Available
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Add players to your database to start generating teams.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* GENERATION ACTION BAR */}
      <section
        className="
          mt-6 flex flex-col gap-5 rounded-2xl
          border border-white/[0.08]
          bg-gradient-to-r from-[#19283B] via-[#172334] to-[#141D29]
          p-5 shadow-[0_12px_35px_rgba(0,0,0,0.15)]
          sm:flex-row sm:items-center sm:justify-between sm:p-6
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              flex h-12 w-12 shrink-0 items-center justify-center
              rounded-xl border border-sky-300/20
              bg-sky-400/10 text-sky-200
            "
          >
            <Shuffle size={23} strokeWidth={1.8} />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex w-full gap-3 sm:w-auto">
          {/* RESET */}
          <button
            type="button"
            onClick={reset}
            disabled={isGenerating}
            className="
              group flex h-12 flex-1 items-center justify-center
              gap-2 rounded-xl border border-white/10
              bg-[#263447] px-5 text-sm font-semibold
              text-slate-200
              transition-all duration-300
              hover:-translate-y-0.5 hover:border-white/25
              hover:bg-[#34465D] hover:text-white
              active:scale-[0.97]
              disabled:cursor-not-allowed disabled:opacity-40
              sm:flex-none
            "
          >
            <RotateCcw
              size={17}
              className="transition-transform duration-500 group-hover:-rotate-45"
            />
            Reset
          </button>

          {/* GENERATE */}
          <button
            type="button"
            onClick={generateTeams}
            disabled={selectedPlayers.length === 0 || isGenerating}
            className="
              group relative flex h-12 flex-1 items-center justify-center
              gap-2 overflow-hidden rounded-xl
              border border-white/30
              bg-gradient-to-r from-[#E6ECF4] via-[#BCC9DA] to-[#8CA2BC]
              px-6 text-sm font-black text-[#111D2C]
              shadow-[0_8px_24px_rgba(100,160,240,0.12)]
              transition-all duration-300
              hover:-translate-y-1 hover:scale-[1.02]
              hover:brightness-110
              hover:shadow-[0_10px_30px_rgba(140,190,255,0.25)]
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-40 disabled:shadow-none
              disabled:hover:translate-y-0
              disabled:hover:scale-100
              motion-reduce:transform-none
              sm:flex-none
            "
          >
            {/* ANIMATED SHINE */}
            <span
              aria-hidden="true"
              className="
                pointer-events-none absolute -left-1/2 top-0
                h-full w-1/3 -skew-x-12
                bg-gradient-to-r from-transparent via-white/80 to-transparent
                opacity-0 blur-sm transition-all duration-700
                group-hover:left-[130%] group-hover:opacity-100
                motion-reduce:hidden
              "
            />

            {isGenerating ? (
              <>
                <LoaderCircle size={19} className="relative animate-spin" />
                <span className="relative">Generating...</span>
              </>
            ) : (
              <>
                <WandSparkles
                  size={19}
                  className="relative transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-125"
                />

                <span className="relative">Generate Teams</span>

                <Sparkles
                  size={15}
                  className="relative opacity-70 transition-transform duration-500 group-hover:rotate-45 group-hover:scale-125"
                />
              </>
            )}
          </button>
        </div>
      </section>

      {/* ERROR MESSAGE */}
      {error && (
        <div
          role="alert"
          className="
            mt-5 flex items-center gap-3 rounded-xl
            border border-red-400/20 bg-red-500/10
            px-5 py-4 text-sm text-red-200
          "
        >
          <AlertCircle size={20} className="shrink-0 text-red-400" />
          {error}
        </div>
      )}

      {/* GENERATED TEAMS */}
      {teams.length > 0 && (
        <section className="mt-12">
          {/* RESULTS HEADER */}
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <Trophy size={16} className="text-amber-300" />

                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-200">
                  Match Results
                </span>
              </div>

              <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Generated Teams
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                Your balanced squads are ready for kickoff.
              </p>
            </div>

            <div
              className="
                flex items-center gap-2 rounded-full
                border border-sky-300/15
                bg-sky-400/[0.06] px-4 py-2
                text-xs font-semibold text-sky-200
              "
            >
              <CheckCircle2 size={15} />
              Balanced by Rating
            </div>
          </div>

          {/* SOCCER PITCH */}
          <div
            className="
              overflow-hidden rounded-2xl
              border border-white/[0.08]
              bg-[#141D29] p-3
              shadow-[0_12px_35px_rgba(0,0,0,0.15)]
              sm:p-5
            "
          >
            <SoccerPitch teams={teams} />
          </div>
        </section>
      )}
    </div>
  );
}
