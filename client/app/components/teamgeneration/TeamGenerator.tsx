import { useState } from "react";
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

  async function generateTeams() {
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
      throw new Error("Failed to generate teams");
    }

    const data = (await response.json()) as Team[];

    setTeams(data);
  }

  function reset() {
    setSelectedPlayers([]);
    setTeams([]);
  }

  return (
    <div className="mx-auto w-full max-w-[1400px] pb-16">
      {/* PAGE HEADER */}
      <header className="mb-10 border-b border-border-subtle/70 pb-8">
        <h1 className="font-brand text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
          Generate <span className="text-silver">Teams</span>
        </h1>
      </header>

      {/* PLAYER SELECTION */}
      <section>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-brand text-2xl font-bold tracking-tight text-text-primary">
              Select Players
            </h2>
            <div className="mb-6 "></div>
          </div>

          {/* SELECTION COUNTER */}
          <div className="flex items-center gap-3 rounded-xl border border-border-subtle bg-surface px-4 py-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-raised text-silver">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-text-muted">
                Selected
              </p>

              <p className="font-brand text-lg font-bold leading-tight text-text-primary">
                {selectedPlayers.length}
                <span className="ml-1 text-xs text-text-muted">
                  / {players.length}
                </span>
              </p>
            </div>
          </div>
        </div>

        <PlayerSelection
          players={players}
          selectedPlayers={selectedPlayers}
          onSelectionChange={setSelectedPlayers}
        />
      </section>

      {/* GENERATION ACTION BAR */}
      <section className="mt-8 flex flex-col gap-5 rounded-2xl border border-border-subtle bg-surface p-5 shadow-[0_12px_35px_rgba(0,0,0,0.12)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border-subtle bg-surface-raised text-silver">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="m18 14 4 4-4 4" />
              <path d="m18 2 4 4-4 4" />
              <path d="M2 18h1.5a6 6 0 0 0 5-2.7L15.5 4.7A6 6 0 0 1 20.5 2H22" />
              <path d="M2 6h1.5a6 6 0 0 1 5 2.7l1.2 1.8" />
              <path d="M14.5 15.3l1 1.5a6 6 0 0 0 5 2.7H22" />
            </svg>
          </div>

          <div>
            <p className="text-sm font-bold text-text-primary">
              Ready to generate?
            </p>

            <p className="mt-1 text-xs text-text-secondary">
              {selectedPlayers.length === 0
                ? "Select players to continue."
                : `${selectedPlayers.length} players selected.`}
            </p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex w-full gap-3 sm:w-auto">
          <button
            type="button"
            onClick={reset}
            className="flex h-11 flex-1 items-center justify-center rounded-xl border border-border-subtle bg-surface-raised px-5 text-sm font-bold text-silver transition-all duration-200 hover:border-silver-dark hover:bg-surface-hover hover:text-white sm:flex-none"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={generateTeams}
            disabled={selectedPlayers.length === 0}
            className="
              group flex h-11 flex-1 items-center justify-center
              gap-2 rounded-xl border border-[#B8C4D4]/70
              bg-gradient-to-br from-[#E8EDF5] via-[#C4CFDE] to-[#8998AD]
              px-6 text-sm font-extrabold text-[#111827]
              shadow-[0_4px_18px_rgba(196,207,222,0.12)]
              transition-all duration-200
              hover:-translate-y-0.5 hover:brightness-110
              hover:shadow-[0_6px_24px_rgba(196,207,222,0.22)]
              disabled:cursor-not-allowed disabled:opacity-40
              disabled:shadow-none disabled:hover:translate-y-0
              sm:flex-none
            "
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12"
              aria-hidden="true"
            >
              <path d="m18 14 4 4-4 4" />
              <path d="m18 2 4 4-4 4" />
              <path d="M2 18h1.5a6 6 0 0 0 5-2.7L15.5 4.7A6 6 0 0 1 20.5 2H22" />
              <path d="M2 6h1.5a6 6 0 0 1 5 2.7l1.2 1.8" />
              <path d="M14.5 15.3l1 1.5a6 6 0 0 0 5 2.7H22" />
            </svg>
            Generate Teams
          </button>
        </div>
      </section>

      {/* GENERATED TEAMS */}
      {teams.length > 0 && (
        <section className="mt-14">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-8 bg-silver-dark" />

                <span className="font-brand text-[11px] font-bold uppercase tracking-[0.2em] text-silver">
                  Match Result
                </span>
              </div>

              <h2 className="font-brand text-3xl font-bold tracking-tight text-text-primary">
                Generated Teams
              </h2>

              <p className="mt-2 text-sm text-text-secondary">
                Your balanced teams are ready for kickoff.
              </p>
            </div>

            <div className="hidden items-center gap-2 rounded-full border border-border-subtle bg-surface px-4 py-2 text-xs font-bold text-silver sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-silver" />
              Balanced by Rating
            </div>
          </div>

          <SoccerPitch teams={teams} />
        </section>
      )}
    </div>
  );
}
