import type { Dispatch, SetStateAction } from 'react';
import { Enemy } from '@objects/enemy';
import { getCurrentLocation } from '../selectors/locationSelectors';

interface CombatActionsDependencies {
  db: any;
  currentLocationId: string;
  setEnemy: Dispatch<SetStateAction<any>>;
  setCombatActive: Dispatch<SetStateAction<number>>;
}

export const createCombatActions = ({
  db,
  currentLocationId,
  setEnemy,
  setCombatActive,
}: CombatActionsDependencies) => ({
  updateEnemyStats: (newStats: any) => {
    setEnemy((prevEnemy: any) => {
      if (prevEnemy instanceof Enemy) {
        return Object.assign(
          Object.create(Object.getPrototypeOf(prevEnemy)),
          prevEnemy,
          newStats
        );
      }
      return { ...prevEnemy, ...newStats };
    });
  },

  updateCombatActive: (active: number) => {
    setCombatActive(active);
    if (active === 0 || active === 2) {
      setEnemy(null);
    }
  },

  generateEnemy: () => {
    const location = getCurrentLocation(db, currentLocationId);
    if (!location?.enemyInfo?.enemies?.length) return;

    const enemies = location.enemyInfo.enemies
      .slice()
      .sort((a: any, b: any) => a.rarity - b.rarity);

    const weights = enemies.map((enemy: any) => enemy.rarity);
    const totalWeight = weights.reduce((sum: number, weight: number) => sum + weight, 0);
    const randomValue = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < enemies.length; i++) {
      cumulativeWeight += weights[i];
      if (randomValue <= cumulativeWeight) {
        setEnemy(enemies[i].mob.clone());
        return;
      }
    }

    setEnemy(enemies[0].mob.clone());
  },
});
