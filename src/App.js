import { useEffect, useState, useRef } from "react";

import Notice from "./components/Alert";
import Start from "./components/Start";
import Standby from "./components/Standby";
import GameOver from "./components/GameOver";

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

import { ALERT_TIME, TIME_LIMIT } from "./constant/config.js";
import Alert from "./components/Alert";

function App() {
  const [isGameStandby, setIsGameStandby] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState(() => [getFirstStation()]);

  const [isEmptyAlertOpen, setIsEmptyAlertOpen] = useState(false);
  const [isInvalidLetterAlertOpen, setIsInvalidLetterAlertOpen] =
    useState(false);
  const [isNoExistenceAlertOpen, setIsNoExistenceAlertOpen] = useState(false);
  const [isNoMatchAlertOpen, setIsNoMatchAlertOpen] = useState(false);

  const [timer, setTimer] = useState(TIME_LIMIT);

  useEffect(() => {
    if (!isGameStart) return;
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((c) => c - 1);
      } else {
        handleGameOver();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, isGameStart]);

  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  });

  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === " ") {
          if (!isGameOver) {
            handleGameStart();
          } else if (isGameOver) {
            restartGame();
          }
        }
      },
      false
    );
  }, [isGameOver]);

  const inputEl = useRef(null);

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
    if (!startsWithValidLetter(answer, answers)) {
      setAnswer("");
      setIsNoMatchAlertOpen(true);
      setTimeout(() => {
        setIsNoMatchAlertOpen(false);
      }, ALERT_TIME);
      return;
    }
    if (isAnswered(answer, answers)) {
      handleGameOver();
      return;
    }
    if (!endsWithValidLetter(answer, answers)) {
      handleGameOver();
      return;
    }

    setAnswers(answers.concat(answer));
    setAnswer("");
    setTimer(TIME_LIMIT);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAnswer();
    }
  };
  const handleGameStart = () => {
    setIsGameStandby(true);
    setTimeout(() => {
      setIsGameStandby(false);
      setIsGameStart(true);
    }, 3000);
  };
  const handleGameOver = () => {
    setTimer(0);
    setIsGameOver(true);
  };
  const restartGame = () => {
    console.log("restarted the game");
    setAnswers([getFirstStation()]);
    setAnswer("");
    setIsGameStart(false);
    setIsGameOver(false);
    setTimer(TIME_LIMIT);
    handleGameStart();
  };

  return (
    <div className="flex flex-col items-center container h-screen py-4 caret-transparent">
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

      {/* Before the game starts */}
      {!(isGameStart || isGameOver || isGameStandby) && (
        <Start handleGameStart={handleGameStart} isGameStart={isGameStart} />
      )}

      {/* Standby mode */}
      {isGameStandby && <Standby />}

      {/* The game is ongoing */}
      {isGameStart && !isGameOver && (
        <>
          <div className="mt-10">
            <p className="text-6xl">
              {/* {`${getSameGroup(getLastLetter(answers[answers.length - 1]))}`} */}
              {getSameGroup(getLastLetter(answers[answers.length - 1]))}
            </p>
            <p>から始まる駅名を入力</p>
            <p>{timer}</p>
          </div>
          <Notice text={"asfsafd"} level={"INFO"} />
          <div className="mt-10">
            <input
              className="border-2"
              type="text"
              ref={inputEl}
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

      {/* Game is over */}
      {isGameOver && <GameOver answers={answers} restartGame={restartGame} />}
    </div>
  );
}
export default App;
