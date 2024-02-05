import React from "react";
import { getPalWeight } from "../libs/weight";
import { CombinePalData } from "./NextFromExist";
import PalTableColumn from "./PalTableColumn";
import WorkIcon from "./WorkIcon";

type Props = {
  combineList: CombinePalData[];
  keyValue: string;
  keyLabel: string;
};

export default function PalTableColumnLine({
  combineList,
  keyValue,
  keyLabel,
}: Props) {
  return (
    <div className="w-[200px]">
      <div className="flex items-center justify-center">
        <WorkIcon type={keyValue} />
        {keyLabel}
      </div>
      {combineList
        .sort((a: CombinePalData, b: CombinePalData) => {
          const aValue = getPalWeight(a, keyValue);
          const bValue = getPalWeight(b, keyValue);

          return bValue - aValue;
        })
        .slice(0, 10)
        .map((pal, index) => (
          <PalTableColumn key={pal.id} pal={pal} keyValue={keyValue} />
        ))}
    </div>
  );
}
