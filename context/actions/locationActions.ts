import type { Dispatch, SetStateAction } from 'react';
import type { GameAction } from '../gameReducer';
import { normalizeLocationId } from '../selectors/locationSelectors';

interface LocationActionDependencies {
  dispatchGame: Dispatch<GameAction>;
  setCurrentScreen: Dispatch<SetStateAction<string>>;
}

export const createLocationActions = ({
  dispatchGame,
  setCurrentScreen,
}: LocationActionDependencies) => ({
  setNewCurrentLocation: (newState: string) => setCurrentScreen(newState),

  setCurrentLocationId: (id: string) => {
    dispatchGame({
      type: 'SET_CURRENT_LOCATION',
      locationId: normalizeLocationId(id),
    });
  },

  discoverLocation: (id: string) => {
    dispatchGame({
      type: 'DISCOVER_LOCATION',
      locationId: normalizeLocationId(id),
    });
  },
});
