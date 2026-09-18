import type { Player } from '~/types/player';

type PlayerCardProps = {
  player: Player;
};

export default function PlayerCard({ player }: PlayerCardProps) {
  return (
    <div className="w-48 rounded-xl bg-gray-100 p-4 dark:bg-gray-900">
      <div className="relative">
        <div className="flex h-48 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800">
          <span className="text-4xl font-bold">{player.rating}</span>
        </div>
      </div>

      <div className="mt-2 text-center">
        <h2 className="font-bold">{player.name}</h2>
      </div>
    </div>
  );
}
