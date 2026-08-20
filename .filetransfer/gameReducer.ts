import type { CharacterEquipment } from '@/types/save/characterState';
import type { CombatStatus, GameCharacterState, GameState } from '@/types/game/gameState';

export const createEmptyEquipment = (): CharacterEquipment => ({
  mainHand: null, offHand: null, head: null, shoulders: null, chest: null,
  wrists: null, hands: null, waist: null, legs: null, feet: null,
  neck: null, back: null, fingerLeft: null, fingerRight: null, ammo: null,
});

export const createInitialGameState = (): GameState => ({
  characters: {},
  party: { memberIds: [], gold: 100, inventory: [], formation: {} },
  world: { currentLocationId: 'l-0003', discoveredLocationIds: ['l-0001'] },
  combat: { status: 0, enemy: null },
  interaction: { activeNpcId: null },
});

export type GameAction =
  | { type: 'CREATE_CHARACTER'; character: GameCharacterState; addToParty?: boolean }
  | { type: 'UPDATE_CHARACTER'; characterId: string; changes: Partial<GameCharacterState> }
  | { type: 'SET_CHARACTER_RESOURCE'; characterId: string; resource: 'health' | 'stamina' | 'mana' | 'experience'; current: number }
  | { type: 'ADD_PARTY_MEMBER'; characterId: string }
  | { type: 'REMOVE_PARTY_MEMBER'; characterId: string }
  | { type: 'UPDATE_PARTY_GOLD'; amount: number }
  | { type: 'ADD_INVENTORY_ITEM'; itemId: number; quantity?: number }
  | { type: 'REMOVE_INVENTORY_ITEM'; itemId: number; quantity?: number }
  | { type: 'SET_ITEM_EQUIPPED'; itemId: number; equipped: boolean; characterId?: string | null }
  | { type: 'SET_CURRENT_LOCATION'; locationId: string }
  | { type: 'DISCOVER_LOCATION'; locationId: string }
  | { type: 'SET_ACTIVE_NPC'; npcId: number | null }
  | { type: 'SET_COMBAT_STATUS'; status: CombatStatus }
  | { type: 'SET_COMBAT_ENEMY'; enemy: any | null }
  | { type: 'UPDATE_COMBAT_ENEMY'; changes: any }
  | { type: 'RESET_RUNTIME_STATE'; state?: GameState };

export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'CREATE_CHARACTER': {
      const memberIds = action.addToParty && !state.party.memberIds.includes(action.character.id)
        ? [...state.party.memberIds, action.character.id]
        : state.party.memberIds;
      return { ...state, characters: { ...state.characters, [action.character.id]: action.character }, party: { ...state.party, memberIds } };
    }
    case 'UPDATE_CHARACTER': {
      const character = state.characters[action.characterId];
      if (!character) return state;
      return { ...state, characters: { ...state.characters, [action.characterId]: { ...character, ...action.changes } } };
    }
    case 'SET_CHARACTER_RESOURCE': {
      const character = state.characters[action.characterId];
      if (!character) return state;
      const resource = character[action.resource];
      return { ...state, characters: { ...state.characters, [action.characterId]: { ...character, [action.resource]: { ...resource, current: Math.max(0, Math.min(action.current, resource.max)) } } } };
    }
    case 'ADD_PARTY_MEMBER':
      if (!state.characters[action.characterId] || state.party.memberIds.includes(action.characterId)) return state;
      return { ...state, party: { ...state.party, memberIds: [...state.party.memberIds, action.characterId] } };
    case 'REMOVE_PARTY_MEMBER':
      return { ...state, party: { ...state.party, memberIds: state.party.memberIds.filter(id => id !== action.characterId) } };
    case 'UPDATE_PARTY_GOLD':
      return { ...state, party: { ...state.party, gold: Math.max(0, state.party.gold + action.amount) } };
    case 'ADD_INVENTORY_ITEM': {
      const quantity = action.quantity ?? 1;
      const existing = state.party.inventory.find(item => item.itemId === action.itemId && !item.equipped);
      const inventory = existing
        ? state.party.inventory.map(item => item === existing ? { ...item, quantity: item.quantity + quantity } : item)
        : [...state.party.inventory, { itemId: action.itemId, quantity, equipped: false, characterEquippedId: null }];
      return { ...state, party: { ...state.party, inventory } };
    }
    case 'REMOVE_INVENTORY_ITEM': {
      const quantity = action.quantity ?? 1;
      const inventory = state.party.inventory
        .map(item => item.itemId === action.itemId ? { ...item, quantity: item.quantity - quantity } : item)
        .filter(item => item.quantity > 0);
      return { ...state, party: { ...state.party, inventory } };
    }
    case 'SET_ITEM_EQUIPPED':
      return { ...state, party: { ...state.party, inventory: state.party.inventory.map(item => item.itemId === action.itemId ? { ...item, equipped: action.equipped, characterEquippedId: action.equipped ? action.characterId ?? null : null } : item) } };
    case 'SET_CURRENT_LOCATION':
      return { ...state, world: { ...state.world, currentLocationId: action.locationId } };
    case 'DISCOVER_LOCATION':
      if (state.world.discoveredLocationIds.includes(action.locationId)) return state;
      return { ...state, world: { ...state.world, discoveredLocationIds: [...state.world.discoveredLocationIds, action.locationId] } };
    case 'SET_ACTIVE_NPC':
      return { ...state, interaction: { ...state.interaction, activeNpcId: action.npcId } };
    case 'SET_COMBAT_STATUS':
      return { ...state, combat: { ...state.combat, status: action.status, enemy: action.status === 0 || action.status === 2 ? null : state.combat.enemy } };
    case 'SET_COMBAT_ENEMY':
      return { ...state, combat: { ...state.combat, enemy: action.enemy } };
    case 'UPDATE_COMBAT_ENEMY':
      return { ...state, combat: { ...state.combat, enemy: state.combat.enemy ? { ...state.combat.enemy, ...action.changes } : state.combat.enemy } };
    case 'RESET_RUNTIME_STATE':
      return action.state ?? createInitialGameState();
    default:
      return state;
  }
};
