import type { Dispatch, SetStateAction } from 'react';
import { customEquipment } from '@objects/customEquipment';
import { skillBook } from '@objects/skillBook';

interface CharacterActionDependencies {
  db: any;
  party: any;
  setDb: Dispatch<SetStateAction<any>>;
  giveStarterItems: () => void;
}

export const createCharacterActions = ({
  db,
  party,
  setDb,
  giveStarterItems,
}: CharacterActionDependencies) => ({
  updatePlayerStats: (newStats: any) => {
    setDb((prevDb: any) => ({
      ...prevDb,
      characters: prevDb.characters.map((character: any) =>
        character.id === newStats.id ? { ...character, ...newStats } : character
      ),
    }));
  },

  createCharacter: (
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
      name,
      race,
      class: charClass,
      health: {
        current: Math.floor(10 + stats.vitality * 4 + level * 3),
        max: Math.floor(10 + stats.vitality * 4 + level * 3),
      },
      stamina: {
        current: Math.floor(10 + stats.endurance * 2 + stats.dexterity + level * 3),
        max: Math.floor(10 + stats.endurance * 2 + stats.dexterity + level * 3),
      },
      mana: {
        current: Math.floor(10 + stats.intellect * 5 + level * 5),
        max: Math.floor(10 + stats.intellect * 5 + level * 5),
      },
      level,
      subStats: {
        defense: 0,
        percentDR: 0,
        resistanceDefense: createElementStats(),
        resistance: createElementStats(),
        bonusDamage: createElementStats(),
        increasedDamage: createElementStats(),
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
      },
      armorStats: null,
      equipped: new customEquipment(),
      stats,
      skillBook: new skillBook(),
      position: 0,
    };

    db.characters.push(newCharacter);
    party.members.push(newCharacter);
    giveStarterItems();
    return newCharacter;
  },
});

const createElementStats = () => ({
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
});
