import { useState, useEffect } from "react";

import Page from "../components/Page";
import RankingEndless from "../components/RankingEndless";

import RankingSpeed from "../components/RankingSpeed";

export default function Records() {
  const [which, setWhich] = useState("endless");

  return (
    <Page title="ランキング">
      <div className="flex justify-end mt-2">
        <button
          className={`px-4 py-2 ${
            which === "endless"
              ? "bg-gray-300 border-2 border-black"
              : "bg-gray-200"
          }`}
          onClick={() => setWhich("endless")}
        >
          エンドレス
        </button>
        <button
          className={`px-4 py-2 ${
            which === "speed"
              ? "bg-gray-300 border-2 border-black"
              : "bg-gray-200"
          }`}
          onClick={() => setWhich("speed")}
        >
          スピード
        </button>
      </div>
      <div className="pt-4">
        {which == "endless" && <RankingEndless />}
        {which == "speed" && <RankingSpeed />}
      </div>
    </Page>
  );
}
