import React from "react";
import { useState, useEffect } from "react";

import { LOCAL_STORAGE_KEY_ENDLESS } from "../constant/config_endless";

const RankingEndless = () => {
  const [recordsEndless, setRecordsEndless] = useState([]);
  // get records from local storage and set to records state
  useEffect(() => {
    const recordsEndless = localStorage.getItem(LOCAL_STORAGE_KEY_ENDLESS);
    if (recordsEndless) {
      setRecordsEndless(JSON.parse(recordsEndless));
    } else {
      setRecordsEndless([]);
    }
  }, []);
  return (
    <div className="mt-4 h-[21rem] border-t-2 py-2 overflow-y-scroll hidden-scrollbar">
      <h2 className="mt-4 mb-2">エンドレス</h2>
      <div className="flex items-center mb-1">
        <span className="font-bold text-lg  mr-8  w-8 h-8 "></span>
        <span className="w-10  mr-3 text-right font-bold"> 記録</span>
        <span className="w-14  mr-3 text-right font-bold">タイム</span>
        <span className="w-24 text-right font-bold">日付</span>
      </div>
      {recordsEndless
        .sort((a, b) => {
          if (a.count === b.count) {
            return a.time - b.time;
          }
          return b.count - a.count;
        })
        .map((record, index) => (
          <div className="flex items-center mb-3" key={index}>
            <span className="font-bold text-lg mr-8 border-2 border-black w-8 h-8 text-center">
              {index + 1}
            </span>
            <span className="w-10  mr-3 text-right"> {record.count} 駅</span>
            <span className="w-14  mr-3 text-right">{record.time} 秒</span>
            <span className="w-24 text-right">
              {record.date.slice(0, 10).replaceAll("-", "/")}
            </span>
          </div>
        ))
        .slice(0, 5)}
    </div>
  );
};

export default RankingEndless;
