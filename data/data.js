import { races, classes } from './splitFiles/characterOptions';
import { generateItems } from './splitFiles/items';
import { generateSkills } from './splitFiles/skills';
import { generateEnemies } from './splitFiles/enemies';
import { generateNPCs } from './splitFiles/npcs';
import { generateGameLocations } from './splitFiles/locations';
import { generateScrollingText } from './splitFiles/scrollingTexts';
import { generateQuests } from './splitFiles/quests';

/**
 * Builds a fresh runtime database.
 *
 * Keep this function as the public database API. Existing components can
 * continue importing populateDB from @data/data without knowing how the data
 * is organized internally.
 */
export function populateDB() {
  const skills = generateSkills();
  const items = generateItems();
  const enemies = generateEnemies(items, skills);
  const npcs = generateNPCs(items);

  return {
    currentLocation: '3',
    characters: [],
    skills,
    items,
    enemies,
    npcs,
    locations: generateGameLocations(enemies, npcs),
    scrollingTexts: generateScrollingText(),
    quests: generateQuests(),
    races,
    classes,
  };
}
