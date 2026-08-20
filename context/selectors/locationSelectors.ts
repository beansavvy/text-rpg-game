export const normalizeLocationId = (id: string | number) => {
  const stringId = id.toString();

  if (stringId.startsWith('l-')) {
    return stringId;
  }

  return `l-${stringId.padStart(4, '0')}`;
};

export const getLocationById = (db: any, id: string | number | null | undefined) => {
  const fullId = normalizeLocationId(id ?? 0);
  return db.locations?.find((location: any) => location.id === fullId) ?? null;
};

export const getCurrentLocation = (db: any, currentLocationId: string) =>
  getLocationById(db, currentLocationId);
