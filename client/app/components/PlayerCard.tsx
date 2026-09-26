import type { Player } from "~/types/player";

type PlayerCardProps = {
  player: Player;
};

type CardStyle = {
  tier: string;
  background: string;
  border: string;
  text: string;
  subText: string;
  avatar: string;
  glow: string;
  accent: string;
};

function getCardStyle(rating: number): CardStyle {
  // TOTS — 90+
  if (rating >= 90) {
    return {
      tier: "TOTS",
      background:
        "linear-gradient(145deg, #020617 0%, #082f49 25%, #0369a1 48%, #1d4ed8 70%, #020617 100%)",
      border: "#67e8f9",
      text: "#ffffff",
      subText: "#a5f3fc",
      avatar: "rgba(2, 6, 23, 0.55)",
      glow: "rgba(34, 211, 238, 0.45)",
      accent: "rgba(103, 232, 249, 0.55)",
    };
  }

  // GOLD — 75–89
  if (rating >= 75) {
    return {
      tier: "GOLD",
      background:
        "linear-gradient(145deg, #17130a 0%, #6f5318 22%, #d6b65b 46%, #f8e9a1 58%, #a77b1f 78%, #241b08 100%)",
      border: "#f6df85",
      text: "#fff8dc",
      subText: "#f7dfa0",
      avatar: "rgba(30, 23, 8, 0.70)",
      glow: "rgba(234, 179, 8, 0.35)",
      accent: "rgba(255, 239, 170, 0.55)",
    };
  }

  // SILVER — 65–74
  if (rating >= 65) {
    return {
      tier: "SILVER",
      background:
        "linear-gradient(145deg, #1f2937 0%, #64748b 24%, #d8dee5 45%, #ffffff 56%, #9ca3af 75%, #374151 100%)",
      border: "#f1f5f9",
      text: "#ffffff",
      subText: "#f1f5f9",
      avatar: "rgba(15, 23, 42, 0.75)",
      glow: "rgba(203, 213, 225, 0.40)",
      accent: "rgba(255, 255, 255, 0.65)",
    };
  }

  // BRONZE — 0–64
  return {
    tier: "BRONZE",
    background:
      "linear-gradient(145deg, #261007 0%, #663018 22%, #b8663c 45%, #e0a078 57%, #844123 77%, #2c1208 100%)",
    border: "#e8a57c",
    text: "#fff1e8",
    subText: "#f5c4a5",
    avatar: "rgba(38, 16, 7, 0.70)",
    glow: "rgba(194, 92, 45, 0.35)",
    accent: "rgba(255, 190, 145, 0.55)",
  };
}

