import type { Player } from "../types/Player.js";

export interface GeneratedTeams {
  teamA: Player[];
  teamB: Player[];
}

function getSkillTotal(team: Player[]): number {
  return team.reduce((total, player) => total + player.skillLevel, 0);
}

function shufflePlayers(players: Player[]): Player[] {
  return [...players].sort(() => Math.random() - 0.5);
}

export function generateBalancedTeams(players: Player[]): GeneratedTeams {
  if (players.length < 2) {
    throw new Error("At least 2 players are required.");
  }

  if (players.length % 2 !== 0) {
    throw new Error("An even number of players is required.");
  }

  const shuffledPlayers = shufflePlayers(players);

  const sortedPlayers = shuffledPlayers.sort(
    (a, b) => b.skillLevel - a.skillLevel
  );

  const teamA: Player[] = [];
  const teamB: Player[] = [];

  for (const player of sortedPlayers) {
    if (teamA.length === teamB.length) {
      const teamASkill = getSkillTotal(teamA);
      const teamBSkill = getSkillTotal(teamB);

      if (teamASkill <= teamBSkill) {
        teamA.push(player);
      } else {
        teamB.push(player);
      }
    } else if (teamA.length < teamB.length) {
      teamA.push(player);
    } else {
      teamB.push(player);
    }
  }

  return {
    teamA,
    teamB,
  };
}
