import { useState } from "react";

import Overlay from "./Overlay";
import Button from "./Button";
import Alert from "./Alert";

import frame from "../icons/frame.svg";

import { getCandidates, randomSelect } from "../lib/functions";

import { ALERT_TIME } from "../constant/config";

const GameOver = ({ answers, restartGame, resetGame }) => {
  const [isListOpen, setIsListOpen] = useState(false);
  const [isShareAlertOpen, setIsShareAlertOpen] = useState(false);

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

  const shareResult = () => {
    navigator.clipboard.writeText(
      `#尻鉄 | 駅名しりとり \n
出発駅: ${answers[0].answer}
到着駅: ${answers.slice(-1)[0].answer}
記録　: ${answers.length - 1}駅 
タイム: ${total}秒\n
[url]`
    );
  };

  return (
    <>
      {isListOpen && (
        <Overlay title="通過駅一覧" onClose={onClose}>
          <div className="mt-8 h-[21rem] border-y-2 py-2 overflow-y-scroll">
            <p className="font-bold my-0 px-1">
              (<span className="inline-block w-10 text-center">発</span>)
              <span className="inline-block w-2"></span>
              {answers[0].answer}
            </p>
            {answers
              .map((value) => value.answer)
              .map((value, i) => (
                <p key={i} className="font-bold my-0 px-1">
                  (
                  <span key={i} className="inline-block w-10 text-center">
                    {i}
                  </span>
                  )<span className="inline-block w-2"></span>
                  {value}
                </p>
              ))
              .slice(1)}
          </div>
          <h3 className="mt-12">続きには...</h3>
          {nextHints.length > 0 ? (
            nextHints.map((value) => <span key={value}>{value}, </span>)
          ) : (
            <span>回答可能な候補はありませんでした。</span>
          )}
        </Overlay>
      )}
      <Alert
        message="クリップボードにコピーしました"
        isOpen={isShareAlertOpen}
      />
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
        <button
          className="mt-8 mb-6 border-2 border-black py-2 px-3 font-bold"
          onClick={() => {
            shareResult();
            setIsShareAlertOpen(true);
            setTimeout(() => {
              setIsShareAlertOpen(false);
            }, ALERT_TIME);
          }}
        >
          SHARE
        </button>
      </div>
    </>
  );
};

export default GameOver;
