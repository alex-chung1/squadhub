import { CalendarDays, Clock3, MapPin } from "lucide-react";

export type UpcomingGame = {
  id: number;
  title: string;
  time: string;
  location: string;
};

type UpcomingGamesCardProps = {
  games: UpcomingGame[];
  isDemo?: boolean;
};

export default function UpcomingGamesCard({
  games,
  isDemo = false,
}: UpcomingGamesCardProps) {
  const visibleGames = games.slice(0, 5);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#141D29] p-5 sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <CalendarDays size={22} className="text-violet-300" />

        <h2 className="text-lg font-bold text-white">Upcoming Games</h2>

        {isDemo && (
          <span className="ml-auto text-[10px] text-slate-400">Sample</span>
        )}
      </div>

      {visibleGames.length > 0 ? (
        <div className="divide-y divide-white/[0.08]">
          {visibleGames.map((game) => (
            <div
              key={game.id}
              className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="text-sm font-semibold text-white">{game.title}</p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock3 size={14} />
                  {game.time}
                </span>

                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {game.location}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-slate-400">
          No upcoming games.
        </p>
      )}

      {isDemo && (
        <p className="mt-3 text-[11px] text-slate-500">
          Sample schedule. Backend scheduling is not connected yet.
        </p>
      )}
    </section>
  );
}
