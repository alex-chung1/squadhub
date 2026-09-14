export type PositionCategory = "DEF" | "MID" | "ATT";

export type PlayerPosition =
  | "GK"
  | "RB"
  | "CB"
  | "LB"
  | "CDM"
  | "CM"
  | "CAM"
  | "RW"
  | "LW"
  | "ST";

export type SkillLevel = 1 | 2 | 3;

export const POSITION_CATEGORIES = {
  DEF: ["GK", "RB", "CB", "LB"],
  MID: ["CDM", "CM", "CAM"],
  ATT: ["RW", "LW", "ST"],
} as const;

export interface Player {
  id: number;

  name: string;
  playerNumber: number;
  position: PlayerPosition;

  // Admin-only rating used to generate balanced teams
  skillLevel: SkillLevel;

  // FIFA-style public rating that changes over time
  overallRating: number;

  imageUrl?: string;

  createdAt: Date;
  updatedAt: Date;
}
