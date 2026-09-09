export type MatchTeam = "A" | "B";

export type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface PlayerMatchStat {
  id: number;

  playerId: number;
  matchId: number;
  team: MatchTeam;

  // Stats submitted by player
  goals: number;
  assists: number;

  // Calculated by SquadHub
  performanceScore: number;
  ratingBefore: number;
  suggestedRatingChange: number;

  // Admin approval
  approvedRatingChange?: number;
  ratingAfter?: number;
  approvalStatus: ApprovalStatus;

  approvedBy?: string;
  approvedAt?: Date;

  createdAt: Date;
}
