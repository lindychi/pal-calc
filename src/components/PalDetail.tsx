import React, { useEffect, useState } from "react";
import { CombinePalData } from "./NextFromExist";
import { workOption } from "../consts/work";
import WorkIcon from "./WorkIcon";
import clsx from "clsx";

type NameValue = {
  name: string;
  value: string;
};

type Props = { pal: CombinePalData };

export default function PalDetail({ pal }: Props) {
  const [workList, setWorkList] = useState<NameValue[]>([]);

  useEffect(() => {
    const workList: NameValue[] = [];

    workOption.forEach((option) => {
      if (
        !pal[option.value as keyof CombinePalData] ||
        option.value === "moveSpeed"
      ) {
        return null;
      } else {
        workList.push({
          name: option.value,
          value: pal[option.value as keyof CombinePalData],
        });
      }
    });

    setWorkList(workList);
  }, [pal]);

  return (
    <div className="flex flex-col items-center min-w-[200px]">
      <img
        src={`/palicon/${pal?.uniqueId}.png`}
        alt={pal?.engName}
        className="rounded-full w-14 h-14 border-gray-800 border-2"
      />
      {pal?.name}

      <div>
        <h1>특성</h1>
        <div className="flex gap-2">
          {pal.passives.map((passive) => (
            <span key={passive}>{passive}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1>작업 능력</h1>
        <div
          className={clsx([
            "flex",
            {
              "gap-2": workList.length > 1,
            },
          ])}
        >
          {workList.map((work) => (
            <div key={work.name} className="flex items-center">
              <WorkIcon type={work.name} />
              {work.value}
            </div>
          ))}
        </div>
      </div>

      {pal.father && pal.mother && (
        <div>
          <div className="flex">
            <div>부{pal.father && <PalDetail pal={pal.father} />}</div>
            <div>모{pal.mother && <PalDetail pal={pal.mother} />}</div>
          </div>
        </div>
      )}
    </div>
  );
}
