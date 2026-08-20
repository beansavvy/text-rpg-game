import type { Dispatch, SetStateAction } from 'react';
import type { GameAction } from '../gameReducer';

interface PartyActionDependencies {
  db: any;
  setParty: Dispatch<SetStateAction<any>>;
  dispatchGame: Dispatch<GameAction>;
}

export const createPartyActions = ({ db, setParty, dispatchGame }: PartyActionDependencies) => ({
  addCharacterToParty: (characterId: string) => {
    setParty((prevParty: any) => {
      if (prevParty.members.some((member: any) => member.id === characterId)) {
        console.warn('Character already in party');
        return prevParty;
      }

      const character = db.characters?.find((char: any) => char.id === characterId);
      if (!character) {
        console.error('Character not found');
        return prevParty;
      }

      return { ...prevParty, members: [...prevParty.members, character] };
    });
  },

  removeCharacterFromParty: (characterId: string) => {
    if (characterId === '0') {
      alert('Cannot remove main character from party.');
      return;
    }

    setParty((prevParty: any) => ({
      ...prevParty,
      members: prevParty.members.filter((member: any) => member.id !== characterId),
    }));
  },

  updatePartyGold: (amount: number) => {
    dispatchGame({ type: 'UPDATE_PARTY_GOLD', amount });
  },
});
