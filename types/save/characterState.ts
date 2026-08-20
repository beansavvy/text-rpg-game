export interface CharacterState {
  id: string;
  name: string;

  raceId: string;
  classId: string;

  level: number;
  currentExperience: number;

  stats: CharacterStats;

  currentHealth: number;
  currentStamina: number;
  currentMana: number;

  equipment: CharacterEquipment;

  skills: string[];
}

export interface CharacterStats {
  strength: number;
  dexterity: number;
  vitality: number;
  endurance: number;
  intellect: number;
  luck: number;
}

export interface CharacterEquipment {
  mainHand: string | null;
  offHand: string | null;

  head: string | null;
  shoulders: string | null;
  chest: string | null;
  wrists: string | null;
  hands: string | null;
  waist: string | null;
  legs: string | null;
  feet: string | null;

  neck: string | null;
  back: string | null;

  fingerLeft: string | null;
  fingerRight: string | null;

  ammo: string | null;
}

export interface ResourceState {
  current: number;
  max: number;
}
