import { useState } from "react";

import Overlay from "./Overlay";
import Button from "./Button";

import frame from "../icons/frame.svg";

import { getCandidates, randomSelect } from "../lib/functions";

const GameOver = ({ answers, restartGame, resetGame }) => {
  const [isListOpen, setIsListOpen] = useState(false);

  const total = answers
    .map((value) => value.time)
    .reduce((sum, element) => {
      return sum + element;
    }, 0);
  const candidates = getCandidates(answers.slice(-1)[0].answer, answers);
  const nextHints = randomSelect(candidates, 4);

  const onClose = () => {
    setIsListOpen(false);
  };

  return (
    <>
      {isListOpen && (
        <Overlay title="通過駅一覧" onClose={onClose}>
          <ul className="mt-8">
            <li className="font-bold">(出発駅) {answers[0].answer}</li>
            {answers
              .map((value) => value.answer)
              .map((value, i) => (
                <li className="font-bold" key={value}>
                  ({i}) {value}
                </li>
              ))
              .slice(1)}
          </ul>
          <h3 className="mt-10">続きには...</h3>
          {candidates.length > 0 ? (
            nextHints.map((value) => <span>{value}, </span>)
          ) : (
            <span>回答可能な候補はありませんでした。</span>
          )}
        </Overlay>
      )}
      <div className="flex flex-col items-center w-full">
        <h2 className="text-4xl mt-16 mb-12">Game Over</h2>
        <div className="relative w-72 h-80 pl-6 py-6 z-0">
          <img
            className="absolute top-0 left-0 mx-auto w-72 z-0"
            src={frame}
            alt="frame"
          />
          <span className="text-xl">記録</span>
          <p className="text-center">
            <span className="text-6xl pl-1">{answers.length - 1}</span>
            <span className="text-xl"> 駅 </span>
          </p>
          <span className="text-xl">タイム</span>
          <p className="text-center">
            <span className="text-6xl pl-1">{total}</span>
            <span className="text-xl"> 秒 </span>
          </p>
        </div>
        <button
          className="mb-8 underline"
          onClick={() => {
            setIsListOpen(true);
          }}
        >
          通過駅一覧
        </button>
        <Button value="リスタート" keybind="Space" onClick={restartGame} />
        <Button value="トップへ戻る" keybind="Espape" onClick={resetGame} />
      </div>
    </>
  );
};

export default GameOver;
