import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'SquadHub' }, { name: 'description', content: 'Welcome to SquadHub!' }];
}

export default function Home() {
  return <h1>SquadHub</h1>;
}
