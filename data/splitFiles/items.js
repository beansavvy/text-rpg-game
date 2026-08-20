import { Item, Weapon, Armor, Jewelry, Consumable } from '@objects/item.js';

// Item ID ranges:
// 0-999 weapons, 1000-1999 armor, 2000-2999 jewelry,
// 3000-3999 consumables, 4000-4999 quest items,
// 5000-5999 ammo, and 6000-6999 miscellaneous items.

export function generateItems() {
  return {
    weapons: [
      new Weapon(
        0,
        'Iron Sword',
        'A sturdy iron sword.',
        10,
        10,
        3,
        7,
        1,
        0.8,
        0.15,
        // 1,
        ['mainHand'],
        null
      ),
      new Weapon(
        1,
        "Apprentice's Staff",
        'A wooden staff imbued with magical properties.',
        15,
        20,
        2,
        4,
        0.8,
        0.9,
        0.1,
        // 1,
        ['mainHand', 'offHand'],
        { attribute: ['bonusMagicDmg'], value: [2] }
      ),
      new Weapon(
        2,
        'Bow',
        'A long range bow.',
        12,
        20,
        3,
        6,
        0.7,
        0.85,
        0.3,
        // 1,
        ['mainHand', 'offHand'],
        null
      ),
      new Weapon(
        3,
        'Iron Dagger',
        'A short but fast dagger.',
        7,
        8,
        2,
        5,
        1.25,
        0.95,
        0.4,
        // 1,
        ['mainHand'],
        null
      ),
      new Weapon(
        4,
        'Iron Longsword',
        'A sharp and balanced longsword.',
        15,
        25,
        4,
        8,
        1,
        0.85,
        0.2,
        ['mainHand'],
        null
      ),
      new Weapon(
        5,
        'Iron Battle Axe',
        'A heavy battle axe with a powerful swing.',
        20,
        30,
        5,
        10,
        0.7,
        0.75,
        0.3,
        ['mainHand', 'offHand'],
        null
      ),
      new Weapon(
        6,
        'Iron War Hammer',
        'A massive hammer that deals devastating blows.',
        25,
        35,
        6,
        12,
        0.6,
        0.7,
        0.25,
        ['mainHand', 'offHand'],
        null
      ),
      new Weapon(
        7,
        'Light Crossbow',
        'A ranged weapon that fires bolts with precision.',
        18,
        40,
        4,
        8,
        0.9,
        0.9,
        0.3,
        ['mainHand', 'offHand'],
        null
      ),
      new Weapon(
        8,
        'Iron Mace',
        'A blunt weapon designed to crush armor.',
        12,
        22,
        3,
        7,
        0.8,
        0.85,
        0.2,
        ['mainHand'],
        null
      ),
      new Weapon(
        9,
        'Iron Rapier',
        'A thin, fast, and precise sword.',
        10,
        20,
        2,
        5,
        1.4,
        0.95,
        0.4,
        ['mainHand'],
        null
      ),
      new Weapon(
        10,
        'Iron Greatsword',
        'A large sword that requires two hands to wield.',
        30,
        50,
        8,
        14,
        0.5,
        0.8,
        0.2,
        ['mainHand', 'offHand'],
        null
      ),
      new Weapon(
        11,
        'Shortbow',
        'A simple bow suitable for quick shots.',
        8,
        18,
        2,
        5,
        1.2,
        0.9,
        0.35,
        ['mainHand', 'offHand'],
        null
      ),
      new Weapon(
        12,
        "Apprentice's Magic Wand",
        'A wand that enhances magical attacks.',
        5,
        15,
        1,
        3,
        1.1,
        0.95,
        0.25,
        ['mainHand'],
        { attribute: ['bonusMagicDmg'], value: [3] }
      ),
      new Weapon(
        13,
        'Iron Throwing Knives',
        'A set of knives designed for throwing.',
        3,
        10,
        1,
        2,
        1.5,
        0.9,
        0.35,
        ['offHand'],
        null
      ),
    ],
    armor: [
      new Armor(
        1000,
        'Apprentice Hood',
        'A simple cloth hood worn by novice spellcasters.',
        1,
        10,
        { defense: 1, bonusMagic: 1 },
        ['head']
      ),
      new Armor(
        1001,
        'Apprentice Robes',
        'Basic robes that provide minimal protection.',
        3,
        15,
        { defense: 1, bonusMagic: 2 },
        ['chest']
      ),
      new Armor(
        1002,
        'Apprentice Gloves',
        'Cloth gloves with basic enchantments.',
        1,
        8,
        { defense: 1, bonusMagic: 1 },
        ['hands']
      ),
      new Armor(
        1003,
        'Apprentice Boots',
        'Soft boots that are easy to move in.',
        1,
        8,
        { defense: 1, bonusMagic: 1 },
        ['feet']
      ),
      // Light Armor Set
      new Armor(
        1004,
        'Leather Cap',
        'A light cap made of leather, offering minimal protection.',
        2,
        10,
        { defense: 1 },
        ['head']
      ),
      new Armor(
        1005,
        'Leather Tunic',
        'A tunic made from tanned leather, providing basic defense.',
        4,
        15,
        { defense: 2 },
        ['chest']
      ),
      new Armor(
        1006,
        'Leather Gloves',
        'Simple leather gloves offering some protection.',
        1,
        5,
        { defense: 1 },
        ['hands']
      ),
      new Armor(
        1007,
        'Leather Boots',
        'Lightweight boots made of leather, designed for agility.',
        3,
        8,
        { defense: 1 },
        ['feet']
      ),

      // Medium Armor Set
      new Armor(
        1008,
        'Chain Coif',
        'A coif made of interlocking metal rings.',
        8,
        25,
        { defense: 3 },
        ['head']
      ),
      new Armor(
        1009,
        'Chainmail Hauberk',
        'A long shirt of chainmail, offering moderate protection.',
        15,
        35,
        { defense: 4 },
        ['chest']
      ),
      new Armor(
        1010,
        'Chainmail Gauntlets',
        'Protective gloves made of chainmail.',
        6,
        20,
        { defense: 2 },
        ['hands']
      ),
      new Armor(
        1011,
        'Chainmail Greaves',
        'Leg protection made of interlocking rings of metal.',
        10,
        30,
        { defense: 3 },
        ['feet']
      ),

      // Heavy Armor Set
      new Armor(
        1012,
        'Iron Helmet',
        'A sturdy iron helmet.',
        12,
        40,
        { defense: 5 },
        ['head']
      ),
      new Armor(
        1013,
        'Iron Cuirass',
        'A heavy iron chestplate offering significant protection.',
        25,
        60,
        { defense: 8 },
        ['chest']
      ),
      new Armor(
        1014,
        'Iron Gauntlets',
        'Iron gloves that provide excellent hand protection.',
        10,
        35,
        { defense: 4 },
        ['hands']
      ),
      new Armor(
        1015,
        'Iron Boots',
        'Heavy iron boots designed to protect the feet.',
        15,
        45,
        { defense: 5 },
        ['feet']
      ),
      new Armor(
        1016,
        'Hunter’s Cloak',
        'A cloak that provides camouflage.',
        3,
        18,
        { dodgeChance: 0.1 },
        ['back']
      ),
      new Armor(
        1017,
        'Knight’s Shield',
        'A large shield offering excellent protection.',
        15,
        40,
        { defense: 4 },
        ['offHand']
      ),
      new Armor(
        1018,
        'Dragon Scale Armor',
        'Armor made from the scales of a dragon.',
        25,
        100,
        { defense: 8 },
        ['chest']
      ),
      new Armor(
        1019,
        'Assassin’s Hood',
        'A hood that conceals the wearer’s identity.',
        2,
        25,
        { stealth: 5, defense: 2 },
        ['head']
      ),
      new Armor(
        1020,
        'Mystic Shroud',
        'A shroud that pulses with a mysterious energy, enhancing magical abilities.',
        2,
        50,
        { defense: 3, bonusMagic: 3 },
        ['back'],
        5
      ),
      new Armor(
        1021,
        'Thief’s Mask',
        'A mask worn by thieves, it provides excellent stealth abilities.',
        1,
        45,
        { defense: 1, stealth: 3 },
        ['head'],
        4
      ),
      new Armor(
        1022,
        'Paladin’s Aegis',
        'A blessed shield that offers unmatched protection.',
        15,
        100,
        { defense: 10, holyResistance: 2 },
        ['offHand'],
        10
      ),
      new Armor(
        1023,
        'Dragonscale Plate',
        'Armor crafted from the scales of a powerful dragon, incredibly durable and nearly impervious to damage.',
        25,
        150,
        { defense: 10, fireResistance: 5 },
        ['chest'],
        12
      ),
    ],
    jewelry: [
      new Jewelry(
        2000,
        'Ring of Strength',
        'A ring that increases physical power.',
        0.1,
        50,
        { strength: 2 },
        ['finger']
      ),
      new Jewelry(
        2001,
        'Amulet of Wisdom',
        'An amulet that enhances intellect.',
        0.2,
        60,
        { intellect: 3 },
        ['neck']
      ),
      new Jewelry(
        2002,
        'Bracelet of Dexterity',
        'A bracelet that improves agility.',
        0.1,
        45,
        { dexterity: 2 },
        ['wrist']
      ),
      new Jewelry(
        2003,
        'Pendant of Vitality',
        'A pendant that boosts vitality.',
        0.3,
        55,
        { vitality: 3 },
        ['neck']
      ),
      new Jewelry(
        2004,
        'Ring of Protection',
        'A ring that provides a defensive bonus.',
        0.1,
        50,
        { defense: 2 },
        ['finger']
      ),
      new Jewelry(
        2005,
        'Charm of Luck',
        'A charm that increases luck.',
        0.05,
        40,
        { luck: 2 },
        ['neck']
      ),
      new Jewelry(
        2006,
        'Crown of Power',
        'A crown that grants significant power.',
        1,
        120,
        { strength: 4, intellect: 4 },
        ['head']
      ),
      new Jewelry(
        2008,
        'Belt of Fortitude',
        'A belt that increases endurance.',
        0.2,
        45,
        { vitality: 2 },
        ['waist']
      ),
      new Jewelry(
        2009,
        'Talisman of the Elements',
        'A talisman that provides elemental resistance.',
        0.3,
        70,
        { fireRes: 2, iceRes: 2 },
        ['neck']
      ),
    ],
    consumable: [
      new Consumable(
        3000,
        'Lesser Health Potion',
        'Restores 10 health points.',
        0.1,
        5,
        ['health'],
        [10]
      ),
      new Consumable(
        3001,
        'Lesser Mana Potion',
        'Restores 10 mana points.',
        0.1,
        5,
        ['mana'],
        [10]
      ),
      new Consumable(
        3002,
        'Lesser Stamina Potion',
        'Restores 10 stamina points.',
        0.1,
        5,
        ['stamina'],
        [10]
      ),
    ],
    questItem: [],
    ammo: [],
    misc: [
      new Item(
        6000,
        'Misc',
        'Wolf Pelt',
        'The mangy pet of a wild wolf.',
        1,
        10
      ),
      new Item(
        6001,
        'Misc',
        'Wolf Fang',
        'The sharp canine of a wild wolf.',
        0.1,
        20
      ),
      new Item(6002, 'Misc', 'Bear Pelt', 'The thick pelt of a bear...', 3, 40),
      new Item(
        6003,
        'Misc',
        'Bear Claw',
        'The long claw of a bear...',
        0.1,
        50
      ),
      new Item(
        6004,
        'Misc',
        'Goblin Ear',
        'The ear of a goblin... Gross!',
        0.1,
        20
      ),
    ],
  };

  return items;
}
