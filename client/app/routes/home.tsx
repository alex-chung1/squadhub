import type { Route } from './+types/home';
import PlayerCard from '~/components/PlayerCard';
import type { Player } from '~/types/player';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'SquadHub' }, { name: 'description', content: 'SquadHub player database' }];
}

export async function loader() {
  const response = await fetch('http://localhost:3000/players');

  if (!response.ok) {
    throw new Error('Failed to fetch players');
  }

  const result = (await response.json()) as Player[];

  return result;
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const players = loaderData;

  return (
    <main className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Players</h1>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </main>
  );
}
