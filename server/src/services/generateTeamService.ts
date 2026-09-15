import { Player } from "../domain/Player";
import prisma from "../db/prisma";

export async function getSortedPlayers(playerIds: number[]): Promise<Player[]> {
  const players = await prisma.player.findMany({
    where: {
      id: {
        in: playerIds,
      },
    },
  });

  players.sort((playerA, playerB) => playerB.rating - playerA.rating);

  return players;
}
