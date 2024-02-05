import React, { useEffect } from "react";
import { ExistPalInfo, PalInfo } from "../types/pal";
import { palData } from "../consts/pal";
import { breedingFormula } from "../consts/breedingFormula";
import ExpandUnit from "./ExpandUnit";

type Props = {};

export default function MatchWithRarity({}: Props) {
  const [palList, setPalList] = React.useState<PalInfo[]>([]);
  const [id, setId] = React.useState<string>("");
  const [name, setName] = React.useState<string>("");
  const [resultList, setResultList] = React.useState<PalInfo[]>([]);

  const handleAddId = () => {
    if (!id) {
      alert("아이디를 입력해주세요.");
      return;
    }

    const result = palData.find((pal) => pal.id === id);
    if (result) {
      setPalList((prev) => [...prev, result]);
    } else {
      alert("해당하는 팰이 없습니다.");
    }
    setId("");
  };

  const handleAddName = () => {
    if (!name) {
      alert("이름을 입력해주세요.");
      return;
    }

    const result = palData.find((pal) => pal.name === name);
    if (result) {
      setPalList((prev) => [...prev, result]);
    } else {
      alert("해당하는 팰이 없습니다.");
    }
    setName("");
  };

  const listCheck = (palList: PalInfo[], depth: number): PalInfo[] => {
    const depthList: PalInfo[] = palList.map((item) => {
      if (item.depth) {
        return item;
      } else {
        return {
          ...item,
          depth,
        };
      }
    });

    let newList = [...depthList];

    depthList.forEach((parent1) => {
      depthList.forEach((parent2) => {
        if (parent1.id === parent2.id) {
          return;
        }

        const formula = breedingFormula.find(
          (formula) =>
            formula.parent1.toString() === parent1.id &&
            formula.parent2.toString() === parent2.id
        );

        if (!formula) {
          return;
        } else {
          const resultPalData = palData.find(
            (pal) => pal.id === formula.result.toString()
          );

          const existPalData = newList.find(
            (pal) => pal.id === formula.result.toString()
          );

          if (existPalData) {
            if (
              !existPalData.formula?.find(
                (item) =>
                  item.parent1.toString() === parent1.id &&
                  item.parent2.toString() === parent2.id
              )
            ) {
              newList = newList.map((item) => {
                if (item.id === formula.result.toString()) {
                  return {
                    ...item,
                    formula: [...(item?.formula ?? []), formula],
                  };
                } else {
                  return item;
                }
              });
            }
          } else {
            newList = [
              ...newList,
              { ...resultPalData, formula: [formula] } as PalInfo,
            ];
          }
        }
      });
    });

    if (newList.every((item) => item.depth)) {
      return newList;
    } else {
      return listCheck(newList, depth + 1);
    }
  };

  const handleChangeList = () => {
    setResultList(listCheck(palList, 0));
  };

  useEffect(() => {
    handleChangeList();
  }, [palList]);

  return (
    <div>
      MatchWithRarity
      <div>팰 추가하기</div>
      <div>
        아이디로 추가하기
        <input
          type="text"
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <button onClick={handleAddId}>추가</button>
      </div>
      <div>
        이름으로 추가하기
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button onClick={handleAddName}>추가</button>
      </div>
      <div>
        보유펠 리스트:{" "}
        {palList.map((pal, index) => (
          <>
            {","}
            <span key={pal.id}>{pal.name}</span>
          </>
        ))}
      </div>
      <div>
        {resultList
          .sort((a, b) => {
            if (a.rarity > b.rarity) {
              return -1;
            } else {
              return 1;
            }
          })
          .map((pal) => (
            <ExpandUnit pal={pal} />
          ))}
      </div>
    </div>
  );
}
