import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

export default function SquadHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const isGeneratePage = location.pathname === "/generate";

  // Close menu when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // Close menu when navigating to another page
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="relative z-50 border-b border-border-subtle bg-app">
      <div
        className="
          relative mx-auto flex min-h-[80px] max-w-[1600px]
          items-center justify-between
          px-4 py-3 sm:px-6 lg:px-10
        "
      >
        {/* LEFT - HAMBURGER MENU */}
        <div ref={menuRef} className="relative z-20">
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="squad-header-menu"
            className="
              flex h-11 w-11 items-center justify-center
              rounded-xl border border-border-subtle
              bg-surface text-silver
              transition-all duration-200
              hover:border-silver-dark
              hover:bg-surface-raised
              hover:text-white
              focus-visible:outline-2
              focus-visible:outline-offset-2
              focus-visible:outline-silver
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>

          {/* DROPDOWN MENU */}
          {menuOpen && (
            <nav
              id="squad-header-menu"
              aria-label="Account navigation"
              className="
                absolute left-0 top-14
                w-60 overflow-hidden rounded-2xl
                border border-border-subtle
                bg-surface p-2
                shadow-[0_20px_60px_rgba(0,0,0,0.55)]
              "
            >
              <p
                className="
                  px-3 pb-2 pt-2
                  text-[10px] font-bold uppercase
                  tracking-[0.2em] text-text-muted
                "
              >
                Navigation
              </p>

              {/* ACCOUNT */}
              <Link
                to="/account"
                onClick={() => setMenuOpen(false)}
                className="
                  flex items-center gap-3 rounded-xl
                  px-3 py-3 text-sm font-semibold
                  text-silver
                  transition-colors duration-200
                  hover:bg-surface-raised
                  hover:text-white
                "
              >
                <span
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg border border-border-subtle
                    bg-surface-raised
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21a8 8 0 0 1 16 0" />
                  </svg>
                </span>
                Account
              </Link>

              {/* REQUESTS */}
              <Link
                to="/requests"
                onClick={() => setMenuOpen(false)}
                className="
                  flex items-center gap-3 rounded-xl
                  px-3 py-3 text-sm font-semibold
                  text-silver
                  transition-colors duration-200
                  hover:bg-surface-raised
                  hover:text-white
                "
              >
                <span
                  className="
                    flex h-9 w-9 items-center justify-center
                    rounded-lg border border-border-subtle
                    bg-surface-raised
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                    <path d="m9 16 2 2 4-4" />
                  </svg>
                </span>
                Requests
              </Link>
            </nav>
          )}
        </div>

        {/* CENTER - SQUADHUB BRANDING */}
        <Link
          to="/"
          aria-label="SquadHub Home"
          className="
            group absolute left-1/2 top-1/2
            flex -translate-x-1/2 -translate-y-1/2
            items-center gap-2.5 sm:gap-3
            transition-opacity duration-200
            hover:opacity-90
          "
        >
          {/* ACTUAL SQUADHUB LOGO */}
          <img
            src="/images/squadhub-logo.png"
            alt=""
            className="
              h-12 w-12 shrink-0
              rounded-xl object-contain
              shadow-[0_4px_18px_rgba(196,207,222,0.12)]
              transition-transform duration-300
              group-hover:scale-105
              sm:h-14 sm:w-14
            "
          />

          {/* BRAND WORDMARK */}
          <div className="hidden flex-col sm:flex">
            <span
              className="
                whitespace-nowrap font-brand
                text-xl font-bold tracking-tight
                text-text-primary
                lg:text-2xl
              "
            >
              Squad<span className="text-silver">Hub</span>
            </span>
          </div>
        </Link>

        {/* RIGHT - PAGE NAVIGATION */}
        <Link
          to={isGeneratePage ? "/" : "/generate"}
          className="
            group relative z-20 ml-auto
            flex h-11 items-center justify-center
            gap-2.5 overflow-hidden rounded-xl
            border border-[#B8C4D4]/60
            bg-gradient-to-br
            from-[#E8EDF5] via-[#C4CFDE] to-[#8998AD]
            px-3 text-sm font-black text-[#111827]
            shadow-[0_4px_20px_rgba(196,207,222,0.10)]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:from-white
            hover:via-[#DDE5EF]
            hover:to-[#AAB8CC]
            hover:shadow-[0_6px_26px_rgba(196,207,222,0.22)]
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-white
            sm:px-5
          "
        >
          {/* METALLIC LIGHT SWEEP */}
          <span
            className="
              pointer-events-none
              absolute -left-full top-0
              h-full w-1/2
              skew-x-[-20deg]
              bg-gradient-to-r
              from-transparent via-white/50 to-transparent
              transition-all duration-700
              group-hover:left-[140%]
            "
          />

          {isGeneratePage ? (
            <>
              {/* BACK ICON */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="
                  relative z-10 h-4 w-4
                  transition-transform duration-300
                  group-hover:-translate-x-0.5
                "
                aria-hidden="true"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>

              <span className="relative z-10 hidden sm:inline">
                Back to Roster
              </span>

              <span className="relative z-10 sm:hidden">Back</span>
            </>
          ) : (
            <>
              {/* SHUFFLE ICON */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="
                  relative z-10 h-4 w-4
                  transition-transform duration-300
                  group-hover:rotate-12
                "
                aria-hidden="true"
              >
                <path d="m18 14 4 4-4 4" />
                <path d="m18 2 4 4-4 4" />
                <path d="M2 18h1.5a6 6 0 0 0 5-2.7L15.5 4.7A6 6 0 0 1 20.5 2H22" />
                <path d="M2 6h1.5a6 6 0 0 1 5 2.7l1.2 1.8" />
                <path d="M14.5 15.3l1 1.5a6 6 0 0 0 5 2.7H22" />
              </svg>

              <span className="relative z-10 hidden sm:inline">
                Generate Teams
              </span>

              <span className="relative z-10 sm:hidden">Generate</span>
            </>
          )}
        </Link>
      </div>
    </header>
  );
}
