import { useEffect, useState, useRef, useCallback } from "react";

import Start from "./components/Start";
import Standby from "./components/Standby";
import GameOver from "./components/GameOver";
import Alert from "./components/Alert";

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

function App() {
  const [isGameStandby, setIsGameStandby] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState(() => [
    { answer: getFirstStation(), time: 0 },
  ]);

  const [isEmptyAlertOpen, setIsEmptyAlertOpen] = useState(false);
  const [isInvalidLetterAlertOpen, setIsInvalidLetterAlertOpen] =
    useState(false);
  const [isNoExistenceAlertOpen, setIsNoExistenceAlertOpen] = useState(false);
  const [isNoMatchAlertOpen, setIsNoMatchAlertOpen] = useState(false);

  const [timer, setTimer] = useState(TIME_LIMIT);

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

    setAnswers(answers.concat({ answer: answer, time: TIME_LIMIT - timer }));
    setAnswer("");
    setTimer(TIME_LIMIT);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAnswer();
    }
  };
  const handleGameStart = useCallback(() => {
    setIsGameStandby(true);
    setTimeout(() => {
      setIsGameStandby(false);
      setIsGameStart(true);
    }, 3000);
  }, []);
  const handleGameOver = () => {
    setTimer(0);
    setIsGameOver(true);
  };
  const restartGame = useCallback(() => {
    setAnswers([{ answer: getFirstStation(), time: 0 }]);
    setAnswer("");
    setIsGameStart(false);
    setIsGameOver(false);
    setTimer(TIME_LIMIT);
    handleGameStart();
  }, [handleGameStart]);
  const resetGame = useCallback(() => {
    setAnswers([{ answer: getFirstStation(), time: 0 }]);
    setAnswer("");
    setIsGameStart(false);
    setIsGameOver(false);
    setTimer(TIME_LIMIT);
  }, []);

  // Timer
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

  // Auto focus
  useEffect(() => {
    if (inputEl.current) {
      inputEl.current.focus();
    }
  });

  // Key bind
  useEffect(() => {
    document.addEventListener(
      "keydown",
      (e) => {
        if (e.key === " ") {
          if (!isGameStart && !isGameOver) {
            handleGameStart();
          } else if (isGameStart && isGameOver) {
            restartGame();
          }
        } else if (e.key === "Escape") {
          resetGame();
        }
      },
      false
    );
  }, [isGameOver, isGameStart, handleGameStart, restartGame, resetGame]);

  return (
    <div className="flex flex-col items-center h-screen caret-transparent px-6 overflow-hidden">
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
            getLastLetter(answers[answers.length - 1].answer)
          )}」から始まる駅名を入力してください`}
          type="WARNING"
          isOpen={isNoMatchAlertOpen}
        />
      </div>

      {/* Before the game starts */}
      {!(isGameStart || isGameOver || isGameStandby) && (
        <Start handleGameStart={handleGameStart} isGameStart={isGameStart} />
      )}

      {/* Standby mode */}
      {!isGameStart && isGameStandby && <Standby />}

      {/* The game is ongoing */}
      {isGameStart && !isGameOver && (
        <div className="relative w-[28rem] h-[18rem] overflow-hidden pb-10">
          {/* <p>残り: {timer} 秒</p> */}
          <div className="top-12 -left-72 w-96 h-96 z-10 absolute border-4 border-black rounded-full"></div>
          <div className="top-20 -left-64 w-80 h-80 z-20 absolute border-4 border-black rounded-full"></div>
          <div className="top-56 left-[62px] w-8 h-8 rounded-full border-4 border-black absolute"></div>
          <div className="top-32 left-[33px] w-8 h-8 rounded-full border-4 border-black absolute"></div>
          <p className="top-32 left-[88px] font-bold text-xl absolute">
            {answers[answers.length - 1].answer}
          </p>

          <div className="top-[214px] pl-32 absolute">
            <input
              className="absolute text-xl font-bold border-2 border-gray-300 h-14 w-44 pl-2 rounded-l-lg rounded-r-none focus:outline-none"
              type="text"
              ref={inputEl}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              onKeyDown={handleEnter}
            />
            <button
              className="absolute left-[304px] leading-3 border-2 px-2 border-gray-300 border-l-0 h-14 rounded-r-lg"
              onClick={handleAnswer}
            >
              Enter
            </button>
          </div>
        </div>
      )}

      {/* Game is over */}
      {isGameOver && (
        <GameOver
          answers={answers}
          restartGame={restartGame}
          resetGame={resetGame}
        />
      )}
    </div>
  );
}
export default App;
