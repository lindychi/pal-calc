export type ExistPalInfo = {
  id: number;
  passives: number[];
};

export type PalInfo = {
  id: string;
  name: string;
  emitFlame: number;
  watering: number;
  seeding: number;
  generateElectricity: number;
  handCraft: number;
  collection: number;
  deforest: number;
  mining: number;
  productMedicine: number;
  cool: number;
  transport: number;
  monsterFarm: number;
  ridable: boolean;
  type1: string;
  type2?: string;
  rarity: number;
  depth?: number;
  formula?: Formula[];
};

export type Formula = {
  parent1: number;
  parent2: number;
  result: number;
};
