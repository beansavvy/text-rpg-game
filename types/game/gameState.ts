import type { CharacterStats, CharacterEquipment, ResourceState } from '@/types/save/characterState';

export type CombatStatus = 0 | 1 | 2;

export interface RuntimeInventoryItem {
  itemId: number;
  quantity: number;
  equipped: boolean;
  characterEquippedId: string | null;
}

export interface GameCharacterState {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  experience: ResourceState;
  stats: CharacterStats;
  health: ResourceState;
  stamina: ResourceState;
  mana: ResourceState;
  equipment: CharacterEquipment;
  skills: string[];
  position: number;
}

export interface GamePartyState {
  memberIds: string[];
  gold: number;
  inventory: RuntimeInventoryItem[];
  formation: Record<string, number>;
}

export interface GameWorldState {
  currentLocationId: string;
  discoveredLocationIds: string[];
}

export interface GameCombatState {
  status: CombatStatus;
  enemy: any | null;
}

export interface GameInteractionState {
  activeNpcId: number | null;
}

export interface GameState {
  characters: Record<string, GameCharacterState>;
  party: GamePartyState;
  world: GameWorldState;
  combat: GameCombatState;
  interaction: GameInteractionState;
}
