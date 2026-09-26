export type Position = "ATT" | "MID" | "DEF";

export interface Player {
  id: number;
  name: string;
  rating: number;
  position: Position;
}
