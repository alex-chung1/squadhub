import type { Route } from './+types/generate';
import TeamGenerator from '~/components/TeamGenerator';
import type { Player } from '~/types/player';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Generate Teams | SquadHub' },
    {
      name: 'description',
      content: 'Generate balanced teams',
    },
  ];
}

export async function loader() {
  const response = await fetch('http://localhost:3000/players');

  if (!response.ok) {
    throw new Error('Failed to fetch players');
  }

  return (await response.json()) as Player[];
}

export default function Generate({ loaderData }: Route.ComponentProps) {
  return (
    <main className="p-8">
      <TeamGenerator players={loaderData} />
    </main>
  );
}
