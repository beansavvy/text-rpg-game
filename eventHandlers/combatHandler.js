// import { useGameContext } from '@context/GameContext';
import { Enemy } from '@objects/enemy';

export function handleUseSkill(
  skill,
  enemy,
  db,
  updatePlayerStats,
  updateEnemyStats,
  addEntry,
  updateCombatActive
) {
  if (!(enemy instanceof Enemy)) {
    enemy = Object.assign(Object.create(Enemy.prototype), enemy);
  }
  const player = db.characters[0];

  if (!enemy) {
    console.error('No enemy to attack!');
    return;
  }

  calculateDamage(skill, player, enemy, addEntry);

  // Handle enemy attack if still alive

  if (enemy.health.current > 0) {
    calculateDamage(null, enemy, player, addEntry);
  } else {
    const drops = enemy.handleDrops();
    addEntry(
      <span>
        {player.name} has defeated {enemy.name}!
      </span>
    );

    if (drops && drops.length > 0) {
      drops.forEach((drop) => {
        addEntry(
          <span>
            {enemy.name} drops {drop.type == 'item' ? drop.item.name : 'gold'}
            {'('}
            {drop.quantity}
            {')'}!
          </span>
        );
        if (drop.type == 'item') {
          console.log('DROP: ', drop);
          player.inventory.addItem(drop.item.id, db, drop.quantity);
          console.log(player.inventory);
        } else if (drop.type == 'gold') {
          player.gold += drop.quantity;
        }
      });
    }

    // console.log(player);
    updateCombatActive(0);
  }

  updatePlayerStats(player);
  updateEnemyStats(enemy);
}

