class Item {
  constructor(
    idNum,
    type,
    name,
    description,
    weight,
    value = 0,
    attributes = null
  ) {
    this.type = type;
    this.name = name;
    this.description = description;
    this.weight = weight;
    this.attributes = attributes;
    this.value = value;
    this.id = 'i-' + (idNum++).toString().padStart(8, '0');
    this.discovered = false;
  }

  getId() {
    return this.id;
  }
}

class Weapon extends Item {
  constructor(
    idNum,
    name,
    description,
    weight,
    value = 0,
    minDamage,
    maxDamage,
    attackSpeed,
    hitChance,
    critChance,
    // range,
    slot,
    attributes = null,
    levelReq = 1,
    attributeReq = null
  ) {
    super(idNum, 'Weapon', name, description, weight, value, attributes);
    this.minDamage = minDamage;
    this.maxDamage = maxDamage;
    this.attackSpeed = attackSpeed;
    this.hitChance = hitChance;
    this.critChance = critChance;
    // this.range = range;
    this.slot = slot;
    this.levelReq = levelReq;
    this.attributeReq = attributeReq;
  }
}

class Armor extends Item {
  constructor(
    idNum,
    name,
    description,
    weight,
    value = 0,
    attributes,
    slot,
    levelReq = 1,
    attributeReq = null
  ) {
    super(idNum, 'Armor', name, description, weight, value, attributes);
    this.slot = slot;
    this.levelReq = levelReq;
    this.attributeReq = attributeReq;
  }
}

class Jewelry extends Item {
  constructor(
    idNum,
    name,
    description,
    weight,
    value = 0,
    attributes,
    slot,
    levelReq = 1,
    attributeReq = null
  ) {
    super(idNum, 'Jewelry', name, description, weight, value);
    this.attributes = attributes;
    this.slot = slot;
    this.levelReq = levelReq;
    this.attributeReq = attributeReq;
  }
}

class Consumable extends Item {
  constructor(
    idNum,
    name,
    description,
    weight,
    value = 0,
    stat,
    statAmount,
    levelReq = 1,
    attributeReq = null
  ) {
    super(idNum, 'Consumable', name, description, weight, value, null);
    this.stat = stat;
    this.statAmount = statAmount;
    this.levelReq = levelReq;
    this.attributeReq = attributeReq;
  }
}

export { Item, Weapon, Armor, Jewelry, Consumable };
