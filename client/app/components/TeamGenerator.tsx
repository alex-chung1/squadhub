import { useState } from 'react';
import PlayerSelection from './PlayerSelection';
import type { Player } from '~/types/player';
import type { Team } from '~/types/team';

type TeamGeneratorProps = {
  players: Player[];
};

export default function TeamGenerator({ players }: TeamGeneratorProps) {
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  async function generateTeams() {
    const response = await fetch('http://localhost:3000/teams/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerIds: selectedPlayers,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate teams');
    }

    const data = (await response.json()) as Team[];

    setTeams(data);
  }

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold">Generate Teams</h1>

      <p className="mb-6 text-gray-600 dark:text-gray-400">Select the players for this game.</p>

      <PlayerSelection
        players={players}
        selectedPlayers={selectedPlayers}
        onSelectionChange={setSelectedPlayers}
      />

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm">
          Selected: <span className="font-bold">{selectedPlayers.length}</span>
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              setSelectedPlayers([]);
              setTeams([]);
            }}
            className="rounded-lg border border-gray-300 px-5 py-3 font-semibold dark:border-gray-700"
          >
            Reset
          </button>

          <button
            type="button"
            onClick={generateTeams}
            disabled={selectedPlayers.length === 0}
            className="rounded-lg bg-black px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black"
          >
            Generate Teams
          </button>
        </div>
      </div>

      {teams.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-6 text-2xl font-bold">Teams</h2>

          <div className="grid gap-6 md:grid-cols-2">
            {teams.map((team) => (
              <div key={team.id} className="rounded-xl bg-gray-100 p-6 dark:bg-gray-900">
                <div className="mb-4">
                  <h3 className="text-xl font-bold">Team {team.id === 1 ? 'A' : 'B'}</h3>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Rating: {team.totalRating} · Average: {team.averageRating}
                  </p>
                </div>

                <div className="space-y-2">
                  {team.players.map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between rounded-lg bg-white p-3 dark:bg-gray-800"
                    >
                      <span className="font-medium">{player.name}</span>

                      <span className="font-bold">{player.rating}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
