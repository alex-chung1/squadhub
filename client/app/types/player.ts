export type Position = "ATT" | "MID" | "DEF";

export type Player = {
  id: number;
  name: string;
  rating: number;
  position: Position;
};
