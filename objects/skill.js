class Skill {
  constructor(
    idNum,
    type,
    element,
    name,
    description,
    statReq,
    levelReq,
    gearReq,
    effect,
    targets,
    targetCount,
    cost,
    cooldown = 0,
    attributes = null,
    bonusStats = null
  ) {
    this.id = idNum;
    this.type = type;
    this.element = element;
    this.name = name;
    this.description = description;
    this.statReq = statReq;
    this.levelReq = levelReq;
    this.gearReq = gearReq;
    this.effect = effect;
    this.attributes = attributes;
    this.targets = targets;
    this.targetCount = targetCount;
    this.cost = cost;
    this.cooldown = cooldown;
    this.bonusStats = bonusStats;
  }

  getId() {
    return this.id;
  }

  applyScaling(character, effect) {
    let result = this.attributes[effect] || 0;
    this.scaling.forEach((scale) => {
      const statValue = character.attributes[scale.stat] || 0;
      const effectIndex = scale.effect.indexOf(effect);
      if (effectIndex !== -1) {
        result += statValue * scale.scale[effectIndex];
      }
    });
    return result;
  }

  calculateDamage(stats, self) {
    const weaponStats = stats || {
      damage: { min: 0, maxDamage: 0 },
    };

    // console.log('THESE ARE THE SKILL WEAPONSTATS: ', weaponStats);
    const baseMinDamage = weaponStats.min || 0;
    const baseMaxDamage = weaponStats.max || 0;

    // const minDamage = baseMinDamage + this.applyScaling(character, 'damage');
    // const maxDamage = baseMaxDamage + this.applyScaling(character, 'damage');

    return Math.round(
      Math.random() * (baseMaxDamage - baseMinDamage) + baseMinDamage
    );
  }

  calculateHitChance(character) {
    const weapon = character.equippedWeapon || { hitChance: 0 };
    const baseHitChance = weapon.hitChance || 0;

    // return baseHitChance + this.applyScaling(character, 'hitChance');
    return baseHitChance;
  }

  calculateCritChance(character) {
    const weapon = character.equippedWeapon || { critChance: 0 };
    const baseCritChance = weapon.critChance || 0;

    // return baseCritChance + this.applyScaling(character, 'critChance');
    return baseCritChance;
  }
}

class EnemySkill extends Skill {
  constructor(
    idNum,
    type,
    element,
    name,
    description,
    effect,
    targets,
    targetCount,
    cost,
    cooldown = 0,
    bonusStats = null
  ) {
    super(
      idNum,
      type,
      element,
      name,
      description,
      null,
      null,
      null,
      effect,
      targets,
      targetCount,
      cost,
      cooldown,
      bonusStats
    );
  }
}

export { Skill, EnemySkill };
