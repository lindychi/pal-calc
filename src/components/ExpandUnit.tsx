import React from "react";
import { PalInfo } from "../types/pal";
import { palData } from "../consts/pal";

type Props = { pal: PalInfo };

export default function ExpandUnit({ pal }: Props) {
  const [expand, setExpand] = React.useState<boolean>(false);

  return (
    <div key={pal.id} onClick={() => setExpand((prev) => !prev)}>
      {pal.name} - {pal.rarity} - {pal.depth}
      {expand && (
        <div>
          {pal.formula?.map((formula) => (
            <div>
              {formula.parent1}.{" "}
              {palData.find((pal) => pal.id === formula.parent1.toString())
                ?.name ?? ""}{" "}
              + {formula.parent2}.{" "}
              {palData.find((pal) => pal.id === formula.parent2.toString())
                ?.name ?? ""}{" "}
            </div>
          ))}
        </div>
      )}
      <br />
    </div>
  );
}
