import { useState } from "react";
import "./App.css";

import Notice from "./components/Alert";
import Start from "./components/Start";
import {
  isValidLetters,
  isIncludedInStations,
  isAnswered,
  endsWithValidLetter,
  startsWithValidLetter,
  getSameGroup,
  getFirstStation,
  getLastLetter,
} from "./lib/functions";

import { ALERT_TIME } from "./constant/config.js";
import Alert from "./components/Alert";

function App() {
  const [isGameStart, setIsGameStart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState(() => [getFirstStation()]);

  const [isEmptyAlertOpen, setIsEmptyAlertOpen] = useState(false);
  const [isInvalidLetterAlertOpen, setIsInvalidLetterAlertOpen] =
    useState(false);
  const [isNoExistenceAlertOpen, setIsNoExistenceAlertOpen] = useState(false);
  const [isNoMatchAlertOpen, setIsNoMatchAlertOpen] = useState(false);

  const handleAnswer = () => {
    if (!answer) {
      setAnswer("");
      setIsEmptyAlertOpen(true);
      setTimeout(() => {
        setIsEmptyAlertOpen(false);
      }, ALERT_TIME);
      return;
    }
    if (!isValidLetters(answer)) {
      setAnswer("");
      setIsInvalidLetterAlertOpen(true);
      setTimeout(() => {
        setIsInvalidLetterAlertOpen(false);
      }, ALERT_TIME);
      return;
    }
    if (!isIncludedInStations(answer)) {
      setAnswer("");
      setIsNoExistenceAlertOpen(true);
      setTimeout(() => {
        setIsNoExistenceAlertOpen(false);
      }, ALERT_TIME);
      return;
    }
    console.log("validLetters");
    if (!startsWithValidLetter(answer, answers)) {
      setAnswer("");
      setIsNoMatchAlertOpen(true);
      setTimeout(() => {
        setIsNoMatchAlertOpen(false);
      }, ALERT_TIME);
      return;
    }
    if (isAnswered(answer, answers)) {
      setIsGameOver(true);
      return;
    }
    if (!endsWithValidLetter(answer, answers)) {
      setIsGameOver(true);
      return;
    }

    setAnswers(answers.concat(answer));
    setAnswer("");
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAnswer();
    }
  };

  const handleGameStart = () => {
    setIsGameStart(true);
  };

  const restartGame = () => {
    console.log("restarted the game");
    setAnswers([getFirstStation()]);
    setAnswer("");
    setIsGameStart(true);
    setIsGameOver(false);
  };

  return (
    <div className="App container h-screen py-4">
      {/* Alerts */}
      <div className="flex justify-center">
        <Alert
          message="駅名を入力してください"
          type="WARNING"
          isOpen={isEmptyAlertOpen}
        />
        <Alert
          message="駅名に使われない文字が含まれています"
          type="WARNING"
          isOpen={isInvalidLetterAlertOpen}
        />
        <Alert
          message="その駅は存在しません"
          type="WARNING"
          isOpen={isNoExistenceAlertOpen}
        />
        <Alert
          message={`「${getSameGroup(
            getLastLetter(answers[answers.length - 1])
          )}」から始まる駅名を入力してください`}
          type="WARNING"
          isOpen={isNoMatchAlertOpen}
        />
      </div>
      <h1 className="mt-4 text-3xl font-bold">駅名しりとり</h1>
      {/* display if the game doesn't start */}
      {!(isGameStart || isGameOver) && (
        <Start handleGameStart={handleGameStart} isGameStart={isGameStart} />
      )}
      {/* display if the game starts */}
      {isGameStart && !isGameOver && (
        <>
          <div className="mt-10">
            <p className="text-6xl">
              {/* {`${getSameGroup(getLastLetter(answers[answers.length - 1]))}`} */}
              {getSameGroup(getLastLetter(answers[answers.length - 1]))}
            </p>
            <p>から始まる駅名を入力</p>
          </div>
          <Notice text={"asfsafd"} level={"INFO"} />
          <div className="mt-10">
            <input
              className="border-2"
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              onKeyDown={handleEnter}
            />
            <button className="border-2 ml-2" onClick={handleAnswer}>
              回答
            </button>
          </div>
          <div>前の回答: {answers[answers.length - 1]}</div>
          <div className="mt-10 bg-slate-100">
            <p className="font-bold mb-2">Previous Answers</p>
            <ul>
              {answers
                .map((value) => (
                  <li key={value} className="text-black">
                    {value}
                  </li>
                ))
                .reverse()}
            </ul>
          </div>
        </>
      )}
      {isGameOver && (
        <>
          <div>
            <p className="text-red">Game Over</p>
            <p>あなたの回答数: {answers.length}</p>
          </div>
          <button className="border-2" onClick={restartGame}>
            リスタート
          </button>
        </>
      )}
    </div>
  );
}
export default App;
