export const getItemById = (db: any, id: number) => {
  let category;

  if (id >= 0 && id <= 999) category = db.items?.weapons;
  else if (id >= 1000 && id <= 1999) category = db.items?.armor;
  else if (id >= 2000 && id <= 2999) category = db.items?.jewelry;
  else if (id >= 3000 && id <= 3999) category = db.items?.consumable;
  else if (id >= 4000 && id <= 4999) category = db.items?.questItem;
  else if (id >= 5000 && id <= 5999) category = db.items?.ammo;
  else if (id >= 6000 && id <= 6999) category = db.items?.misc;
  else return null;

  const fullId = `i-${id.toString().padStart(8, '0')}`;
  return category?.find((item: any) => item.getId() === fullId) ?? null;
};
