import { Enemy } from '@objects/enemy';

export function generateEnemies(items, skills) {
  // console.log('ITEMS');
  // console.log(items);
  const getItemById = (id) => {
    // console.log('itemid', id);
    let category;
    if (id >= 0 && id <= 999) {
      category = items.weapons;
    } else if (id >= 1000 && id <= 1999) {
      category = items.armor;
    } else if (id >= 2000 && id <= 2999) {
      category = items.jewelry;
    } else if (id >= 3000 && id <= 3999) {
      category = items.consumable;
    } else if (id >= 4000 && id <= 4999) {
      category = items.questItem;
    } else if (id >= 5000 && id <= 5999) {
      category = items.ammo;
    } else if (id >= 6000 && id <= 6999) {
      category = items.misc;
    } else {
      return null;
    }
    const fullId = 'i-' + id.toString().padStart(8, '0');
    return category.find((item) => item.getId() === fullId) || null;
  };

  const getSkillById = (id) => {
    return skills.find((skill) => skill.getId() === id) || null;
  };

  return [
    new Enemy(
      1,
      'Wolf',
      { current: 20, max: 20 },
      { current: 5, max: 5 },
      { current: 5, max: 5 },
      0.5,
      1,
      0,
      0.3,
      0.9,
      0.2,
      {
        defense: 1,
        magicDefense: 0,
        percentDR: 0,
        magicRes: 0,
        movementRange: 5,
      },
      { min: 1, max: 2 },
      'A ferocious wolf.',
      [
        {
          type: 'item',
          item: getItemById(6000),
          rarity: 0.8,
        },
        {
          type: 'item',
          item: getItemById(6001),
          count: { min: 1, max: 3 },
          rarity: 0.3,
        },
      ],
      [getSkillById(1000), getSkillById(1001)]
    ),
    new Enemy(
      2,
      'Bear',
      { current: 40, max: 40 },
      { current: 10, max: 10 },
      { current: 5, max: 5 },
      2,
      0.5,
      0,
      0.1,
      0.9,
      0.1,
      {
        defense: 1,
        magicDefense: 0,
        percentDR: 0,
        magicRes: 0,
        movementRange: 3,
      },
      { min: 3, max: 4 },
      'A powerful bear.',
      [
        {
          type: 'item',
          item: getItemById(6002),
          rarity: 0.7,
        },
        {
          type: 'item',
          item: getItemById(6003),
          count: 2,
          rarity: 0.5,
        },
      ],
      [getSkillById(1000), getSkillById(1001)]
    ),
    new Enemy(
      3,
      'Goblin Scout',
      { current: 20, max: 20 },
      { current: 10, max: 10 },
      { current: 5, max: 5 },
      1,
      1,
      0,
      0.4,
      0.7,
      0.3,
      {
        defense: 1,
        magicDefense: 0,
        percentDR: 0,
        magicRes: 0,
        movementRange: 4,
      },
      { min: 2, max: 4 },
      'A sneaky goblin scout.',
      [
        {
          type: 'item',
          item: getItemById(6003),
          count: 2,
          rarity: 0.6,
        },
        { type: 'gold', count: 20, rarity: 0.8 },
      ]
    ),
    new Enemy(
      4,
      'Goblin Warrior',
      { current: 30, max: 30 },
      { current: 10, max: 10 },
      { current: 5, max: 5 },
      1.5,
      1,
      0,
      0.1,
      0.9,
      0.2,
      {
        defense: 1,
        magicDefense: 0,
        percentDR: 0,
        magicRes: 0,
        movementRange: 2,
      },
      { min: 5, max: 8 },
      'A fierce goblin warrior.',
      [
        {
          type: 'item',
          item: getItemById(6004),
          count: 2,
          rarity: 0.6,
        },
        { type: 'gold', count: 40, rarity: 0.8 },
      ]
    ),
    new Enemy(
      5,
      'Goblin Mage',
      { current: 20, max: 20 },
      { current: 5, max: 5 },
      { current: 10, max: 10 },
      1,
      0.5,
      2,
      0,
      0.8,
      0.1,
      {
        defense: 1,
        magicDefense: 0,
        percentDR: 0,
        magicRes: 0,
        movementRange: 2,
      },
      { min: 1, max: 2 },
      'A cunning goblin mage.',
      [
        {
          type: 'item',
          item: getItemById(6003),
          count: 2,
          rarity: 0.6,
        },
        { type: 'gold', count: 30, rarity: 0.8 },
      ]
    ),
    new Enemy(
      6,
      'Goblin Chieftain',
      { current: 100, max: 100 },
      { current: 20, max: 20 },
      { current: 20, max: 20 },
      3,
      2,
      2,
      0.1,
      0.95,
      0.3,
      {
        defense: 1,
        magicDefense: 0,
        percentDR: 0,
        magicRes: 0,
        movementRange: 4,
      },
      { min: 7, max: 10 },
      'The leader of the goblins.',
      [
        {
          type: 'item',
          item: getItemById(6003),
          count: 2,
          rarity: 0.6,
        },
        { type: 'gold', count: 100, rarity: 0.8 },
      ]
    ),
  ];

  // return enemyList;
}
