import type { CharacterState } from './characterState';
import type { PartyState } from './partyState';
import type { WorldState } from './worldState';

export interface SaveGame {
  version: number;

  characters: Record<string, CharacterState>;
  party: PartyState;
  world: WorldState;
}
