export interface PartyState {
  memberIds: string[];

  gold: number;

  inventory: InventoryState;

  formation: {};
}

export interface InventoryState {
  items: Record<string, InventoryItemState>;
}

export interface InventoryItemState {
  id: string;
  itemId: string;
  quantity: number;
}
