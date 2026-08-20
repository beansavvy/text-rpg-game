export const getCharacterById = (db: any, id: string) =>
  db.characters?.find((character: any) => character.id === id) ?? null;
