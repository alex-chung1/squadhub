export default function DashboardHeader() {
  return (
    <header className="mb-7">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em] text-sky-300">
        Dashboard
      </p>

      <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
        Welcome back, Coach
      </h1>

      <p className="mt-2 text-sm text-slate-400">
        Here's what's happening with your squad.
      </p>
    </header>
  );
}
