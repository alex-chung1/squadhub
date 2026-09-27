import type { Player } from '~/types/player';

type PlayerSelectionProps = {
  players: Player[];
  selectedPlayers: number[];
  onSelectionChange: (ids: number[]) => void;
};

export default function PlayerSelection({
  players,
  selectedPlayers,
  onSelectionChange,
}: PlayerSelectionProps) {
  function togglePlayer(playerId: number) {
    if (selectedPlayers.includes(playerId)) {
      onSelectionChange(selectedPlayers.filter((id) => id !== playerId));
      return;
    }

    onSelectionChange([...selectedPlayers, playerId]);
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {players.map((player) => {
        const selected = selectedPlayers.includes(player.id);

        return (
          <button
            key={player.id}
            type="button"
            onClick={() => togglePlayer(player.id)}
            className={`rounded-xl p-4 text-left ${
              selected
                ? 'bg-blue-100 ring-2 ring-blue-500 dark:bg-blue-950'
                : 'bg-gray-100 dark:bg-gray-900'
            }`}
          >
            <div className="flex h-24 items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-800">
              <span className="text-3xl font-bold">{player.rating}</span>
            </div>

            <div className="mt-2 text-center">
              <h2 className="font-bold">{player.name}</h2>
            </div>
          </button>
        );
      })}
    </div>
  );
}
