import { Skill } from '@objects/skill';

export class skillBook {
  constructor() {
    this.skills = [];
  }

  get length() {
    return this.skills.length;
  }

  // Custom iterator for iterating over items in inventory
  *[Symbol.iterator]() {
    for (let skill of this.skills) {
      yield skills;
    }
  }

  // Override toString method to return the items array
  toString() {
    return this.skills;
  }
}
