import React from "react";

import Overlay from "./Overlay";
import RankingEndless from "./RankingEndless.jsx";
import RankingSpeed from "./RankingSpeed.jsx";

const Ranking = ({ mode, onClose }) => {
  return (
    <Overlay title="ランキング" onClose={onClose}>
      {mode === "endless" && <RankingEndless />}
      {mode === "speed" && <RankingSpeed />}
    </Overlay>
  );
};

export default Ranking;
