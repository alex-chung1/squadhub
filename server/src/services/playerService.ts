import { prisma } from '../db/prisma';

export async function createPlayer(name: string, rating: number) {
  return prisma.player.create({
    data: {
      name,
      rating,
    },
  });
}

export async function getPlayers() {
  return prisma.player.findMany({
    orderBy: {
      name: 'asc',
    },
  });
}
