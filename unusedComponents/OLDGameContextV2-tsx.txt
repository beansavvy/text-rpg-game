import React, {
  createContext,
  useReducer,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { populateDB } from '@data/data'; // Adjust the import path accordingly
import { customInventory } from '@objects/customInventory';
import { customEquipment } from '@objects/customEquipment';
import { Item, Weapon, Armor, Jewelry, Consumable } from '@objects/item.js';
import { skillBook } from '@objects/skillBook';
import { Enemy } from '@objects/enemy';
import GetEquipmentPopup from '@components/equipmentPopup'; // Import the popup component
import { createInitialGameState, gameReducer } from './gameReducer';
import type { GameState } from '@/types/game/gameState';

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
  itemPopupSlot: string;
  characterPopupId: string;
  tooltipContent: ReactNode;
  tooltipPosition: { top: number; left: number };
  tooltipVisible: boolean;
  handleNPC: (npcId: any, action: any, pass: any) => void;
  updateNPCActive: (npcId: any) => void;
  populateNPCs: () => void;
  addItemToPartyInventory: (itemId: any, quantity: number) => void;
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
    stats?: any
  ) => any;
  discoverLocation: (id: string) => void;
  getCharacterById: (id: string) => any;
  getLocationById: (id: string) => any;
  getItemById: (id: number) => any;
  giveStarterItems: () => void;
  addCharacterToParty: (characterId: string) => void;
  removeCharacterFromParty: (characterId: string) => void;
  updatePartyGold: (amount: number) => void;
  openItemPopup: (slot: string, characterId: string) => any;
  closeItemPopup: () => void;
  showTooltip: (
    content: ReactNode,
    position: { top: number; left: number },
    rect: any
  ) => void;
  hideTooltip: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  // const [state, dispatch] = useReducer(gameReducer, initialState); // Initialize state and dispatch using useReducer
  const [db, setDb] = useState({}); // Initialize db using useState
  const [enemy, setEnemy] = useState();
  const [combatActive, setCombatActive] = useState(0);
  const [currentScreen, setCurrentScreen] = useState('startPage');
  const [loading, setLoading] = useState(true);
  const [npcActive, setNPCActive] = useState(null);
  const [party, setParty] = useState({
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
  const [isAbove, setIsAbove] = useState(false);
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

  const showTooltip = (
    content: ReactNode,
    position: { top: number; left: number },
    triggerRect: DOMRect
  ) => {
    const tooltipWidth = 300; // Tooltip max width
    const viewportPadding = 5; // Space between tooltip and viewport edges

    let left = triggerRect.left + (triggerRect.width - tooltipWidth) / 2;
    let top = position.top;
    let tailLeft = tooltipWidth / 2; // Center the tail initially

    // Adjust for horizontal overflow
    if (left < viewportPadding) {
      tailLeft += left - viewportPadding;
      left = viewportPadding;
    } else if (left + tooltipWidth > window.innerWidth - viewportPadding) {
      tailLeft -= left + tooltipWidth - (window.innerWidth - viewportPadding);
      left = window.innerWidth - tooltipWidth - viewportPadding;
    }

    // Adjust for vertical overflow
    if (top + 150 > window.innerHeight) {
      top = triggerRect.top - 10; // Move tooltip above the trigger
      setIsAbove(true);
    } else {
      setIsAbove(false);
    }

    setTooltipContent(content);
    setTooltipPosition({ top, left });
    setTooltipTailPosition(tailLeft);
    setTooltipVisible(true);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
    setTooltipContent(null);
  };

  const setNewCurrentLocation = (newState: string) => {
    setCurrentScreen(newState);
  };

  const openItemPopup = (slot: string, characterId: string) => {
    setItemPopupSlot(slot);
    setPopupCharacterId(characterId);
    setItemPopupOpen(true);
  };

  const closeItemPopup = () => {
    setItemPopupOpen(false);
    setItemPopupSlot(null);
    setPopupCharacterId(null);
  };

  const addCharacterToParty = (characterId: string) => {
    setParty((prevParty) => {
      if (prevParty.members.some((member) => member.id === characterId)) {
        console.warn('Character already in party');
        return prevParty;
      }
      const character = db.characters.find((char) => char.id === characterId);
      if (character) {
        return { ...prevParty, members: [...prevParty.members, character] };
      }
      console.error('Character not found');
      return prevParty;
    });
  };

  const removeCharacterFromParty = (characterId: string) => {
    if (characterId == '0') {
      alert('Cannot remove main character from party.');
      return;
    }
    setParty((prevParty) => ({
      ...prevParty,
      members: prevParty.members.filter((member) => member.id !== characterId),
    }));
  };

  const updatePartyGold = (amount: number) => {
    dispatchGame({
      type: 'UPDATE_PARTY_GOLD',
      amount,
    });
  };

  const addItemToPartyInventory = (itemId: any, quantity = 1) => {
    setParty((prevParty) => {
      prevParty.inventory.addItem(itemId, quantity);
      return { ...prevParty };
    });
  };

  const removeItemFromPartyInventory = (itemId: any, quantity: number) => {
    setParty((prevParty) => {
      prevParty.inventory.removeItem(itemId, quantity);
      return { ...prevParty };
    });
  };

  const sellItem = (itemId: any, quantity: any) => {
    setDb((prevDb) => {
      if (party) {
        party.inventory.removeItem(itemId, quantity);
      }
      return { ...prevDb };
    });

    npcActive.inventory.addItem(itemId);
  };

  const equipItemToCharacter = (
    characterId: any,
    itemId: any,
    slot: any,
    equipBool: any
  ) => {
    if (combatActive) {
      return;
    }
    setDb((prevDb) => {
      const character = prevDb.characters.find((c) => c.id === characterId);

      const equipStats = equipBool == true ? 'EQUIPPING' : 'UNEQUIPPING';

      if (character) {
        console.log('TESTING EQUIP STATUS', slot, character.equipped[slot]);
        let item = party.inventory.getItemById(itemId, prevDb);
        if (item) {
          // Clear any conflicting slots before equipping the new item
          for (let slot of item.slot) {
            if (character.equipped[slot] != null) {
              party.inventory.unequipItem(character.equipped[slot].itemId);
              character.equipped.unequipItem(slot, prevDb, character);
            }
          }
        }
        if (equipBool) {
          // console.log('ITEM ID THAT IS BEING PASSED: ' + itemId);
          party.inventory.equipItem(itemId);
          character.equipped.equipItem(itemId, prevDb, character, slot);
        } else {
        }
      }
      // console.log(
      //   'CHARACTER AFTER ' + equipStats + ' ITEM: ',
      //   character.inventory,
      //   character.equipped
      // );
      return { ...prevDb };
    });
  };

  const handleNPC = (npcId: any, action: any, pass = null) => {
    let npc = npcId != null ? db.npcs.find((npc) => npc.id === npcId) : null;

    if (!npc) {
      return `NPC with id ${npcId} not found.`;
    }

    switch (action) {
      case 'talk':
        return npc.talk();
        return;
      case 'addItem':
        if (pass != null) npc.addItem(pass);
        return;
      case 'removeItem':
        if (pass != null) npc.removeItem(pass);
        return;
      case 'getInventory':
        return npc.getInventory();
        return;
      default:
        return;
    }
  };

  const updateNPCActive = (npcId: any) => {
    setNPCActive(db.npcs.find((npc) => npc.id === npcId));
  };

  const populateNPCs = async (db) => {
    const npcInventories = [
      {
        id: 0,
        items: [
          [0],
          [2],
          [3],
          [4],
          [5],
          [6],
          [8],
          [9],
          [10],
          [13],
          [1008],
          [1009],
          [1010],
          [1011],
          [1012],
          [1013],
          [1014],
          [1015],
        ],
      },
    ];

    npcInventories.forEach((entry) => {
      const npc = db.npcs.find((npc) => npc.id === entry.id);

      if (npc && npc.inventory) {
        entry.items.forEach((item) => {
          const itemId = item[0];
          const quantity = item[1] || 1; // Default quantity to 1 if not specified
          npc.inventory.addItem(itemId, db, quantity);
        });
      } else {
        console.error(`NPC with ID ${entry.id} not found or has no inventory.`);
      }
    });

    // console.log('FINISHED UPDATING NPC INVENTORIES', db);
  };
  const updatePlayerStats = (newStats: any) => {
    setDb((prevDb) => {
      const updatedCharacters = prevDb.characters.map((character) => {
        if (character.id === newStats.id) {
          return {
            ...character,
            ...newStats,
          };
        }
        return character;
      });

      return {
        ...prevDb,
        characters: updatedCharacters,
      };
    });
  };

  const updateEnemyStats = (newStats: any) => {
    // console.log('UPDATING ENEMY STATS');
    // console.log(enemy);
    setEnemy((prevEnemy) => {
      if (prevEnemy instanceof Enemy) {
        return Object.assign(
          Object.create(Object.getPrototypeOf(prevEnemy)),
          prevEnemy,
          newStats
        );
      }
      return { ...prevEnemy, ...newStats };
    });
    // console.log(enemy);
  };

  const updateCombatActive = (active: number) => {
    // console.log('CURRENT ACTIVE STATUS:' + active);
    setCombatActive(active);
    if (active == 0 || active == 2) {
      setEnemy(null);
      // console.log('ENEMY LIST: ', db.enemies);
      console.log(db.characters);
    }
  };

  const getCurrentLocation = () => {
    return getLocationById(gameState.world.currentLocationId);
  };

  const generateEnemy = () => {
    const enemies = getCurrentLocation()
      .enemyInfo.enemies.slice()
      .sort((a, b) => a.rarity - b.rarity);

    const weights = enemies.map((enemy: any) => enemy.rarity);
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    const randomValue = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < enemies.length; i++) {
      cumulativeWeight += weights[i];

      if (randomValue <= cumulativeWeight) {
        setEnemy(enemies[i].mob.clone());
        return;
      }
    }

    // In case no enemy is selected due to rounding errors, return the most common enemy
    setEnemy(enemies[0].mob.clone());
  };

  const setCurrentLocationId = (id: string) => {
    dispatchGame({
      type: 'SET_CURRENT_LOCATION',
      locationId: normalizeLocationId(id),
    });
  };

  const normalizeLocationId = (id: string | number) => {
    const stringId = id.toString();

    if (stringId.startsWith('l-')) {
      return stringId;
    }

    return `l-${stringId.padStart(4, '0')}`;
  };

  const discoverLocation = (id: string) => {
    dispatchGame({
      type: 'DISCOVER_LOCATION',
      locationId: normalizeLocationId(id),
    });
  };

  const getCharacterById = (id: string) => {
    // Your code here
  };

  const getLocationById = (id: string) => {
    //  tempid = '1';
    var fullId;

    if (id == undefined || id == null) {
      console.log('ID IS UNDEFINED');
      id = '0';
    }

    // console.log('DB CURRLOC ID: ', id);

    if (id.length == 6 && id[0] === 'l') {
      fullId = id;
    } else {
      fullId = 'l-' + id.toString().padStart(4, '0');
    }
    let category = db.locations;

    for (let loc of category) {
      if (loc.id === fullId) {
        return loc;
      }
    }
    return null;
  };

  const getItemById = (id: number) => {
    let category;
    if (id >= 0 && id <= 999) {
      category = db.items.weapons;
    } else if (id >= 1000 && id <= 1999) {
      category = db.items.armor;
    } else if (id >= 2000 && id <= 2999) {
      category = db.items.jewelry;
    } else if (id >= 3000 && id <= 3999) {
      category = db.items.consumable;
    } else if (id >= 4000 && id <= 4999) {
      category = db.items.questItem;
    } else if (id >= 5000 && id <= 5999) {
      category = db.items.ammo;
    } else if (id >= 6000 && id <= 6999) {
      category = db.items.misc;
    } else {
      return null;
    }

    const fullId = 'i-' + id.toString().padStart(8, '0');
    return category.find((item) => item.getId() === fullId) || null;
  };

  const createCharacter = (
    name: string,
    race: string,
    charClass: string,
    stats = {
      strength: 5,
      dexterity: 4,
      vitality: 3,
      endurance: 2,
      intellect: 1,
      luck: 6,
    },
    level = 1
  ) => {
    const newCharacter = {
      id: `c-${db.characters.length + 1}`,
      name: name,
      race: race,
      class: charClass,
      health: {
        current: Math.floor(10 + stats.vitality * 4 + level * 3),
        max: Math.floor(10 + stats.vitality * 4 + level * 3),
      },
      stamina: {
        current: Math.floor(
          10 + stats.endurance * 2 + stats.dexterity + level * 3
        ),
        max: Math.floor(10 + stats.endurance * 2 + stats.dexterity + level * 3),
      },
      mana: {
        current: Math.floor(10 + stats.intellect * 5 + level * 5),
        max: Math.floor(10 + stats.intellect * 5 + level * 5),
      },
      level: level,
      subStats: {
        defense: 0,
        percentDR: 0,
        resistanceDefense: {
          fire: 0,
          lightning: 0,
          ice: 0,
          earth: 0,
          arcane: 0,
          psychic: 0,
          holy: 0,
          death: 0,
          slashing: 0,
          piercing: 0,
          blunt: 0,
        },
        resistance: {
          fire: 0,
          lightning: 0,
          ice: 0,
          earth: 0,
          arcane: 0,
          psychic: 0,
          holy: 0,
          death: 0,
          slashing: 0,
          piercing: 0,
          blunt: 0,
        },
        bonusDamage: {
          fire: 0,
          lightning: 0,
          ice: 0,
          earth: 0,
          arcane: 0,
          psychic: 0,
          holy: 0,
          death: 0,
          slashing: 0,
          piercing: 0,
          blunt: 0,
        },
        increasedDamage: {
          fire: 0,
          lightning: 0,
          ice: 0,
          earth: 0,
          arcane: 0,
          psychic: 0,
          holy: 0,
          death: 0,
          slashing: 0,
          piercing: 0,
          blunt: 0,
        },
        evadeChance: (0.1 + stats.dexterity * 0.02 - level * 0.005).toFixed(3),
        movementRange: Math.floor(2 + stats.dexterity * 0.5),
      },
      experience: { current: 0, max: 100 },
      weaponStats: {
        mainHand: {
          type: 'Empty',
          damage: { min: 1, max: 2 },
          hitChance: (0.8 + stats.dexterity * 0.02).toFixed(3),
          critChance: (0.1 + stats.dexterity * 0.0025).toFixed(3),
        },
        offHand: null,
        // offHand: {
        //   type: 'Empty',
        //   damage: { min: 1, max: 2 },
        //   attackSpeed: 1,
        //   hitChance: (0.8 + stats.dexterity * 0.02).toFixed(3),
        //   critChance: (0.1 + stats.dexterity * 0.0025).toFixed(3),
        // },
      },
      armorStats: null,
      equipped: new customEquipment(),
      stats: stats,
      skillBook: new skillBook(),
      position: 0,
    };
    db.characters.push(newCharacter);
    party.members.push(newCharacter);
    giveStarterItems();
    // console.log('NEW CHARACTER');
    // console.log(newCharacter);
    return newCharacter;
  };

  const giveStarterItems = () => {
    if (db.characters.length == 1 && party.inventory.getInv(db).length == 0) {
      // console.log('TESTING ITEM PUSH: ' + db.characters[0].class);
      switch (db.characters[0].class) {
        case 'Warrior':
          party.inventory.addItem(0, db);
          break;
        case 'Mage':
          party.inventory.addItem(1, db);
          break;
        case 'Hunter':
          party.inventory.addItem(2, db);
          break;
        case 'Adventurer':
          party.inventory.addItem(3, db);
          break;
      }

      party.inventory.addItem(1, db);
      party.inventory.addItem(1000, db);
      party.inventory.addItem(1001, db);
      party.inventory.addItem(1002, db);
      party.inventory.addItem(3000, db, 3);
      party.inventory.addItem(3001, db, 3);
      party.inventory.addItem(3002, db, 3);
    }
    // console.log('TESTING INVENTORY OF PLAYER: ', db.characters[0].inventory);
  };

  const updatePopup = (state: boolean, content: string) => {};

  // Provide state, dispatch, and db in the context value
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
        handleNPC,
        party,
        updateNPCActive,
        populateNPCs,
        sellItem,
        removeItemFromPartyInventory,
        generateEnemy,
        updatePlayerStats,
        addItemToPartyInventory,
        equipItemToCharacter,
        updateEnemyStats,
        setNewCurrentLocation,
        updateCombatActive,
        getCurrentLocation,
        setCurrentLocationId,
        createCharacter,
        discoverLocation,
        getCharacterById,
        getLocationById,
        getItemById,
        giveStarterItems,
        addCharacterToParty,
        removeCharacterFromParty,
        updatePartyGold,
        openItemPopup,
        showTooltip,
        hideTooltip,
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
          ></div>
        </div>
      )}
      {itemPopupOpen && itemPopupSlot && characterPopupId && (
        <GetEquipmentPopup
          slot={itemPopupSlot}
          characterId={characterPopupId}
          onClose={closeItemPopup}
        />
      )}
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext); // Access the context
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider'); // Throw error if context is not found
  }
  return context; // Return the context
};

function logCustomMethods(obj: any) {
  if (!obj) {
    console.log('Object is null or undefined');
    return;
  }

  // Log the type of the object
  console.log(
    'Object Type:',
    obj.constructor ? obj.constructor.name : typeof obj
  );

  let properties = new Set();
  let currentObj = obj;

  // Traverse the prototype chain
  while (currentObj) {
    Object.getOwnPropertyNames(currentObj).forEach((item) =>
      properties.add(item)
    );
    currentObj = Object.getPrototypeOf(currentObj);
  }

  // Filter properties to get only methods
  const methods = Array.from(properties).filter((property) => {
    return (
      typeof obj[property] === 'function' &&
      !Object.prototype.hasOwnProperty.call(Object.prototype, property) &&
      !Object.prototype.hasOwnProperty.call(Array.prototype, property)
    );
  });

  console.log('Custom Methods:', methods);
}
