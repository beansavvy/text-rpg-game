import { customInventory, customEquipment } from '@objects/customInventory';
import { Item, Weapon, Armor, Jewelry, Consumable } from '@objects/item.js';
import { Enemy } from '@objects/enemy';
import { skillBook } from '@objects/skillBook';
import { useGameContext } from '../context/GameContext';

// var currentLocation = '3';

const enemyList = [
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
    { flat: { min: 0, max: 1 }, percent: 0 },
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
    ]
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
    { flat: { min: 1, max: 3 }, percent: 0.2 },
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
    ]
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
    { flat: { min: 1, max: 2 }, percent: 0 },
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
    { flat: { min: 3, max: 5 }, percent: 0.3 },
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
    { flat: { min: 0, max: 1 }, percent: 0.1 },
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
    { flat: { min: 5, max: 8 }, percent: 0.4 },
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

const gameLocations = [
  {
    id: 'l-0001',
    name: 'Elmere',
    mapName: 'Elmere',
    description:
      'Elmere is a bustling town with a vibrant market and diverse inhabitants.',
    directions: [2, 3],
    type: 'town',
    levelLimit: { min: 1, max: 5 },
    dialogue: 'Welcome to Elmere, the town of start-ups and adventures.',
    mapx: -100,
    mapy: 0,
    discovered: true,
    showOnMap: true,
  },
  {
    id: 'l-0002',
    name: "Edmund's Smithy",
    mapName: 'Elmere',
    description: 'A small shop full of various goods and equipment.',
    directions: [1],
    options: [{ name: 'Talk with Edmund', action: () => talkToNPC(1) }],
    type: 'shop',
    shopType: ['Blacksmith', 'Armorsmith'],
    dialogue:
      "You find yourself in a quaint and tidy blacksmith's shop, with weapons and armor adorning the walls.",
    discovered: false,
    mapx: -100,
    mapy: 0,
    showOnMap: false,
  },
  {
    id: 'l-0003',
    name: "Elmere's Gate",
    mapName: 'Elmere',
    description:
      'The main gate leading into Elmere, offering a path to adventure or safety depending on your direction.',
    directions: [1, 4],
    type: 'gate',
    dialogue:
      'The gate stands tall and imposing, a guard between the known and the unknown. Will you step through into the bustling life of Elmere, or venture into the wilds of the Forest of Eldarin?',
    discovered: false,
    mapx: -100,
    mapy: 0,
    showOnMap: false,
  },
  {
    id: 'l-0004',
    name: 'Ancient Forest of Eldarin',
    mapName: 'Ancient Forest of Eldarin',
    description:
      'The ancient, mysterious forest home to numerous creatures and secrets.',
    directions: [3, 5],
    type: 'forest',
    options: [
      {
        name: 'Hunt',
      },
      { name: 'Scavenge', action: () => console.log('SCAVENGING') },
    ],
    enemyInfo: {
      enemies: [
        {
          name: 'Wolf',
          mob: enemyList[0],
          seen: false,
          spawnCond: 'random',
          rarity: 0.8,
        },
        {
          name: 'Bear',
          mob: enemyList[1],
          seen: false,
          spawnCond: 'random',
          rarity: 0.2,
        },
      ],
      enemyDiffMulti: 1,
      enemyQuantMulti: 1,
    },
    recommendedLevel: 1,
    enemyDiffMulti: 1,
    dialogue:
      'The Forest of Eldarin whispers secrets of old through the rustling leaves.',
    mapx: 0,
    mapy: 0,
    discovered: false,
    showOnMap: true,
  },
  {
    id: 'l-0005',
    name: 'Ancient Forest of Eldarin Cave',
    mapName: 'Ancient Forest of Eldarin',
    description:
      'A dark, damp cave rumored to be the hiding place of a specific group of monsters.',
    directions: [4],
    type: 'travel',
    enemyInfo: {
      enemies: [
        {
          name: 'Goblin Scout',
          mob: enemyList[2],
          seen: false,
          spawnCond: 'random',
          rarity: 0.8,
        },
        {
          name: 'Goblin Warrior',
          mob: enemyList[3],
          seen: false,
          spawnCond: 'random',
          rarity: 0.4,
        },
        {
          name: 'Goblin Mage',
          mob: enemyList[4],
          seen: false,
          spawnCond: 'random',
          rarity: 0.1,
        },
        {
          name: 'Goblin Chieftain',
          mob: enemyList[5],
          seen: false,
          spawnCond: 'boss',
          rarity: -1,
        },
      ],
      enemyDiffMulti: 1.1,
      enemyQuantMulti: 2.1,
    },
    recommendedLevel: 5,
    dialogue:
      'The cave is dark and foreboding, with the sounds of goblins echoing from within.',
    discovered: false,
    mapx: 0,
    mapy: 0,
    showOnMap: false,
  },
];

