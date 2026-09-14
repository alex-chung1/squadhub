import test from "node:test";
import assert from "node:assert/strict";

import { generateBalancedTeams } from "./teamGenerator.js";
import type { Player } from "../types/Player.js";

function createPlayer(id: number, name: string, skillLevel: 1 | 2 | 3): Player {
  return {
    id,
    name,
    playerNumber: id,
    position: "CM",
    skillLevel,
    overallRating: 75,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

const players: Player[] = [
  createPlayer(1, "Jarif", 3),
  createPlayer(2, "Monu", 3),
  createPlayer(3, "Munem", 3),
  createPlayer(4, "Tahsin", 3),

  createPlayer(5, "Rafael", 2),
  createPlayer(6, "Mirbz", 2),

  createPlayer(7, "Adoo", 1),
  createPlayer(8, "Effie", 1),
];

test("creates two teams with the same number of players", () => {
  const result = generateBalancedTeams(players);

  assert.equal(result.teamA.length, 4);
  assert.equal(result.teamB.length, 4);
});

test("does not lose or duplicate players", () => {
  const result = generateBalancedTeams(players);

  const allGeneratedPlayers = [...result.teamA, ...result.teamB];

  assert.equal(allGeneratedPlayers.length, players.length);

  const generatedIds = allGeneratedPlayers.map((player) => player.id).sort();

  const originalIds = players.map((player) => player.id).sort();

  assert.deepEqual(generatedIds, originalIds);
});

test("keeps skill totals reasonably balanced", () => {
  const result = generateBalancedTeams(players);

  const teamASkill = result.teamA.reduce(
    (total, player) => total + player.skillLevel,
    0
  );

  const teamBSkill = result.teamB.reduce(
    (total, player) => total + player.skillLevel,
    0
  );

  const difference = Math.abs(teamASkill - teamBSkill);

  assert.ok(difference <= 1);
});

test("rejects an odd number of players", () => {
  const oddPlayers = players.slice(0, 7);

  assert.throws(
    () => generateBalancedTeams(oddPlayers),
    /even number of players/
  );
});

test("requires at least two players", () => {
  assert.throws(() => generateBalancedTeams([]), /At least 2 players/);
});
