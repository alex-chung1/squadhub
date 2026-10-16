import PlayerCard from "~/components/PlayerCard";
import type { Player } from "~/types/player";

type FeaturedPlayerCardProps = {
  player: Player;
};

export default function FeaturedPlayerCard({
  player,
}: FeaturedPlayerCardProps) {
  const scale = 0.72;

  return (
    <div
      className="relative mx-auto shrink-0"
      style={{
        width: 208 * scale,
        height: 288 * scale,
      }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: 208,
          height: 288,
          transform: `scale(${scale})`,
        }}
      >
        <PlayerCard player={player} />
      </div>
    </div>
  );
}
