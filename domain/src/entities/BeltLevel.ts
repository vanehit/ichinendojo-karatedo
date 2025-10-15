export type BeltLevel = 
  | "WHITE"
  | "YELLOW"
  | "ORANGE"
  | "GREEN"
  | "BLUE"
  | "BROWN"
  | "BLACK";

//niveles para el uso de las validaciones en "student" y "promotion"
export const BELT_LEVELS: BeltLevel[] = [
  "WHITE",
  "YELLOW",
  "ORANGE",
  "GREEN",
  "BLUE",
  "BROWN",
  "BLACK"
];

// Función helper opcional para validar
export function isValidBeltLevel(belt: string): belt is BeltLevel {
  return BELT_LEVELS.includes(belt as BeltLevel);
}
