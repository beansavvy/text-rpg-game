import { customInventory } from '@objects/customInventory';
import { Item } from '@objects/item.js';
import { skillBook } from '@objects/skillBook';

class NPC {
  constructor(
    id,
    name,
    type,
    locationId,
    description,
    dialogue,
    options,
    inventory = null,
    skills = null
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.locationId = locationId;
    this.description = description;
    this.dialogue = dialogue;
    this.options = options;
    this.inventory = inventory;
    this.skills = skills;
  }

  talk(option = null) {
    return option == null ? this.dialogue : this.dialogue[option];
  }

  getInventory(db) {
    // console.log('getting npc inventory: ', this.inventory);
    return this.inventory.getInv(db);
  }

  addItemToInventory(itemId) {
    this.inventory.addItem(item);
  }

  removeItemFromInventory(itemId) {
    this.inventory.removeItem(itemId);
  }
}

export { NPC };
