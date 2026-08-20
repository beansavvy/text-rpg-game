import { Skill, EnemySkill } from '@objects/skill';

export function generateSkills() {
  return [
    new Skill(
      0,
      ['Attack', 'Damage'],
      ['Basic'],
      'Basic Attack',
      'A basic attack, adapts to weapon.',
      null,
      1,
      null,
      null,
      'Enemy',
      1,
      null,
      0
    ),
    new Skill(
      1, // idNum
      ['Spell', 'Damage'], // type
      ['Fire'], //Element
      'Fire Spark', // name
      'Launch a small burst of fire at a single target, dealing minor fire damage.', // description
      { Intelligence: 5 }, // statReq
      1, // levelReq
      null, // gearReq
      [{ stat: ['Intellect'], effect: ['damage'], scale: [1.2], flat: [8] }], // Effect
      'Enemy', // targets
      1, // targetCount
      { resource: ['Mana'], type: ['flat'], value: [8] },
      3 // cooldown
    ),
    new Skill(
      2,
      ['Spell', 'Heal'],
      ['Nature'],
      'Healing Touch',
      'Restore a small amount of health to a single ally.',
      { Wisdom: 6 },
      2,
      null,
      [{ stat: ['Intellect'], effect: ['heal'], scale: [1.5], flat: [6] }],
      'Ally',
      1,
      { resource: ['Mana'], type: ['flat'], value: [10] },
      4
    ),
    new Skill(
      3,
      ['Spell', 'Damage'],
      ['Arcane'],
      'Arcane Bolt',
      'Fire a bolt of pure arcane energy at a target, piercing through armor.',
      { Intelligence: 8 },
      3,
      null,
      [{ stat: ['Intellect'], effect: ['damage'], scale: [1.0], flat: [6] }],
      'Enemy',
      1,
      { resource: ['Mana'], type: ['flat'], value: [5] },
      2
    ),
    new Skill(
      4,
      ['Spell', 'Buff'],
      ['Ice'],
      'Ice Shield',
      'Summon a protective shield of ice around an ally, absorbing damage.',
      { Intellect: 7 },
      4,
      null,
      [
        {
          stat: ['Intellect'],
          effect: ['absorb'],
          scale: [0.8],
          flat: [10],
        },
      ],
      'Ally',
      1,
      { resource: ['Mana'], type: ['flat'], value: [10] },
      5
    ),

    new Skill(
      5,
      ['Attack', 'Damage', 'Weapon'],
      ['Physical'],
      'Slash',
      'Perform a basic melee slash, dealing physical damage to a single enemy.',
      { Strength: 5 },
      1,
      'Melee Weapon',
      [
        {
          stat: ['Strength'],
          effect: ['damage'],
          scale: [1.2],
          variance: [1.1],
        },
      ],
      'Enemy',
      1,
      { resource: ['Stamina'], type: ['flat'], value: [10] },
      1
    ),

    new Skill(
      6,
      ['Attack', 'Damage', 'Debuff', 'Shield'],
      ['Physical'],
      'Shield Bash',
      'Bash an enemy with your shield, dealing minor damage and briefly stunning them.',
      { Strength: 6 },
      2,
      'Shield',
      [
        {
          stat: ['Strength'],
          effect: ['shield-damage'],
          scale: [0.8],
          variance: [1.1],
          status: [{ name: 'stun', target: ['Enemy'], duration: [1] }],
        },
      ], // Stun for 1 round
      'Enemy',
      1,
      3,
      { resource: ['Stamina'], type: ['flat'], value: [10] },
      3
    ),

    new Skill(
      7,
      ['Utility', 'Buff'],
      null,
      'Quick Feet',
      'Ready yourself for incoming attacks, increasing your chance to avoid attacks for 2 turns.',
      { Dexterity: 6 },
      1,
      null,
      [
        {
          status: [
            {
              name: 'evasion',
              stat: ['evadeChance'],
              target: ['Enemy'],
              value: [0.2],
              duration: [2],
            },
          ],
        },
      ],
      'Self',
      1,
      { resource: ['Stamina'], type: ['flat'], value: [5] },
      2
    ),
    new Skill(
      8,
      ['Attack', 'Damage', 'Weapon'],
      ['Physical'],
      'Power Strike',
      'Channel your strength into a single, powerful blow.',
      { Strength: 8 },
      3,
      'Melee Weapon',
      [
        {
          stat: ['Strength'],
          effect: ['damage'],
          scale: [1.5],
          bonusFlat: [5],
        },
      ],
      { damage: [15, 25] },
      'Enemy',
      1,
      { resource: ['Stamina'], type: ['flat'], value: [20] },
      3
    ),
    new Skill(
      9,
      ['Utility', 'Debuff'],
      null,
      'Taunt',
      'Taunt your enemy, reducing their chance to hit you.',
      { Constitution: 5 },
      1,
      'Shield',
      [],
      { aggro: 50 }, // +50% aggro
      'Enemy',
      10,
      3
    ),
    new Skill(
      10,
      ['Buff', 'Debuff'],
      null,
      'Enrage',
      'Enter a frenzy, increasing damage dealt for 3 turns but costs health.',
      { Strength: 7 },
      2,
      null,
      [
        {
          status: [
            {
              name: 'enrage',
              stat: ['damageAmp'],
              target: ['Enemy'],
              value: [1.2],
              duration: [3],
            },
          ],
        },
      ],
      'Self',
      1,
      { resource: ['Health'], type: ['percent'], value: ['20'] },
      5
    ),
    new EnemySkill(
      1000,
      ['Attack', 'Weapon'],
      ['Physical'],
      'Bite',
      'Bite the target, possibly causing internal wounds.',
      [
        { stat: ['Strength'], effect: ['damage'], scale: [1.1] },
        {
          status: [
            {
              name: 'bleed',
              stat: ['health'],
              target: ['Enemy'],
              value: [-2],
              duration: [2],
              chance: 0.25,
            },
          ],
        },
      ],
      'Enemy',
      '1',
      { resource: ['Stamina'], type: ['flat'], value: ['5'] },
      3
    ),
    new EnemySkill(
      1001,
      ['Attack', 'Weapon'],
      ['Physical'],
      'Swipe',
      'Swipe your claws at the target.',
      [{ stat: ['Strength'], effect: ['damage'], scale: [1.1] }],
      'Enemy',
      '1',
      { resource: ['Stamina'], type: ['flat'], value: ['2'] },
      1
    ),
  ];
}