const racesObj = [
  {
    name: 'Human',
    flavorText:
      'Humans are versatile, adaptable, and ambitious. They can excel in any number of professions and forms of magic.',
    statBonuses: { strength: 1, dexterity: 1, vitality: 1 },
    traits: [
      {
        name: 'Adaptability',
        effect: 'Gain an extra stat point every 3 levels.',
        flavorText:
          'Humans adapt quickly to their surroundings, allowing them to develop diverse skills.',
      },
      {
        name: 'Diplomat',
        effect: 'Improves relations and prices with all NPCs.',
        flavorText:
          'Humans have a knack for negotiation, earning them favor in social interactions.',
      },
    ],
  },
  {
    name: 'Orc',
    flavorText:
      'Orcs are strong and fierce, known for their physical prowess and intimidating presence.',
    statBonuses: { strength: 2, vitality: 1 },
    traits: [
      {
        name: 'Berserk',
        effect: 'Increase physical damage under 50% health.',
        flavorText:
          'When Orcs are wounded, their rage fuels their strength, increasing their damage output.',
      },
      {
        name: 'War Cry',
        effect:
          'Temporarily intimidate enemies, reducing their attack efficiency.',
        flavorText:
          'The fearsome roar of an Orc can unnerve even the bravest foes.',
      },
    ],
  },
  {
    name: 'Dwarf',
    flavorText:
      'Dwarves are stout and hardy, excellent craftsmen and warriors, famous for their ability to withstand physical and magical attacks.',
    statBonuses: { strength: 1, vitality: 2 },
    traits: [
      {
        name: 'Sturdiness',
        effect: 'Reduces incoming damage by 10%.',
        flavorText:
          'The rugged nature of Dwarves grants them superior resilience.',
      },
      {
        name: 'Treasure Hunter',
        effect: 'Increases the chance to find rare items.',
        flavorText:
          'Dwarves have an uncanny ability to find hidden treasures and rare materials.',
      },
    ],
  },
  {
    name: 'Elf',
    flavorText:
      'Elves are graceful and intelligent, skilled with magic and archery, known for their keen senses and longevity.',
    statBonuses: { dexterity: 1, intellect: 2 },
    traits: [
      {
        name: 'Foresight',
        effect: 'Increases critical hit chance.',
        flavorText:
          'Elves possess an innate ability to anticipate enemy movements, granting them a higher chance to land critical strikes.',
      },
      {
        name: 'Elusive',
        effect: 'Adds a slight bonus to dodge chance.',
        flavorText:
          "Elves' nimble bodies allow them to evade attacks more easily.",
      },
    ],
  },
];

