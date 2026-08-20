import type { Dispatch, SetStateAction } from 'react';

interface InventoryActionDependencies {
  db: any;
  party: any;
  npcActive: any;
  combatActive: number;
  setParty: Dispatch<SetStateAction<any>>;
  setDb: Dispatch<SetStateAction<any>>;
}

export const createInventoryActions = ({
  db,
  party,
  npcActive,
  combatActive,
  setParty,
  setDb,
}: InventoryActionDependencies) => ({
  addItemToPartyInventory: (itemId: any, quantity = 1) => {
    setParty((prevParty: any) => {
      prevParty.inventory.addItem(itemId, db, quantity);
      return { ...prevParty };
    });
  },

  removeItemFromPartyInventory: (itemId: any, quantity: number) => {
    setParty((prevParty: any) => {
      prevParty.inventory.removeItem(itemId, quantity);
      return { ...prevParty };
    });
  },

  sellItem: (itemId: any, quantity: any) => {
    setParty((prevParty: any) => {
      prevParty.inventory.removeItem(itemId, quantity);
      return { ...prevParty };
    });

    if (npcActive?.inventory) {
      npcActive.inventory.addItem(itemId, db, quantity);
    }
  },

  equipItemToCharacter: (
    characterId: any,
    itemId: any,
    slot: any,
    equipBool: boolean
  ) => {
    if (combatActive) return;

    setDb((prevDb: any) => {
      const character = prevDb.characters.find((c: any) => c.id === characterId);
      if (!character) return prevDb;

      const item = party.inventory.getItemById(itemId, prevDb);
      if (!item) return prevDb;

      for (const itemSlot of item.slot) {
        if (character.equipped[itemSlot] != null) {
          party.inventory.unequipItem(character.equipped[itemSlot].itemId);
          character.equipped.unequipItem(itemSlot, prevDb, character);
        }
      }

      if (equipBool) {
        party.inventory.equipItem(itemId, characterId);
        character.equipped.equipItem(itemId, prevDb, character, slot);
      }

      return { ...prevDb };
    });
  },

  giveStarterItems: () => {
    if (db.characters?.length !== 1 || party.inventory.getInv(db).length !== 0) {
      return;
    }

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
  },
});
