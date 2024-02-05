import React, { useEffect } from "react";
import { ActualPal, sampleData } from "../consts/sample";
import { palData } from "../consts/pal";
import { PalInfo } from "../types/pal";
import { breedingFormula } from "../consts/breedingFormula";
import PalTableColumnLine from "./PalTableColumnLine";

export type CombinePalData = Omit<ActualPal, "gender"> &
  Omit<PalInfo, "id"> & {
    depth: number;
    gender?: string;
    id: number;
    father?: any;
    mother?: any;
    uniqueId?: string;
  };

type Props = {};

export default function NextFromExist({}: Props) {
  const defaultList = sampleData.map((item) => {
    const targetPalData: PalInfo =
      palData.find((pal) => pal.name === item.name) ?? ({} as PalInfo);
    return {
      ...targetPalData,
      ...item,
      depth: 0,
      uniqueId: targetPalData?.id,
    } as CombinePalData;
  });
  const [targetCombineCount, setTargetCombineCount] = React.useState<number>(1);
  const selectOption = [
    { value: "moveSpeed", label: "속도(탑승)" },
    { value: "handCraft", label: "수작업" },
    { value: "mining", label: "채굴" },
    { value: "watering", label: "관개" },
    { value: "transport", label: "운반" },
    { value: "collection", label: "채집" },
    { value: "seeding", label: "파종" },
    { value: "emitFlame", label: "불 피우기" },
    { value: "deforest", label: "벌목" },
    { value: "generateElectricity", label: "발전" },
    { value: "cool", label: "냉각" },
    { value: "productMedicine", label: "제약" },
  ];

  const [combineList, setCombineList] = React.useState<CombinePalData[]>([]);
  const [calculateDepth, setCalculateDepth] = React.useState<number>(0);

  const matchDepth = (defaultList: CombinePalData[]) => {
    const newCombineList: CombinePalData[] = [
      ...defaultList.sort(
        (a, b) => (a?.combiRank ?? 1500) - (b?.combiRank ?? 1500)
      ),
    ];

    const maleList = newCombineList
      .filter((item) => item.gender !== "여")
      .sort((a, b) => (a?.combiRank ?? 1500) - (b?.combiRank ?? 1500))
      .slice(0, 200);
    const femaleList = newCombineList
      .filter((item) => item.gender !== "남")
      .sort((a, b) => (a?.combiRank ?? 1500) - (b?.combiRank ?? 1500))
      .slice(0, 200);

    maleList.forEach((malePal) => {
      const malePalData = palData.find((pal) => pal.name === malePal.name);
      femaleList.forEach((femalePal) => {
        if (malePal.id === femalePal.id) {
          return;
        }

        const femalePalData = palData.find(
          (pal) => pal.name === femalePal.name
        );

        const formula = breedingFormula.find((formula) => {
          return (
            (formula.parent1 === Number(malePalData?.id) &&
              formula.parent2 === Number(femalePalData?.id)) ||
            (formula.parent1 === Number(femalePalData?.id) &&
              formula.parent2 === Number(malePalData?.id))
          );
        });
        if (!formula) {
          return;
        }

        const resultPalData = palData.find(
          (pal) => Number(pal.id) === formula?.result
        );
        if (!resultPalData?.name) {
          return;
        }

        newCombineList.push({
          ...resultPalData,
          depth: malePal.depth + femalePal.depth + 1,
          passives: Array.from(
            new Set([...malePal.passives, ...femalePal.passives])
          ),
          id: newCombineList.length + 1,
          uniqueId: resultPalData.id,
          father: malePal,
          mother: femalePal,
        } as CombinePalData);
      });
    });

    setCombineList(newCombineList);
  };

  useEffect(() => {
    if (targetCombineCount > calculateDepth) {
      matchDepth(combineList);
      setCalculateDepth(calculateDepth + 1);
    }
  }, [calculateDepth, targetCombineCount]);

  useEffect(() => {
    matchDepth(defaultList);
    setCalculateDepth(1);
  }, []);

  return (
    <div>
      <h1>
        목표 배합수:{" "}
        <input
          type="number"
          value={targetCombineCount}
          onChange={(e) => setTargetCombineCount(Number(e.target.value))}
        />
        진행 배합수: {calculateDepth}
      </h1>
      <div className="flex gap-2 items-center">
        {/* <div>
          수컷
          {maleList.map((pal) => (
            <div key={pal.id}>
              {pal.name} {pal.gender}
            </div>
          ))}
        </div>
        <div>
          암컷
          {femaleList.map((pal) => (
            <div key={pal.id}>
              {pal.name} {pal.gender}
            </div>
          ))}
        </div> */}
        {selectOption.map((option) => (
          <PalTableColumnLine
            combineList={combineList}
            keyValue={option.value}
            keyLabel={option.label}
          />
        ))}
      </div>
    </div>
  );
}
