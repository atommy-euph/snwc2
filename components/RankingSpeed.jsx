import React from "react";
import { useState, useEffect } from "react";

import { LOCAL_STORAGE_KEY_SPEED } from "../constant/config_speed";

const RankingSpeed = () => {
  const [recordsSpeed, setRecordsSpeed] = useState([]);
  // get records from local storage and set to records state
  useEffect(() => {
    const recordsSpeed = localStorage.getItem(LOCAL_STORAGE_KEY_SPEED);
    if (recordsSpeed) {
      setRecordsSpeed(JSON.parse(recordsSpeed));
    } else {
      setRecordsSpeed([]);
    }
  }, []);
  return (
    <div className="mt-4 h-[21rem] border-t-2 py-2 overflow-y-scroll hidden-scrollbar">
      <h2 className="mt-4 mb-2">スピード</h2>
      <div className="flex items-center mb-1">
        <span className="font-bold text-lg  mr-5  w-8 h-8 "></span>
        <span className="w-10 mr-3 text-right font-bold"> 記録</span>
        <span className="w-14 mr-3 text-right font-bold">文字数</span>
        <span className="w-24 mr-3 text-right font-bold">日付</span>
        <span className="w-24 mr-3 text-right font-bold">出発駅</span>
        <span className="w-24 text-right font-bold">終着駅</span>
      </div>
      {recordsSpeed
        .sort((a, b) => {
          if (a.count === b.count) {
            return b.letter - b.letter;
          }
          return b.count - a.count;
        })
        .map((record, index) => (
          <div className="flex items-center mb-3" key={index}>
            <span className="font-bold text-lg mr-5 border-2 border-black w-8 h-8 text-center">
              {index + 1}
            </span>
            <span className="w-10 mr-3 text-right"> {record.count} 駅</span>
            <span className="w-14 mr-3 text-right">{record.letter} 字</span>
            <span className="w-24 mr-3 text-right">
              {record.date.slice(0, 10).replaceAll("-", "/")}
            </span>
            <span className="inline-block whitespace-nowrap w-24 mr-3 text-right overflow-x-scroll hidden-scrollbar">
              {record.start}
            </span>
            <span className="inline-block whitespace-nowrap w-24 text-right overflow-x-scroll hidden-scrollbar">
              {record.end}
            </span>
          </div>
        ))
        .slice(0, 5)}
    </div>
  );
};

export default RankingSpeed;
