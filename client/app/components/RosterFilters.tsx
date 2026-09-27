export type PositionFilter = "ALL" | "ATT" | "MID" | "DEF";

type RosterFiltersProps = {
  search: string;
  positionFilter: PositionFilter;
  onSearchChange: (search: string) => void;
  onPositionChange: (position: PositionFilter) => void;
};

const positionFilters: {
  label: string;
  value: PositionFilter;
}[] = [
  { label: "All", value: "ALL" },
  { label: "Attackers", value: "ATT" },
  { label: "Midfielders", value: "MID" },
  { label: "Defenders", value: "DEF" },
];

export default function RosterFilters({
  search,
  positionFilter,
  onSearchChange,
  onPositionChange,
}: RosterFiltersProps) {
  return (
    <section>
      <div
        className="
          flex flex-col gap-4
          border-y border-white/[0.08] py-5
          xl:flex-row
          xl:items-center
          xl:justify-between
        "
      >
        <div className="flex flex-wrap gap-2">
          {positionFilters.map((filter) => {
            const active = positionFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => onPositionChange(filter.value)}
                className={`
                  rounded-xl px-4 py-2.5
                  text-xs font-black
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
              absolute left-4 top-1/2
              h-4 w-4
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
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search squad..."
            className="
              h-11 w-full rounded-xl
              border border-white/[0.08]
              bg-white/[0.03]
              pl-11 pr-4
              text-sm text-white
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
  );
}
