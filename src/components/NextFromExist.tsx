import React, { useEffect } from "react";
import { ActualPal, sampleData } from "../consts/sample";
import { palData } from "../consts/pal";
import { PalInfo } from "../types/pal";
import { breedingFormula } from "../consts/breedingFormula";
import PalTableColumnLine from "./PalTableColumnLine";

import { CgClose } from "react-icons/cg";
import WorkIcon from "./WorkIcon";
import { workOption } from "../consts/work";
import PalDetail from "./PalDetail";

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

  const [combineList, setCombineList] = React.useState<CombinePalData[]>([]);
  const [calculateDepth, setCalculateDepth] = React.useState<number>(0);
  const [selectedPal, setSelectedPal] = React.useState<CombinePalData>();

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
          father: { ...malePal, uniqueId: malePalData?.id },
          mother: { ...femalePal, uniqueId: femalePalData?.id },
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
        {workOption.map((option) => (
          <PalTableColumnLine
            key={option.value}
            combineList={combineList}
            keyValue={option.value}
            keyLabel={option.label}
            onClick={(pal) => {
              setSelectedPal(pal);
            }}
          />
        ))}
      </div>

      {selectedPal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
          <div className="bg-white p-12 rounded-md relative flex flex-col items-center gap-2">
            <PalDetail pal={selectedPal} />

            <div
              className="absolute top-3 right-3 text-3xl"
              onClick={() => setSelectedPal(undefined)}
            >
              <CgClose />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