const classesObj = [
  {
    name: 'Warrior',
    flavorText:
      'Warriors are brave combatants that are unparalleled in melee combat and physical endurance.',
    statBonuses: { strength: 2, vitality: 2 },
    traits: [
      {
        name: 'Fortified Armor',
        effect: 'Permanently increases physical defense.',
        flavorText:
          'Years of battle have hardened the warrior, bolstering their defense against physical attacks.',
        levelRequirement: 5,
      },
      {
        name: 'Combat Regeneration',
        effect: 'Slowly regenerates health during combat.',
        flavorText:
          "The warrior's resilience allows them to recover health slowly throughout the battle.",
        levelRequirement: 10,
      },
      {
        name: 'Unyielding',
        effect: 'Decreases damage taken when health is below 50%.',
        flavorText:
          "In dire situations, a warrior's survival instincts reduce the incoming damage significantly.",
        levelRequirement: 15,
      },
    ],
  },
  {
    name: 'Mage',
    flavorText:
      'Mages wield arcane powers to cast powerful spells. They can decimate foes with a variety of magical attacks.',
    statBonuses: { intellect: 4 },
    traits: [
      {
        name: 'Mana Efficiency',
        effect: 'Reduces mana cost of all spells.',
        flavorText:
          'Through deep understanding of magical energies, the mage uses spells with reduced mana consumption.',
        levelRequirement: 5,
      },
      {
        name: 'Arcane Affinity',
        effect:
          'Increases effectiveness of all spells by enhancing their potency.',
        flavorText:
          "The mage's close bond with the arcane increases the potency of all their spells.",
        levelRequirement: 10,
      },
      {
        name: 'Elemental Resistance',
        effect: 'Reduces elemental damage taken from elemental sources.',
        flavorText:
          'Years of exposure to elemental forces have granted the mage resistance against them.',
        levelRequirement: 15,
      },
    ],
  },
  {
    name: 'Hunter',
    flavorText:
      'Hunters are masters of tracking and ranged combat, adept at using bows and traps to defeat their enemies from a distance.',
    statBonuses: { dexterity: 3, intellect: 1 },
    traits: [
      {
        name: 'Keen Senses',
        effect: 'Increases critical strike chance with ranged weapons.',
        flavorText:
          "The hunter's acute senses allow for precise targeting, increasing the likelihood of critical hits.",
        levelRequirement: 5,
      },
      {
        name: 'Camouflage',
        effect: 'Increases the chance to dodge attacks.',
        flavorText:
          'The hunter can blend seamlessly with their surroundings, making them harder to hit.',
        levelRequirement: 10,
      },
      {
        name: 'Enduring Tracker',
        effect: 'Increases stamina for prolonged chases.',
        flavorText:
          'Long hunts have conditioned the hunter, increasing their stamina for long pursuits.',
        levelRequirement: 15,
      },
    ],
  },
  {
    name: 'Bard',
    flavorText:
      'Bards are jacks-of-all-trades, skilled in a variety of tasks and quick to master any situation they are thrust into, always preparing for their next story.',
    statBonuses: { strength: 1, dexterity: 1, intellect: 1, luck: 1 },
    traits: [
      {
        name: 'Resourceful',
        effect: 'Finds extra resources and items from all sources.',
        flavorText:
          "The adventurer's knack for improvisation allows them to find more resources and items than usual.",
        levelRequirement: 5,
      },
      {
        name: "Minstrel's Recovery",
        effect: 'Reduces cooldowns on all skills.',
        flavorText:
          "The adventurer's quick wits allow them to recover from exertions faster, reducing the cooldowns of all skills.",
        levelRequirement: 10,
      },
      {
        name: 'Versatile',
        effect:
          'Improves effectiveness when using a different skill type than the previous skill.',
        flavorText:
          'Adventurers can easily adapt to different situations, improving their effectiveness with various weapons and skills.',
        levelRequirement: 15,
      },
    ],
  },
];

export function getCurrentLocation() {
  return getLocationById(db.currentLocation);
}

