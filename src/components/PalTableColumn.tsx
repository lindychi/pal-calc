import React from "react";

import { getPalWeight } from "../libs/weight";

import { CombinePalData } from "./NextFromExist";

type Props = { pal: CombinePalData; keyValue: string };

export default function PalTableColumn({ pal, keyValue }: Props) {
  return (
    <div
      key={pal.id}
      className="flex flex-col items-center border rounded-lg p-2 gap-2"
    >
      <img
        src={`/palicon/${pal.uniqueId}.png`}
        alt={pal.engName}
        className="rounded-full w-14 h-14 border-gray-800 border-2"
      />
      {pal?.name}
      <br />
      교배 횟수:{pal.depth}
      <br />
      {getPalWeight(pal, keyValue)}
      <br />
      <div className="truncate w-[180px] h-[24px]">
        {pal.passives.join(", ")}
      </div>
      {/* {index < 10 && (
        <div>
          {pal.father && (
            <div>
              {pal.father?.name} {pal.father.gender}{" "}
              {pal.father.passives.join(", ")}
            </div>
          )}
          {pal.mother && (
            <div>
              {pal.mother?.name} {pal.mother.gender}{" "}
              {pal.mother.passives.join(", ")}
            </div>
          )}
        </div>
      )} */}
    </div>
  );
}
