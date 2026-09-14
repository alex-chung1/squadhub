export interface RatingHistory {
  id: number;
  playerId: number;
  matchId: number;
  previousRating: number;
  newRating: number;
  createdAt: Date;
}
