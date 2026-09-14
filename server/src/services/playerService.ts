import prisma from '../db/prisma';

export async function createPlayer(name: string) {
  return prisma.player.create({
    data: {
      name,
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
