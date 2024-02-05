import { CombinePalData } from "../components/NextFromExist";
import { PassiveOption, passives } from "../consts/passives";

export const getPalWeight = (pal: CombinePalData, key: string) => {
  let defaultValue = pal[key as keyof CombinePalData] as number;
  let baseValue = 0;

  const options = pal.passives.map((passive) =>
    passives.find((p) => p.name === passive)
  );

  switch (key) {
    case "handCraft":
    case "mining":
    case "watering":
    case "transport":
    case "collection":
    case "seeding":
    case "emitFlame":
    case "deforest":
    case "generateElectricity":
    case "cool":
    case "productMedicine":
      defaultValue *= 20;
      baseValue = defaultValue * 4;
      break;
    case "moveSpeed":
      if (pal?.ridable !== true) {
        defaultValue = 10;
      }
      break;
    default:
  }

  return (
    baseValue +
    options.reduce((acc, passive) => {
      let targetOption = "";
      switch (key) {
        case "handCraft":
        case "mining":
        case "watering":
        case "transport":
        case "collection":
        case "seeding":
        case "emitFlame":
        case "deforest":
        case "generateElectricity":
        case "cool":
        case "productMedicine":
          targetOption = "workSpeed";
          break;
        case "moveSpeed":
          targetOption = "moveSpeed";
          break;
      }

      if (passive) {
        return acc * (passive.option[targetOption as keyof PassiveOption] ?? 1);
      }
      return acc;
    }, defaultValue)
  );
};
