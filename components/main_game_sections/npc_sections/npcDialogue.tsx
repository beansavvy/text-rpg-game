import { useGameContext } from '@context/GameContext';
import Tooltip from '@components/tooltip';
import { useState } from 'react';

const NPCDialogue = ({ npcId }) => {
  const { db, getItemById, addItemToInventory } = useGameContext();
  const npcActive = db.npcs.find((npc) => npc.id === npcId);

  return (
    <table>
      <tr>
        <td></td>
      </tr>
    </table>
  );
};

export default NPCDialogue;
