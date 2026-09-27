type LineUpProps = {
  playerCount: number;
};

export default function LineUp({ playerCount }: LineUpProps) {
  return (
    <section>
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <div
              className="
                  h-2 w-2 rounded-full bg-emerald-400
                  shadow-[0_0_10px_rgba(52,211,153,0.8)]
                "
            />
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span className="font-black text-white">{playerCount}</span>

          <span>{playerCount === 1 ? "player" : "players"} in squad</span>
        </div>
      </div>
    </section>
  );
}
