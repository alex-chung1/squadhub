type EmptyRosterProps = {
  onClear: () => void;
};

export default function EmptyRoster({ onClear }: EmptyRosterProps) {
  return (
    <section
      className="
          mt-8 flex min-h-80
          items-center justify-center
          rounded-3xl
          border border-dashed border-white/10
          bg-white/[0.015]
        "
    >
      <div className="px-6 text-center">
        <div
          className="
              mx-auto flex h-14 w-14
              items-center justify-center
              rounded-2xl
              border border-white/[0.08]
              bg-white/[0.04]
            "
        >
          <span className="text-2xl">⌕</span>
        </div>

        <h3 className="mt-5 text-lg font-black">No players found</h3>

        <p className="mt-2 text-sm text-slate-500">
          Try another player name or position.
        </p>

        <button
          type="button"
          onClick={onClear}
          className="
              mt-5 text-sm font-bold
              text-emerald-400
              transition
              hover:text-emerald-300
            "
        >
          Clear filters
        </button>
      </div>
    </section>
  );
}
