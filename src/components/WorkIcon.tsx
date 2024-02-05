import React from "react";

import collection from "../assets/workIcon/collection.png";
import handCraft from "../assets/workIcon/handCraft.png";
import mining from "../assets/workIcon/mining.png";
import watering from "../assets/workIcon/watering.png";
import transport from "../assets/workIcon/transport.png";
import seeding from "../assets/workIcon/seeding.png";
import emitFlame from "../assets/workIcon/emitFlame.png";
import deforest from "../assets/workIcon/deforest.png";
import generateElectricity from "../assets/workIcon/generateElectricity.png";
import cool from "../assets/workIcon/cool.png";
import productMedicine from "../assets/workIcon/productMedicine.png";

type Props = { type: string };

export default function WorkIcon({ type }: Props) {
  const getSource = (type: string) => {
    switch (type) {
      case "collection":
        return collection;
      case "handCraft":
        return handCraft;
      case "mining":
        return mining;
      case "watering":
        return watering;
      case "transport":
        return transport;
      case "collection":
        return collection;
      case "seeding":
        return seeding;
      case "emitFlame":
        return emitFlame;
      case "deforest":
        return deforest;
      case "generateElectricity":
        return generateElectricity;
      case "cool":
        return cool;
      case "productMedicine":
        return productMedicine;
      default:
        return "";
    }
  };

  if (getSource(type)) {
    return <img src={getSource(type)} alt={type} className="w-6 h-6" />;
  } else {
    return null;
  }
}
