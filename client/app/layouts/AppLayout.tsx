import { Outlet } from "react-router";
import SquadHeader from "~/layouts/SquadHeader";
// import SquadHeader from "../layouts/SquadHeader";
export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#090F19] text-white">
      <SquadHeader />

      <main className="min-h-[calc(100vh-80px)]">
        <Outlet />
      </main>
    </div>
  );
}