export default function PlayerCard({ player }: PlayerCardProps) {
  const card = getCardStyle(player.rating);

  return (
    <div
      className="
        group
        relative
        h-72
        w-52
        overflow-hidden
        rounded-[28px]
        transition-all
        duration-300
        hover:-translate-y-2
        hover:scale-[1.03]
      "
      style={{
        background: card.background,
        border: `2px solid ${card.border}`,
        boxShadow: `
          0 15px 35px rgba(0,0,0,0.35),
          0 0 25px ${card.glow},
          inset 0 0 25px rgba(255,255,255,0.10)
        `,
      }}
    >
      {/* INNER BORDER */}
      <div
        className="
          pointer-events-none
          absolute
          inset-[5px]
          z-[2]
          rounded-[23px]
        "
        style={{
          border: `1px solid ${card.accent}`,
        }}
      />

      {/* ================================= */}
      {/* CRYSTAL FACETS */}
      {/* ================================= */}

      {/* Top-left crystal */}
      <div
        className="
          pointer-events-none
          absolute
          -left-6
          -top-5
          h-32
          w-32
        "
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.28), rgba(255,255,255,0.03))",
          clipPath: "polygon(0 0, 100% 0, 68% 55%, 20% 100%)",
        }}
      />

      {/* Top-right crystal */}
      <div
        className="
          pointer-events-none
          absolute
          -right-8
          top-3
          h-44
          w-40
        "
        style={{
          background: `linear-gradient(
            145deg,
            ${card.accent},
            rgba(255,255,255,0.03)
          )`,
          clipPath: "polygon(42% 0, 100% 10%, 100% 88%, 20% 58%)",
          opacity: 0.55,
        }}
      />

      {/* Center crystal */}
      <div
        className="
          pointer-events-none
          absolute
          left-[38%]
          top-[24%]
          h-44
          w-32
        "
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.20), rgba(255,255,255,0.01))",
          clipPath: "polygon(50% 0, 100% 38%, 72% 100%, 10% 72%, 0 22%)",
        }}
      />

      {/* Center-left darker facet */}
      <div
        className="
          pointer-events-none
          absolute
          -left-5
          top-[35%]
          h-40
          w-36
        "
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.18), rgba(255,255,255,0.06))",
          clipPath: "polygon(0 18%, 70% 0, 100% 62%, 40% 100%, 0 75%)",
        }}
      />

      {/* Bottom-right crystal */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-5
          -right-5
          h-40
          w-44
        "
        style={{
          background: `linear-gradient(
            140deg,
            rgba(255,255,255,0.05),
            ${card.accent}
          )`,
          clipPath: "polygon(38% 0, 100% 25%, 100% 100%, 0 100%, 12% 42%)",
          opacity: 0.45,
        }}
      />

      {/* Bottom-left crystal */}
      <div
        className="
          pointer-events-none
          absolute
          -bottom-10
          -left-10
          h-40
          w-44
        "
        style={{
          background:
            "linear-gradient(35deg, rgba(0,0,0,0.22), rgba(255,255,255,0.13))",
          clipPath: "polygon(0 0, 72% 22%, 100% 100%, 0 100%)",
        }}
      />

      {/* ================================= */}
      {/* CRYSTAL EDGE LINES */}
      {/* ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-[15%]
          top-[34%]
          h-px
          w-[85%]
          -rotate-[25deg]
          origin-left
        "
        style={{
          background: `linear-gradient(
            to right,
            transparent,
            ${card.accent},
            transparent
          )`,
          opacity: 0.55,
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          left-[45%]
          top-[8%]
          h-[85%]
          w-px
          rotate-[28deg]
          origin-top
        "
        style={{
          background: `linear-gradient(
            to bottom,
            transparent,
            ${card.accent},
            transparent
          )`,
          opacity: 0.35,
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          -left-[10%]
          top-[68%]
          h-px
          w-[120%]
          rotate-[17deg]
        "
        style={{
          background: `linear-gradient(
            to right,
            transparent,
            ${card.accent},
            transparent
          )`,
          opacity: 0.35,
        }}
      />

      {/* ================================= */}
      {/* CRYSTAL LIGHT SPOTS */}
      {/* ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          right-4
          top-10
          h-16
          w-16
          rounded-full
          blur-2xl
        "
        style={{
          background: card.accent,
          opacity: 0.5,
        }}
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-8
          left-5
          h-20
          w-20
          rounded-full
          blur-3xl
        "
        style={{
          background: card.accent,
          opacity: 0.25,
        }}
      />

      {/* ================================= */}
      {/* ANIMATED LIGHT REFRACTION */}
      {/* ================================= */}

      <div
        className="
          pointer-events-none
          absolute
          -left-[100%]
          top-0
          z-30
          h-full
          w-[35%]
          skew-x-[-18deg]
          bg-gradient-to-r
          from-transparent
          via-white/50
          to-transparent
          transition-all
          duration-700
          group-hover:left-[140%]
        "
      />

      {/* ================================= */}
      {/* RATING + POSITION */}
      {/* ================================= */}

      <div className="absolute left-5 top-5 z-20">
        <div
          className="text-4xl font-black leading-none"
          style={{
            color: card.text,
            textShadow: "0 2px 8px rgba(0,0,0,0.25)",
          }}
        >
          {player.rating}
        </div>

        <div
          className="
            mt-1
            text-xs
            font-black
            uppercase
            tracking-[0.18em]
          "
          style={{
            color: card.subText,
          }}
        >
          {player.position}
        </div>
      </div>

      {/* ================================= */}
      {/* PLAYER AVATAR */}
      {/* ================================= */}

      <div
        className="
          relative
          z-20
          flex
          h-48
          items-end
          justify-center
        "
      >
        <div
          className="
            flex
            h-28
            w-28
            items-center
            justify-center
            rounded-full
            backdrop-blur-sm
          "
          style={{
            background: card.avatar,
            border: `1px solid ${card.accent}`,
            boxShadow: `
              inset 0 0 20px rgba(255,255,255,0.08),
              0 8px 20px rgba(0,0,0,0.20)
            `,
          }}
        >
          <span
            className="text-5xl font-black"
            style={{
              color: card.text,
              opacity: 0.75,
            }}
          >
            {player.name.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>

      {/* ================================= */}
      {/* DIVIDER */}
      {/* ================================= */}

      <div
        className="
          relative
          z-20
          mx-auto
          mt-3
          h-px
          w-32
        "
        style={{
          background: `linear-gradient(
            to right,
            transparent,
            ${card.accent},
            transparent
          )`,
        }}
      />

      {/* ================================= */}
      {/* PLAYER INFO */}
      {/* ================================= */}

      <div
        className="
          relative
          z-20
          px-4
          pt-3
          text-center
        "
      >
        <h2
          className="
            truncate
            text-xl
            font-black
            uppercase
            tracking-wide
          "
          style={{
            color: card.text,
            textShadow: "0 2px 6px rgba(0,0,0,0.20)",
          }}
        >
          {player.name}
        </h2>

        <p
          className="
            mt-1
            text-[10px]
            font-black
            uppercase
            tracking-[0.28em]
          "
          style={{
            color: card.subText,
          }}
        >
          {/* {card.tier} */}
        </p>
      </div>
    </div>
  );
}
