export type TeamPlayer = {
  id: number;
  name: string;
  rating: number;
};

export type Team = {
  id: number;
  totalRating: number;
  averageRating: number;
  players: TeamPlayer[];
};
