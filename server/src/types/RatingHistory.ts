export interface RatingHistory {
  id: number;

  playerId: number;
  matchId?: number;

  ratingBefore: number;
  ratingChange: number;
  ratingAfter: number;

  changedBy: string;
  changedAt: Date;
}
