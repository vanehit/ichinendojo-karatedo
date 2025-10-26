export type BeltLevel = 
  | "WHITE"
  | "LIGHTBLUE"
  | "YELLOW"
  | "ORANGE"
  | "GREEN"
  | "BLUE"
  | "BROWN"
  | "BLACK";

export const BELT_LEVELS: BeltLevel[] = [
  "WHITE",
  "LIGHTBLUE",
  "YELLOW",
  "ORANGE",
  "GREEN",
  "BLUE",
  "BROWN",
  "BLACK"
];

export function isValidBeltLevel(belt: string): belt is BeltLevel {
  return BELT_LEVELS.includes(belt as BeltLevel);
}