export function setCurrentLocationId(id) {
  db.currentLocation = id;
}
//our massive database for the game.
//item ids 0-999 are weapons, 1000-1999 are armor, 2000-2999 are jewelry, 3000-3999 are consumables, 4000-4999 are questItems, 5000-5999 are ammo, and 6000-6999 are misc items
export var db = {
  currentLocation: '3',
  characters: [],
  locations: gameLocations,
  enemies: enemyList,
  races: racesObj,
  classes: classesObj,
  npcs: [
    {
      id: 1,
      name: 'Edmund',
      type: 'blacksmith',
      locationId: 2,
      description: '',
      dialogue:
        'Welcome to my smithy, I sell arms and armor, let me know if you need anything.',
      options: [{ name: 'Shop' }],
      inventory: new customInventory(),
      skills: new skillBook(),
    },
    { id: 2, name: 'Healer', locationId: 2, role: 'Heals players' },
    { id: 3, name: '', locationId: 2, role: 'Gives quests' },
  ],
  items: {
    weapons: [
      new Weapon(
        0,
        'Sword',
        'A sturdy iron sword.',
        10,
        3,
        7,
        1,
        0.8,
        0.15,
        // 1,
        ['mainHand'],
        null,
        10
      ),
      new Weapon(
        1,
        'Staff',
        'A wooden staff imbued with magical properties.',
        15,
        2,
        4,
        0.8,
        0.9,
        0.1,
        // 1,
        ['mainHand', 'offHand'],
        { attribute: ['bonusMagicDmg'], value: [2] },
        20
      ),
      new Weapon(
        2,
        'Bow',
        'A long range bow.',
        12,
        3,
        6,
        0.7,
        0.85,
        0.3,
        // 1,
        ['mainHand', 'offHand'],
        null,
        20
      ),
      new Weapon(
        3,
        'Dagger',
        'A short but fast dagger.',
        7,
        2,
        5,
        1.25,
        0.95,
        0.4,
        // 1,
        ['mainHand'],
        null,
        8
      ),
      new Weapon(
        4,
        'Longsword',
        'A sharp and balanced longsword.',
        15,
        4,
        8,
        1,
        0.85,
        0.2,
        ['mainHand'],
        null,
        25
      ),
      new Weapon(
        5,
        'Battle Axe',
        'A heavy battle axe with a powerful swing.',
        20,
        5,
        10,
        0.7,
        0.75,
        0.3,
        ['mainHand', 'offHand'],
        null,
        30
      ),
      new Weapon(
        6,
        'War Hammer',
        'A massive hammer that deals devastating blows.',
        25,
        6,
        12,
        0.6,
        0.7,
        0.25,
        ['mainHand', 'offHand'],
        null,
        35
      ),
      new Weapon(
        7,
        'Crossbow',
        'A ranged weapon that fires bolts with precision.',
        18,
        4,
        8,
        0.9,
        0.9,
        0.3,
        ['mainHand', 'offHand'],
        null,
        40
      ),
      new Weapon(
        8,
        'Mace',
        'A blunt weapon designed to crush armor.',
        12,
        3,
        7,
        0.8,
        0.85,
        0.2,
        ['mainHand'],
        null,
        22
      ),
      new Weapon(
        9,
        'Rapier',
        'A thin, fast, and precise sword.',
        10,
        2,
        5,
        1.4,
        0.95,
        0.4,
        ['mainHand'],
        null,
        20
      ),
      new Weapon(
        10,
        'Greatsword',
        'A large sword that requires two hands to wield.',
        30,
        8,
        14,
        0.5,
        0.8,
        0.2,
        ['mainHand', 'offHand'],
        null,
        50
      ),
      new Weapon(
        11,
        'Shortbow',
        'A simple bow suitable for quick shots.',
        8,
        2,
        5,
        1.2,
        0.9,
        0.35,
        ['mainHand', 'offHand'],
        null,
        18
      ),
      new Weapon(
        12,
        'Magic Wand',
        'A wand that enhances magical attacks.',
        5,
        1,
        3,
        1.1,
        0.95,
        0.25,
        ['mainHand'],
        { attribute: ['bonusMagicDmg'], value: [3] },
        15
      ),
      new Weapon(
        13,
        'Throwing Knives',
        'A set of knives designed for throwing.',
        3,
        1,
        2,
        1.5,
        0.9,
        0.35,
        ['offHand'],
        null,
        10
      ),
    ],
    armor: [
      new Armor(
        1000,
        'Iron Helmet',
        'A sturdy iron helmet.',
        5,
        { defense: 2 },
        ['head'],
        15
      ),
      new Armor(
        1001,
        'Leather Armor',
        'Light armor made from toughened leather.',
        10,
        { defense: 3 },
        ['chest'],
        20
      ),
      new Armor(
        1002,
        'Chainmail',
        'Armor made of interlocking metal rings.',
        20,
        { defense: 5 },
        ['chest'],
        35
      ),
      new Armor(
        1003,
        'Steel Gauntlets',
        'Gauntlets forged from steel.',
        8,
        { defense: 2 },
        ['hands'],
        25
      ),
      new Armor(
        1004,
        'Plate Boots',
        'Heavy boots made from metal plates.',
        12,
        { defense: 3 },
        ['feet'],
        30
      ),
      new Armor(
        1005,
        'Mage Robes',
        'Robes that enhance magical abilities.',
        5,
        { bonusMagic: 2 },
        ['chest'],
        20
      ),
      new Armor(
        1006,
        'Hunter’s Cloak',
        'A cloak that provides camouflage.',
        3,
        { dodgeChance: 0.1 },
        ['back'],
        18
      ),
      new Armor(
        1007,
        'Knight’s Shield',
        'A large shield offering excellent protection.',
        15,
        { defense: 4 },
        ['offHand'],
        40
      ),
      new Armor(
        1008,
        'Dragon Scale Armor',
        'Armor made from the scales of a dragon.',
        25,
        { defense: 8 },
        ['chest'],
        100
      ),
      new Armor(
        1009,
        'Assassin’s Hood',
        'A hood that conceals the wearer’s identity.',
        2,
        { stealth: 2 },
        ['head'],
        25
      ),
    ],
    jewelry: [
      new Jewelry(
        2000,
        'Ring of Strength',
        'A ring that increases physical power.',
        0.1,
        { strength: 2 },
        ['finger'],
        50
      ),
      new Jewelry(
        2001,
        'Amulet of Wisdom',
        'An amulet that enhances intellect.',
        0.2,
        { intellect: 3 },
        ['neck'],
        60
      ),
      new Jewelry(
        2002,
        'Bracelet of Dexterity',
        'A bracelet that improves agility.',
        0.1,
        { dexterity: 2 },
        ['wrist'],
        45
      ),
      new Jewelry(
        2003,
        'Pendant of Vitality',
        'A pendant that boosts vitality.',
        0.3,
        { vitality: 3 },
        ['neck'],
        55
      ),
      new Jewelry(
        2004,
        'Ring of Protection',
        'A ring that provides a defensive bonus.',
        0.1,
        { defense: 2 },
        ['finger'],
        50
      ),
      new Jewelry(
        2005,
        'Charm of Luck',
        'A charm that increases luck.',
        0.05,
        { luck: 2 },
        ['neck'],
        40
      ),
      new Jewelry(
        2006,
        'Crown of Power',
        'A crown that grants significant power.',
        1,
        { strength: 4, intellect: 4 },
        ['head'],
        120
      ),
      new Jewelry(
        2008,
        'Belt of Fortitude',
        'A belt that increases endurance.',
        0.2,
        { vitality: 2 },
        ['waist'],
        45
      ),
      new Jewelry(
        2009,
        'Talisman of the Elements',
        'A talisman that provides elemental resistance.',
        0.3,
        { fireRes: 2, iceRes: 2 },
        ['neck'],
        70
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
  },
  scrollingTexts: [
    function (character) {
      return `Welcome ${
        character.name != null && character.name != ''
          ? character.name
          : 'Player'
      }! <br><br> ##TAB## You find yourself at the edge of the town of Elmere, a small town known for its hardworking folk and occasional traveler. In front of you is the ancient Forest of Eldarin, spanning as far as the eye can see with trees. ##BR## ##TAB## You feel the weight of your pack and the gear you've just acquired, each item a silent promise of the adventures to come. You take a deep breath, tasting the crisp air mingled with the scent of pine and ancient earth. ##BR## ##TAB## Behind you, the village market buzzes faintly, a last vestige of civilization at your back. Your journey begins here, at the crossroads of fate and destiny. ##BR## ##TAB## Will you delve into the shadowy depths of the forest to uncover its secrets, or tread the well-worn paths to seek allies and knowledge in Elmere? The choice is yours, brave soul. ##BR## ##TAB## Your adventure starts now...`;
    },
  ],
};

// Existing content...
// Additional code for character creation
export function createCharacter(
  name,
  race,
  charClass,
  stats = {
    strength: 5,
    dexterity: 5,
    vitality: 5,
    endurance: 5,
    intellect: 5,
    luck: 5,
  }
) {
  const newCharacter = {
    id: `c-${db.characters.length + 1}`,
    name: name,
    race: race,
    class: charClass,
    health: {
      current: Math.floor(10 + stats.vitality * 3),
      max: Math.floor(10 + stats.vitality * 3),
    },
    stamina: {
      current: Math.floor(10 + stats.endurance * 2 + stats.dexterity),
      max: Math.floor(10 + stats.endurance * 2 + stats.dexterity),
    },
    mana: {
      current: Math.floor(10 + stats.intellect * 5),
      max: Math.floor(10 + stats.intellect * 5),
    },
    level: 1,
    experience: { current: 0, max: 100 },
    inventory: new customInventory(),
    equipped: new customEquipment(),
    stats: stats,
    location: getCurrentLocation(),
    skillBook: new skillBook(),
  };
  db.characters.push(newCharacter);
  giveStarterItems();
  console.log('NEW CHARACTER');
  console.log(newCharacter);
  return newCharacter;
}

export function discoverLocation(id) {
  var fullId;

  if (id.length == 6 && id[0] === 'l') {
    fullId = id;
  } else {
    fullId = 'l-' + id.toString().padStart(4, '0');
  }
  let category = db.locations;

  for (let loc of category) {
    if (loc.id === fullId) {
      // Update discovered flag if it's the first visit
      if (!loc.discovered) {
        loc.discovered = true; // Set discovered to true
        // console.log(`Location ${loc.name} discovered!`);
      }
      return;
    }
  }
}

export function getCharacterById(id) {}

export function getLocationById(id) {
  var fullId;

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
}

export function getItemById(id) {
  // Determine the category based on the ID range
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
    return null; // If the ID does not fall within any expected range
  }

  // Generate the full ID
  const fullId = 'i-' + id.toString().padStart(8, '0');

  // Find and return the item with the matching ID within the determined category
  return category.find((item) => item.getId() === fullId) || null;
}

export function giveStarterItems() {
  if (db.characters.length == 1 && db.characters[0].inventory.length == 0) {
    // console.log('ADDING ITEMS');
    switch (db.characters[0].class) {
      case 'Warrior':
        db.characters[0].inventory.addItem(getItemById(0));
        break;
      // db.characters[0].inventory.addItem()
      case 'Mage':
        db.characters[0].inventory.addItem(getItemById(1));
        break;
      case 'Hunter':
        db.characters[0].inventory.addItem(getItemById(2));
        break;
      case 'Adventurer':
        db.characters[0].inventory.addItem(getItemById(3));
        break;
    }

    // db.characters[0].inventory.addItem(getItemById(4));
    // db.characters[0].inventory.addItem(getItemById(5));
    // db.characters[0].inventory.addItem(getItemById(6));
    // db.characters[0].inventory.addItem(getItemById(7));
    // db.characters[0].inventory.addItem(getItemById(8));
    // db.characters[0].inventory.addItem(getItemById(9));
    // db.characters[0].inventory.addItem(getItemById(10));
    // db.characters[0].inventory.addItem(getItemById(11));
    // db.characters[0].inventory.addItem(getItemById(12));
    // db.characters[0].inventory.addItem(getItemById(1000));
    // db.characters[0].inventory.addItem(getItemById(1001));
    // db.characters[0].inventory.addItem(getItemById(1002));
    // db.characters[0].inventory.addItem(getItemById(2000));
    // db.characters[0].inventory.addItem(getItemById(2001));

    db.characters[0].inventory.addItem(getItemById(3000), 3);
    db.characters[0].inventory.addItem(getItemById(3001), 3);
    db.characters[0].inventory.addItem(getItemById(3002), 3);

    // console.log('NEW PLAYER ITEMS ADDED');
    // console.log(db);
  }
}

export const races = db.races;
export const classes = db.classes;