function calculateDamage(skill, self, target, addEntry) {
  // Add logic to calculate damage based on skill and player's attributes
  // Calculate if the attack hits

  if (self.weaponStats) {
    var damageCalcs = {};
    if (skill.attributes != null) {
      damageCalcs = skill.attributes;
    } else {
      damageCalcs = self.weaponStats;
    }
    var hands = ['mainHand', 'offHand'];

    // console.log(damageCalcs);

    if (
      damageCalcs[hands[0]] != 'Empty' &&
      damageCalcs[[hands[1]]] == 'Empty'
    ) {
      hands = ['mainHand'];
    }

    hands.forEach((handKey) => {
      const hand = damageCalcs[handKey];
      // console.log('HAND: ', hand);
      if (!hand || hand == null) return; // Skip if the hand is not defined

      // console.log('HAND ', hand);
      var hitRoll = Math.random() * hand.hitChance;
      var dodgeChance = Math.max(0, target.evadeChance);

      if (self.hitChance < target.evadeChance) {
        hitRoll = Math.random();
        dodgeChance = 0.8;
      }

      // console.log('HIT REG: ' + hitRoll + ' - ' + dodgeChance);

      if (hitRoll > dodgeChance) {
        // Calculate damage based on skill
        let damage = skill.calculateDamage(hand.damage, self);

        // console.log('DAMAGE PRE-DR: ', damage);

        // Apply enemy's damage reduction (percentage first, then flat
        console.log('PRE-MIT DAMAGE: ' + damage);
        damage *= (1 - target.subStats.percentDR) / 100;
        if (skill.type && skill.type == 'physical') {
          damage -= target.subStats.defense;
        } else if (skill.type && skill.type == 'magic') {
          damage *= (1 - target.subStats.magicRes) / 100;
          damage -= target.subStats.magicDefense;
        }

        console.log('MIT DAMAGE: ' + damage);

        // Ensure damage is not negative
        damage = Math.round(Math.max(1, damage));

        // Apply damage to enemy
        // console.log(
        //   'ENEMY HEALTH: ' +
        //     target.health.current +
        //     ' - DAMAGE DEALT: ' +
        //     damage +
        //     ' - HIT ROLL: ' +
        //     hitRoll +
        //     ' - DODGE CHANCE: ' +
        //     dodgeChance
        // );

        target.health.current = Math.max(target.health.current - damage, 0);

        addEntry(
          <span>
            <span class="log-character-name"> {self.name}</span> hit{' '}
            {target.name} with {skill.name} for {damage} damage!
          </span>
        );
        if (target.health.current <= 0) {
        }

        // console.log('ENEMY HEALTH POST DAMAGE: ' + target.health.current);

        // Update enemy state
      } else {
        addEntry(
          <span>
            <span class="log-character-name"> {self.name} </span>missed{' '}
            {target.name} with {skill.name}!
          </span>
        );
      }
    });
  } else {
    var hitRoll = Math.random() * self.hitChance;
    var dodgeChance = Math.max(0, target.evadeChance);

    // console.log('HIT REG: ' + hitRoll + ' - ' + dodgeChance);
    // console.log('TEST DAMAGE DONE: ', self);

    if (self.hitChance < target.evadeChance) {
      hitRoll = Math.random();
      dodgeChance = 0.75;
    }

    if (hitRoll > dodgeChance) {
      // Calculate damage based on skill
      let damage = null;
      if (skill != null) {
        // console.log('SKILL EXISTS');
        damage = skill.calculateDamage(self.damage, self);
      } else {
        // console.log('SKILL DOES NOT EXIST');
        damage =
          Math.random() * (self.damage.max - self.damage.min) + self.damage.min;
      }

      // console.log('TEST DAMAGE: ', damage);

      // Apply enemy's damage reduction (percentage first, then flat)
      console.log('PRE-MIT DAMAGE: ' + damage);
      damage *= (1 - target.subStats.percentDR) / 100;
      if (skill.type && skill.type == 'physical') {
        damage -= target.subStats.defense;
      } else if (skill.type && skill.type == 'magic') {
        damage *= (1 - target.subStats.magicRes) / 100;
        damage -= target.subStats.magicDefense;
      }

      console.log('MIT DAMAGE: ' + damage);

      // Ensure damage is not negative
      damage = Math.round(Math.max(1, damage));

      // console.log('DAMAGE - HEALTH: ' + damage + ' - ' + target.health.current);

      target.health.current = Math.max(target.health.current - damage, 0);

      addEntry(
        <span>
          <span class="log-character-name"> {self.name}</span> hit {target.name}{' '}
          with {skill != null ? skill.name : 'Basic Attack'} for {damage}{' '}
          damage!
        </span>
      );
      if (target.health.current <= 0) {
      }

      // console.log('ENEMY HEALTH POST DAMAGE: ' + target.health.current);

      // Update enemy state
    } else {
      addEntry(
        <span>
          <span class="log-character-name"> {self.name} </span>missed{' '}
          {target.name} with {skill != null ? skill.name : 'Basic Attack'}!
        </span>
      );
    }
  }
}

function logCustomMethods(obj) {
  if (!obj) {
    console.log('Object is null or undefined');
    return;
  }

  // Log the type of the object
  console.log(
    'Object Type:',
    obj.constructor ? obj.constructor.name : typeof obj
  );

  let properties = new Set();
  let currentObj = obj;

  // Traverse the prototype chain
  while (currentObj) {
    Object.getOwnPropertyNames(currentObj).forEach((item) =>
      properties.add(item)
    );
    currentObj = Object.getPrototypeOf(currentObj);
  }

  // Filter properties to get only methods
  const methods = Array.from(properties).filter((property) => {
    return (
      typeof obj[property] === 'function' &&
      !Object.prototype.hasOwnProperty.call(Object.prototype, property) &&
      !Object.prototype.hasOwnProperty.call(Array.prototype, property)
    );
  });

  console.log('Custom Methods:', methods);
}

function calculateEnemyDamage(enemy) {
  // Add logic to calculate enemy's damage
  return getRandomInt(enemy.attackDamage.min, enemy.attackDamage.max);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
