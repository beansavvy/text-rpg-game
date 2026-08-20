import { customInventory } from '@objects/customInventory';
import { NPC } from '@objects/npc';

export function generateNPCs(items) {
  return [
    new NPC(
      0,
      'Edmund',
      'blacksmith',
      2,
      '',
      'Welcome to my smithy, I sell arms and armor, let me know if you need anything.',
      [
        { name: 'Shop', type: '' },
        { name: 'Speak', questList: [] },
      ],
      new customInventory()
    ),
    new NPC(
      1,
      'Hammond',
      'innkeeper',
      2,
      '',
      'Welcome to the Elmere Inn, I am the innkeeper, Hammond.',
      [{ name: 'Rest' }, { name: 'Speak', questList: [0, 1] }]
    ),
    new NPC(2, 'Arland', 'Mage Trainer', 2, '', 'What do you want...', [
      { name: 'Learn Skills', skillIds: [0, 2, 4, 6] },
      { name: 'Speak', questList: [5, 25] },
    ]),
    new NPC(
      3,
      'Quest Giver',
      '',
      2,
      '',
      'I have a task for you, if you are willing.',
      []
    ),
  ];
}

function addNPCItems(addItemsArr) {
  const tempInv = new customInventory();

  for (const entry of addItemsArr) {
    const itemId = entry[0];
    const quantity = entry[1] !== undefined ? entry[1] : 1;
    if (itemId) {
      tempInv.addItem(itemId);
    }
  }
  // console.log('TEMP INV: ', tempInv);

  return tempInv;
}
