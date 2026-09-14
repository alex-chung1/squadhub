import { GeneratedTeam } from './GeneratedTeam';
export interface Match {
  id: number;
  teamA: GeneratedTeam;
  teamB: GeneratedTeam;
  winnerTeamId: number;
  playedAt: Date;
}
