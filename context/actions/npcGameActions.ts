import type { Dispatch, SetStateAction } from 'react';

interface NPCActionsDependencies {
  db: any;
  setNPCActive: Dispatch<SetStateAction<any>>;
}

export const createNPCActions = ({
  db,
  setNPCActive,
}: NPCActionsDependencies) => ({
  handleNPC: (npcId: any, action: any, pass: any = null) => {
    const npc =
      npcId != null ? db.npcs?.find((entry: any) => entry.id === npcId) : null;

    if (!npc) return `NPC with id ${npcId} not found.`;

    switch (action) {
      case 'talk':
        return npc.talk();

      case 'addItem':
        if (pass != null) npc.addItem(pass);
        return;

      case 'removeItem':
        if (pass != null) npc.removeItem(pass);
        return;

      case 'getInventory':
        return npc.getInventory();

      default:
        return;
    }
  },

  updateNPCActive: (npcId: any) => {
    setNPCActive(db.npcs?.find((npc: any) => npc.id === npcId) ?? null);
  },
});

export const populateNPCs = async (db: any) => {
  const npcInventories = [
    {
      id: 0,
      items: [
        [0],
        [2],
        [3],
        [4],
        [5],
        [6],
        [8],
        [9],
        [10],
        [13],
        [1008],
        [1009],
        [1010],
        [1011],
        [1012],
        [1013],
        [1014],
        [1015],
      ],
    },
  ];

  npcInventories.forEach((entry) => {
    const npc = db.npcs?.find((candidate: any) => candidate.id === entry.id);

    if (!npc?.inventory) {
      console.error(`NPC with ID ${entry.id} not found or has no inventory.`);
      return;
    }

    entry.items.forEach((item) => {
      const itemId = item[0];
      const quantity = item[1] || 1;

      npc.inventory.addItem(itemId, db, quantity);
    });
  });
};
