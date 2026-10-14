import { Link, Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <main className="auth-layout">
      {/* Background overlays */}
      <div className="auth-background-overlay" aria-hidden="true" />
      <div className="auth-background-gradient" aria-hidden="true" />

      {/* Authentication container */}
      <div className="auth-container">
        {/* Branding */}
        <Link to="/" className="auth-brand" aria-label="SquadHub Home">
          <img src="/images/squadhub-logo.png" alt="" className="auth-logo" />

          <h1 className="auth-brand-title">
            Squad<span>Hub</span>
          </h1>
        </Link>

        {/* Authentication form */}
        <section className="auth-card">
          <Outlet />
        </section>

        {/* Footer */}
        <p className="auth-footer">BUILT FOR THE BEAUTIFUL GAME</p>
      </div>
    </main>
  );
}
