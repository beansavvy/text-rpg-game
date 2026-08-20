import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import { populateDB } from '@data/data';
import { customInventory } from '@objects/customInventory';
import GetEquipmentPopup from '@components/equipmentPopup';
import { createInitialGameState, gameReducer } from './gameReducer';
import type { GameState } from '@/types/game/gameState';
import { createCharacterActions } from './actions/characterActions';
import { createCombatActions } from './actions/combatActions';
import { createInventoryActions } from './actions/inventoryActions';
import { createLocationActions } from './actions/locationActions';
import { createPartyActions } from './actions/partyActions';
import { createUIActions } from './actions/uiActions';
import { getCharacterById as selectCharacterById } from './selectors/characterSelections';
import { getItemById as selectItemById } from './selectors/itemSelectors';
import {
  getCurrentLocation as selectCurrentLocation,
  getLocationById as selectLocationById,
} from './selectors/locationSelectors';
import { createNPCActions, populateNPCs } from './actions/npcGameActions';

interface GameContextType {
  db: any;
  enemy: any;
  combatActive: number;
  currentScreen: string;
  loading: boolean;
  npcActive: any;
  gameState: GameState;
  party: {
    inventory: customInventory;
    gold: number;
    members: any[];
  };
  itemPopupOpen: boolean;
  itemPopupSlot: string | null;
  characterPopupId: string | null;
  tooltipContent: ReactNode;
  tooltipPosition: { top: number; left: number };
  tooltipVisible: boolean;
  handleNPC: (npcId: any, action: any, pass?: any) => any;
  updateNPCActive: (npcId: any) => void;
  populateNPCs: (db: any) => Promise<void>;
  addItemToPartyInventory: (itemId: any, quantity?: number) => void;
  sellItem: (itemId: any, quantity: any) => void;
  removeItemFromPartyInventory: (itemId: any, quantity: any) => void;
  equipItemToCharacter: (
    characterId: any,
    itemId: any,
    slot: any,
    equipBool: boolean
  ) => void;
  updatePlayerStats: (newStats: any) => void;
  updateEnemyStats: (newStats: any) => void;
  generateEnemy: () => void;
  setNewCurrentLocation: (newState: string) => void;
  updateCombatActive: (active: number) => void;
  getCurrentLocation: () => any;
  setCurrentLocationId: (id: string) => void;
  createCharacter: (
    name: string,
    race: string,
    charClass: string,
    stats?: any,
    level?: number
  ) => any;
  discoverLocation: (id: string) => void;
  getCharacterById: (id: string) => any;
  getLocationById: (id: string) => any;
  getItemById: (id: number) => any;
  giveStarterItems: () => void;
  addCharacterToParty: (characterId: string) => void;
  removeCharacterFromParty: (characterId: string) => void;
  updatePartyGold: (amount: number) => void;
  openItemPopup: (slot: string, characterId: string) => void;
  closeItemPopup: () => void;
  showTooltip: (
    content: ReactNode,
    position: { top: number; left: number },
    rect: DOMRect
  ) => void;
  hideTooltip: () => void;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [db, setDb] = useState<any>({});
  const [enemy, setEnemy] = useState<any>(null);
  const [combatActive, setCombatActive] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('startPage');
  const [loading, setLoading] = useState(true);
  const [npcActive, setNPCActive] = useState<any>(null);
  const [party, setParty] = useState<any>({
    inventory: new customInventory(),
    gold: 100,
    location: 0,
    members: [],
  });
  const [itemPopupOpen, setItemPopupOpen] = useState(false);
  const [itemPopupSlot, setItemPopupSlot] = useState<string | null>(null);
  const [characterPopupId, setPopupCharacterId] = useState<string | null>(null);
  const [tooltipContent, setTooltipContent] = useState<ReactNode>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipTailPosition, setTooltipTailPosition] = useState(0);
  const [, setIsAbove] = useState(false);
  const [gameState, dispatchGame] = useReducer(
    gameReducer,
    undefined,
    createInitialGameState
  );

  useEffect(() => {
    const initializeGame = async () => {
      const initializedDb = await populateDB();
      setDb(initializedDb);

      if (initializedDb) {
        await populateNPCs(initializedDb);
      }

      setLoading(false);
    };

    initializeGame();
  }, []);

  const locationActions = createLocationActions({
    dispatchGame,
    setCurrentScreen,
  });

  const partyActions = createPartyActions({ db, setParty, dispatchGame });

  const npcActions = createNPCActions({ db, setNPCActive });

  const inventoryActions = createInventoryActions({
    db,
    party,
    npcActive,
    combatActive,
    setParty,
    setDb,
  });

  const characterActions = createCharacterActions({
    db,
    party,
    setDb,
    giveStarterItems: inventoryActions.giveStarterItems,
  });

  const combatActions = createCombatActions({
    db,
    currentLocationId: gameState.world.currentLocationId,
    setEnemy,
    setCombatActive,
  });

  const uiActions = createUIActions({
    setItemPopupOpen,
    setItemPopupSlot,
    setPopupCharacterId,
    setTooltipContent,
    setTooltipPosition,
    setTooltipVisible,
    setTooltipTailPosition,
    setIsAbove,
  });

  const getCurrentLocation = () =>
    selectCurrentLocation(db, gameState.world.currentLocationId);
  const getCharacterById = (id: string) => selectCharacterById(db, id);
  const getLocationById = (id: string) => selectLocationById(db, id);
  const getItemById = (id: number) => selectItemById(db, id);

  return (
    <GameContext.Provider
      value={{
        db,
        enemy,
        combatActive,
        gameState,
        currentScreen,
        loading,
        npcActive,
        party,
        itemPopupOpen,
        itemPopupSlot,
        characterPopupId,
        tooltipContent,
        tooltipPosition,
        tooltipVisible,
        populateNPCs,
        getCurrentLocation,
        getCharacterById,
        getLocationById,
        getItemById,
        ...locationActions,
        ...partyActions,
        ...npcActions,
        ...inventoryActions,
        ...characterActions,
        ...combatActions,
        ...uiActions,
      }}
    >
      {tooltipVisible && (
        <div
          className="global-tooltip"
          style={{
            position: 'absolute',
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            zIndex: 10001,
            background: '#333',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            whiteSpace: 'normal',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            maxWidth: '300px',
          }}
        >
          {tooltipContent}
          <div
            className={`tooltip-tail ${
              tooltipPosition.top > window.innerHeight
                ? 'tooltip-tail-above'
                : 'tooltip-tail-below'
            }`}
            style={{
              left: `${tooltipTailPosition}px`,
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      )}

      {itemPopupOpen && itemPopupSlot && characterPopupId && (
        <GetEquipmentPopup
          slot={itemPopupSlot}
          characterId={characterPopupId}
          onClose={uiActions.closeItemPopup}
        />
      )}

      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }

  return context;
};
