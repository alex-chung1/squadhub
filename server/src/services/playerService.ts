import { prisma } from "../db/prisma";

// Create
export async function createPlayer(name: string, rating: number) {
  return prisma.player.create({
    data: {
      name,
      rating,
    },
  });
}

// Get All Players
export async function getPlayers() {
  return prisma.player.findMany({
    orderBy: {
      name: "asc",
    },
  });
}

// Get One Player by ID
export async function getPlayerById(id: number) {
  return prisma.player.findUnique({
    where: {
      id,
    },
  });
}

// Update Player
export async function updatePlayer(
  id: number,
  data: {
    name?: string;
    rating?: number;
  },
) {
  return prisma.player.update({
    where: {
      id,
    },
    data,
  });
}

// Delete Player
export async function deletePlayer(id: number) {
  return prisma.player.delete({
    where: {
      id,
    },
  });
}
