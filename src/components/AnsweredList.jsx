import React from "react";

import Overlay from "./Overlay";
import { getCandidates, randomSelect } from "../lib/functions";
import { STATION_DATA } from "../constant/station_names_hiragana.js";

const AnsweredList = ({ answers, onClose }) => {
  const candidatesForLastAnswer = randomSelect(
    getCandidates(answers.slice(-1)[0].answer, answers),
    4
  );

  return (
    <Overlay title="停車駅一覧" onClose={onClose}>
      <div className="mt-8 h-[21rem] border-y-2 py-2 overflow-y-scroll hidden-scrollbar">
        {answers
          .map((value) => value.answer)
          .map((value, i) => (
            <div key={i} className="flex flex-row font-bold my-0.5 px-1">
              <span key={i} className="inline-block w-8 text-center">
                {i === 0 ? "発" : i === answers.length - 1 ? "着" : i}
              </span>
              |<span className="inline-block w-2"></span>
              <div className="w-full">
                {value}
                <span className="text-black font-normal text-sm ml-2">
                  (
                  {STATION_DATA[value].map((station) => (
                    <a
                      key={station.title}
                      className="font-normal italic text-sm mx-0.5"
                      href={station.url}
                    >
                      {station.title},
                    </a>
                  ))}
                  )
                </span>
              </div>
            </div>
          ))}
      </div>
      <h3 className="mt-12">続きには...</h3>
      <ul>
        {candidatesForLastAnswer.length > 0 ? (
          candidatesForLastAnswer.map((value) => (
            <li className="mr-2 my-0.5" key={value}>
              {value}{" "}
              <a className="italic text-sm" href={STATION_DATA[value][0].url}>
                ({STATION_DATA[value][0].title})
              </a>
              ,
            </li>
          ))
        ) : (
          <li>回答可能な候補はありませんでした。</li>
        )}{" "}
      </ul>
    </Overlay>
  );
};

export default AnsweredList;
