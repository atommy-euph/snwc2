import { useState, useEffect } from "react";

import Page from "../components/Page";
import RankingEndless from "../components/RankingEndless";

import { LOCAL_STORAGE_KEY_ENDLESS } from "../constant/config_endless";
import { LOCAL_STORAGE_KEY_SPEED } from "../constant/config_speed";
import RankingSpeed from "../components/RankingSpeed";

export default function Records() {
  const [recordsSpeed, setRecordsSpeed] = useState([]);

  useEffect(() => {
    const recordsSpeed = localStorage.getItem(LOCAL_STORAGE_KEY_SPEED);
    if (recordsSpeed) {
      setRecordsSpeed(JSON.parse(recordsSpeed));
    } else {
      setRecordsSpeed([]);
    }
  }, []);

  return (
    <Page title="ランキング">
      <div className="pt-4">
        <RankingEndless />
        <RankingSpeed />
      </div>
    </Page>
  );
}
