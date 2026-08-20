export class customEquipment {
  constructor() {
    this.mainHand = null;
    this.offHand = null;
    this.head = null;
    this.shoulders = null;
    this.chest = null;
    this.wrists = null;
    this.hands = null;
    this.waist = null;
    this.legs = null;
    this.feet = null;
    this.neck = null;
    this.back = null;
    this.fingerLeft = null;
    this.fingerRight = null;
    this.ammo = null;
  }

  // Method to update character stats based on the equipped item
  addStats(itemId, character, db, slot) {
    // console.log(character);

    let itemObj = this.getItemById(itemId, db);

    // console.log(itemObj);
    if (itemObj.type == 'Weapon') {
      if (slot == 'mainHand') {
        character.weaponStats.mainHand = {
          type: 'Weapon',
          damage: { min: itemObj.minDamage, max: itemObj.maxDamage },
          attackSpeed: itemObj.attackSpeed,
          hitChance: Math.min(
            (
              itemObj.hitChance +
              character.stats.dexterity * 0.02 -
              character.level * 0.01
            ).toFixed(3),
            1
          ),
          critChance: Math.min(
            (itemObj.critChance + character.stats.dexterity * 0.0025).toFixed(
              3
            ),
            1
          ),
        };
      } else if (slot == 'offHand') {
        character.weaponStats.offHand = {
          type: 'Weapon',
          damage: { min: itemObj.minDamage, max: itemObj.maxDamage },
          attackSpeed: itemObj.attackSpeed,
          hitChance: Math.min(
            (
              itemObj.hitChance +
              character.stats.dexterity * 0.02 -
              character.level * 0.01
            ).toFixed(3),
            1
          ),
          critChance: Math.min(
            (itemObj.critChance + character.stats.dexterity * 0.0025).toFixed(3),
            1
          ),
        };
      }
    }
    if (itemObj.attributes) {
      for (const [stat, value] of Object.entries(itemObj.attributes)) {
        // console.log(stat);
        if (character.subStats.hasOwnProperty(stat)) {
          character.subStats[stat] += value;
        } else {
          console.warn(`Stat '${stat}' does not exist on character.`);
        }
      }
    }
  }

  removeStats(slot, db, character) {
    let itemObj = this[slot] ? this.getItemById(this[slot].itemId, db) : null;

    if (itemObj && itemObj.type == 'Weapon') {
      if (slot == 'mainHand') {
        character.weaponStats.mainHand = {
          type: 'Weapon',
          damage: { min: 1, max: 2 },
          attackSpeed: 1,
          hitChance: Math.min(
            (0.8 + character.stats.dexterity * 0.02).toFixed(3),
            1
          ),
          critChance: Math.min(
            (0.1 + character.stats.dexterity * 0.0025).toFixed(3),
            1
          ),
        };
      } else if (slot == 'offHand') {
        character.weaponStats.offHand = null;
      }
    }
    if (itemObj.attributes) {
      for (const [stat, value] of Object.entries(itemObj.attributes)) {
        // console.log(stat);
        if (character.subStats.hasOwnProperty(stat)) {
          character.subStats[stat] -= value;
        } else {
          console.warn(`Stat '${stat}' does not exist on character.`);
        }
      }
    }
  }

  equipItem(itemId, db, character, selectedSlot = null) {
    let statSlot = null;
    let item = this.getItemById(itemId, db);

    if (selectedSlot == null) {
      statSlot = item.slot[0];
      for (let slot of item.slot) {
        switch (slot) {
          case 'mainHand':
            this.mainHand = { itemId };
            break;
          case 'offHand':
            this.offHand = { itemId };
            break;
          case 'head':
            this.head = { itemId };
            break;
          case 'shoulders':
            this.shoulders = { itemId };
            break;
          case 'chest':
            this.chest = { itemId };
            break;
          case 'wrists':
            this.wrists = { itemId };
            break;
          case 'hands':
            this.hands = { itemId };
            break;
          case 'waist':
            this.waist = { itemId };
            break;
          case 'legs':
            this.legs = { itemId };
            break;
          case 'feet':
            this.feet = { itemId };
            break;
          case 'neck':
            this.neck = { itemId };
            break;
          case 'fingerLeft':
            this.fingerLeft = { itemId };
            break;
          case 'fingerRight':
            this.fingerRight = { itemId };
            break;
          case 'ammo':
            this.ammo = { itemId };
            break;
        }
      }
    } else {
      statSlot = selectedSlot;
      this[selectedSlot] = { itemId };
    }
    this.addStats(itemId, character, db, statSlot);
  }

  unequipItem(slot, db, character) {
    if (this[slot] == null) return;
    let itemId = this[slot].itemId;
    this.removeStats(slot, db, character);

    // Remove item from all slots if it has the same itemId
    for (let slt in this) {
      if (this[slt] && this[slt].itemId === itemId) {
        this[slt] = null;
      }
    }
  }

  // Override toString method to return the items array
  toString() {
    return this;
  }

  getSlotById(id) {
    for (let slot in this) {
      if (this[slot] && this[slot].itemId === id) {
        return slot;
      }
    }
    return null;
  }

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
}
