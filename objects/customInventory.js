export class customInventory {
  constructor() {
    this.items = []; // Initialize the items array
  }

  // Method to add an item to the inventory
  addItem(
    itemId,
    db,
    quantity = 1,
    equipped = null,
    characterEquippedId = null
  ) {
    // console.log(itemId);
    if (typeof itemId === 'string') {
      // Remove the 2 left-most characters and convert to an integer
      itemId = parseInt(itemId.slice(2), 10);
    }
    const existingItemIndex = this.items.findIndex(
      (inventoryItem) => inventoryItem.itemId === itemId
    );

    if (existingItemIndex !== -1) {
      // If the item already exists in the inventory, update its quantity
      this.items[existingItemIndex].quantity += quantity;
    } else {
      const item = this.getItemById(itemId, db);
      if (!item) {
        console.error(`Item with ID ${itemId} not found in the database.`);
        return;
      }

      // If the item doesn't exist, and is a piece of equippable gear, add it with the equipped tag set to false
      if (
        item.type === 'Weapon' ||
        item.type === 'Armor' ||
        item.type === 'Jewelry'
      ) {
        equipped = false;
        this.items.push({ itemId, quantity, equipped, characterEquippedId });
      } else {
        // Else add the item without equipped tag
        this.items.push({ itemId, quantity, equipped, characterEquippedId });
      }
    }
  }

  // Method to remove an item from the inventory
  removeItem(itemId, quantity = 1) {
    const existingItemIndex = this.items.findIndex(
      (inventoryItem) => inventoryItem.itemId === itemId
    );

    if (existingItemIndex !== -1) {
      // If the item exists in the inventory, update its quantity or remove it if necessary
      const updatedQuantity = this.items[existingItemIndex].quantity - quantity;

      if (updatedQuantity <= 0) {
        // If quantity becomes zero or negative, remove the item from the inventory
        this.items.splice(existingItemIndex, 1);
      } else {
        // Otherwise, update the quantity
        this.items[existingItemIndex].quantity = updatedQuantity;
      }
    }
  }

  // Method to get an item from the inventory by ID
  getItemById(itemId, db) {
    let category;
    if (itemId >= 0 && itemId <= 999) {
      category = db.items.weapons;
    } else if (itemId >= 1000 && itemId <= 1999) {
      category = db.items.armor;
    } else if (itemId >= 2000 && itemId <= 2999) {
      category = db.items.jewelry;
    } else if (itemId >= 3000 && itemId <= 3999) {
      category = db.items.consumable;
    } else if (itemId >= 4000 && itemId <= 4999) {
      category = db.items.questItem;
    } else if (itemId >= 5000 && itemId <= 5999) {
      category = db.items.ammo;
    } else if (itemId >= 6000 && itemId <= 6999) {
      category = db.items.misc;
    } else {
      return null;
    }

    const fullId = 'i-' + itemId.toString().padStart(8, '0');
    return category.find((item) => item.getId() === fullId) || null;
  }

  equipItem(itemId, characterId) {
    const inventoryItem = this.items.find((i) => i.itemId === itemId);
    if (inventoryItem) {
      inventoryItem.equipped = true;
      inventoryItem.characterEquippedId = characterId;
    }
  }

  unequipItem(itemId) {
    const inventoryItem = this.items.find((i) => i.itemId === itemId);
    if (inventoryItem) {
      inventoryItem.equipped = false;
      inventoryItem.characterEquippedId = null;
    }
  }

  getInv(db) {
    let retVal = this.items.map((item) => ({
      ...item,
      item: this.getItemById(item.itemId, db),
    }));

    if (retVal == undefined) {
      retVal = this.items;
    }
    // console.log('RETVAL: ', retVal);
    return retVal;
  }
}
