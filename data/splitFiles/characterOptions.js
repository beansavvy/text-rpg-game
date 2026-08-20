// Character creation data. Kept as plain objects because no runtime class behavior is required.

export const races = [
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

export const classes = [
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
