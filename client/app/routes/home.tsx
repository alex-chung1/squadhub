import { useMemo, useState } from "react";
import { Link } from "react-router";

import type { Route } from "./+types/home";
import PlayerCard from "~/components/PlayerCard";
import type { Player } from "~/types/player";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SquadHub" },
    {
      name: "description",
      content: "SquadHub team roster",
    },
  ];
}

export async function loader() {
  const response = await fetch("http://localhost:3000/players");

  if (!response.ok) {
    throw new Error("Failed to fetch players");
  }

  const result = (await response.json()) as Player[];

  return result;
}

type PositionFilter = "ALL" | "ATT" | "MID" | "DEF";

export default function Home({ loaderData }: Route.ComponentProps) {
  const players = loaderData;

  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState<PositionFilter>("ALL");

  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch = player.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPosition =
        positionFilter === "ALL" || player.position === positionFilter;

      return matchesSearch && matchesPosition;
    });
  }, [players, search, positionFilter]);

  const positionFilters: {
    label: string;
    value: PositionFilter;
  }[] = [
    {
      label: "All",
      value: "ALL",
    },
    {
      label: "Attackers",
      value: "ATT",
    },
    {
      label: "Midfielders",
      value: "MID",
    },
    {
      label: "Defenders",
      value: "DEF",
    },
  ];

  return (
    <main className="min-h-screen bg-[#070b12] text-white">
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <header className="border-b border-white/[0.08]">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 lg:px-10">
          {/* LOGO */}

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-emerald-400
                font-black
                text-emerald-950
                shadow-[0_0_25px_rgba(52,211,153,0.15)]
              "
            >
              S
            </div>

            <div>
              <h1 className="text-lg font-black tracking-tight">SquadHub</h1>

              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                Football Squad
              </p>
            </div>
          </div>

          {/* GENERATE TEAMS */}

          <Link
            to="/generate-teams"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-emerald-400
              px-4
              py-2.5
              text-sm
              font-black
              text-emerald-950
              shadow-[0_0_20px_rgba(52,211,153,0.15)]
              transition-all
              hover:-translate-y-0.5
              hover:bg-emerald-300
              hover:shadow-[0_0_25px_rgba(52,211,153,0.25)]
            "
          >
            {/* Shuffle Icon */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m18 14 4 4-4 4" />
              <path d="m18 2 4 4-4 4" />
              <path d="M2 18h1.5a6 6 0 0 0 5-2.7L15.5 4.7A6 6 0 0 1 20.5 2H22" />
              <path d="M2 6h1.5a6 6 0 0 1 5 2.7l1.2 1.8" />
              <path d="M14.5 15.3l1 1.5a6 6 0 0 0 5 2.7H22" />
            </svg>

            <span className="hidden sm:inline">Generate Teams</span>

            <span className="sm:hidden">Generate</span>
          </Link>
        </div>
      </header>

      {/* ================================= */}
      {/* PAGE CONTENT */}
      {/* ================================= */}

      <div className="mx-auto max-w-[1600px] px-6 py-10 lg:px-10">
        {/* ================================= */}
        {/* ROSTER TITLE */}
        {/* ================================= */}

        <section>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-emerald-400
                    shadow-[0_0_10px_rgba(52,211,153,0.8)]
                  "
                />

                <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                  My Squad
                </span>
              </div>

              <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
                Team Roster
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                Your complete SquadHub roster. View player ratings and positions
                or generate balanced teams for your next match.
              </p>
            </div>

            {/* PLAYER COUNT */}

            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="font-black text-white">{players.length}</span>

              <span>
                {players.length === 1 ? "player" : "players"} in squad
              </span>
            </div>
          </div>
        </section>

        {/* ================================= */}
        {/* CONTROLS */}
        {/* ================================= */}

        <section className="mt-10">
          <div
            className="
              flex
              flex-col
              gap-4
              border-y
              border-white/[0.08]
              py-5
              xl:flex-row
              xl:items-center
              xl:justify-between
            "
          >
            {/* POSITION FILTERS */}

            <div className="flex flex-wrap gap-2">
              {positionFilters.map((filter) => {
                const active = positionFilter === filter.value;

                return (
                  <button
                    key={filter.value}
                    type="button"
                    onClick={() => setPositionFilter(filter.value)}
                    className={`
                      rounded-xl
                      px-4
                      py-2.5
                      text-xs
                      font-black
                      transition-all
                      ${
                        active
                          ? "bg-white text-slate-950 shadow-lg"
                          : "border border-white/[0.08] bg-white/[0.03] text-slate-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                      }
                    `}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* SEARCH */}

            <div className="relative w-full xl:w-72">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="
                  absolute
                  left-4
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-slate-500
                "
              >
                <circle cx="11" cy="11" r="8" />

                <path d="m21 21-4.3-4.3" />
              </svg>

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search squad..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white/[0.03]
                  pl-11
                  pr-4
                  text-sm
                  text-white
                  outline-none
                  transition
                  placeholder:text-slate-600
                  hover:border-white/20
                  focus:border-emerald-400/40
                  focus:bg-white/[0.05]
                  focus:ring-2
                  focus:ring-emerald-400/10
                "
              />
            </div>
          </div>
        </section>

        {/* ================================= */}
        {/* FILTER RESULT COUNT */}
        {/* ================================= */}

        <section className="mt-7">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
              {positionFilter === "ALL"
                ? "All Players"
                : positionFilter === "ATT"
                ? "Attackers"
                : positionFilter === "MID"
                ? "Midfielders"
                : "Defenders"}
            </p>

            <p className="text-xs text-slate-600">
              {filteredPlayers.length} shown
            </p>
          </div>
        </section>

        {/* ================================= */}
        {/* PLAYER GRID */}
        {/* ================================= */}

        {filteredPlayers.length > 0 ? (
          <section
            className="
              mt-8
              grid
              grid-cols-1
              justify-items-center
              gap-x-7
              gap-y-12
              min-[500px]:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
            "
          >
            {filteredPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </section>
        ) : (
          /* ================================= */
          /* EMPTY FILTER STATE */
          /* ================================= */

          <section
            className="
              mt-8
              flex
              min-h-80
              items-center
              justify-center
              rounded-3xl
              border
              border-dashed
              border-white/10
              bg-white/[0.015]
            "
          >
            <div className="px-6 text-center">
              <div
                className="
                  mx-auto
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.04]
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-slate-500"
                >
                  <circle cx="11" cy="11" r="8" />

                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-black">No players found</h3>

              <p className="mt-2 text-sm text-slate-500">
                Try another player name or position.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPositionFilter("ALL");
                }}
                className="
                  mt-5
                  text-sm
                  font-bold
                  text-emerald-400
                  transition
                  hover:text-emerald-300
                "
              >
                Clear filters
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
