import { Item, Weapon, Armor, Jewelry, Consumable } from './item.js';

class Enemy {
  constructor(
    id,
    name,
    health,
    stamina,
    mana,
    healthRegen,
    staminaRegen,
    manaRegen,
    evadeChance,
    hitChance,
    critChance,
    subStats,
    attackDamage,
    description,
    loot,
    skills = null,
    kills = 0
  ) {
    this.id = id;
    this.name = name;
    this.health = health;
    this.stamina = stamina;
    this.mana = mana;
    this.healthRegen = healthRegen;
    this.staminaRegen = staminaRegen;
    this.manaRegen = manaRegen;
    this.evadeChance = evadeChance;
    this.hitChance = hitChance;
    this.critChance = critChance;
    this.subStats = subStats;
    this.damage = attackDamage;
    this.description = description;
    this.loot = loot;
    this.kills = kills;
    this.skills = skills;
  }

  handleDrops() {
    const droppedItems = [];

    this.loot.forEach((drop) => {
      if (Math.random() <= drop.rarity) {
        const item = drop.item; // Call the function to get the item object

        if (item.type == 'gold') {
          const { min, max, weight = 0, scale = 1 } = drop.count;
          const quantity = this.getWeightedQuantity(min, max, weight, scale);
          droppedItems.push({ type: 'gold', quantity });
        } else {
          if (
            drop.count &&
            drop.count.min !== undefined &&
            drop.count.max !== undefined
          ) {
            const { min, max, weight = 0, scale = 1 } = drop.count;
            const quantity = this.getWeightedQuantity(min, max, weight, scale);
            droppedItems.push({ type: 'item', item, quantity });
          } else {
            droppedItems.push({ type: 'item', item, quantity: 1 });
          }
        }
      }
    });

    console.log('TESTING DROPPED ITEMS: ', droppedItems);

    return droppedItems;
  }

  getWeightedQuantity(min, max, weight, scale) {
    const quantities = [];
    for (let i = min; i <= max; i++) {
      const section = Math.floor((i - min) / scale);
      const probability = Math.pow(1 - weight, section);
      quantities.push({ quantity: i, probability });
    }

    const totalProbability = quantities.reduce(
      (acc, q) => acc + q.probability,
      0
    );
    const rand = Math.random() * totalProbability;

    let cumulativeProbability = 0;
    for (let i = 0; i < quantities.length; i++) {
      cumulativeProbability += quantities[i].probability;
      if (rand < cumulativeProbability) {
        return quantities[i].quantity;
      }
    }

    return min; // Fallback to the minimum quantity
  }

  clone() {
    return new Enemy(
      this.id,
      this.name,
      { ...this.health },
      { ...this.stamina },
      { ...this.mana },
      this.healthRegen,
      this.staminaRegen,
      this.manaRegen,
      this.evadeChance,
      this.hitChance,
      this.critChance,
      { ...this.subStats },
      { ...this.damage },
      this.description,
      JSON.parse(JSON.stringify(this.loot)), // Deep copy of loot
      this.kills,
      this.skills ? [...this.skills] : null // Copy skills if not null
    );
  }
}

export { Enemy };
