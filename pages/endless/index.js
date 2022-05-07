import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";

import Alert from "../../components/Alert";
import Button from "../../components/Button.jsx";
// import Help from "../../components/Help";
// import Info from "../../components/Info";
import AnsweredList from "../../components/AnsweredList";

import logo from "../../public/icons/logo_type.svg";
import frame from "../../public/icons/frame.svg";
import share from "../../public/icons/share.svg";
import copied from "../../public/icons/copied.svg";
import help from "../../public/icons/help.svg";
import info from "../../public/icons/info.svg";
import titleLogo from "../../public/icons/logo.svg";

import {
  isValidLetters,
  isIncludedInStations,
  isAnswered,
  endsWithValidLetter,
  startsWithValidLetter,
  getSameGroup,
  getFirstStation,
  getLastLetter,
} from "../../lib/functions";

import {
  ALERT_TIME,
  TIME_LIMIT,
  COUNTDOWN_TIME,
  GAME_URL,
  MISTAKE_COUNT_LIMIT,
} from "../../constant/config.js";

export default function Endless() {
  // For controling screens
  const [isGameStandby, setIsGameStandby] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Game data
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState(() => [
    { answer: getFirstStation(), time: 0 },
  ]);
  const [mistakeCount, setMistakeCount] = useState(0);

  // Count down in Standby
  const [count, setCount] = useState(COUNTDOWN_TIME);

  // For game screen
  const [isEmptyAlertOpen, setIsEmptyAlertOpen] = useState(false);
  const [isInvalidLetterAlertOpen, setIsInvalidLetterAlertOpen] =
    useState(false);
  const [isNoExistenceAlertOpen, setIsNoExistenceAlertOpen] = useState(false);
  const [isNoMatchAlertOpen, setIsNoMatchAlertOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [timer, setTimer] = useState(TIME_LIMIT);

  // For result screen
  const [isListOpen, setIsListOpen] = useState(false);
  const [isShareAlertOpen, setIsShareAlertOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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
      setMistakeCount(mistakeCount + 1);
      setIsNoExistenceAlertOpen(true);
      setTimeout(() => {
        setIsNoExistenceAlertOpen(false);
      }, ALERT_TIME);
      return;
    }
    if (!startsWithValidLetter(answer, answers)) {
      setAnswer("");
      setMistakeCount(mistakeCount + 1);
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
      setAnswers(answers.concat({ answer: answer, time: TIME_LIMIT - timer }));
      handleGameOver();
      return;
    }

    setAnswers(answers.concat({ answer: answer, time: TIME_LIMIT - timer }));
    setAnswer("");
    setMistakeCount(0);
    setTimer(TIME_LIMIT);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAnswer();
    }
  };
  const handleGameStart = useCallback(() => {
    setIsCopied(false);
    setMistakeCount(0);

    if (count === COUNTDOWN_TIME) setIsGameStandby(true);
    if (count === 1) {
      setIsGameStandby(false);
      setIsGameStart(true);
    }
  }, [count]);
  const handleGameOver = () => {
    setIsGameOver(true);
    setTimer(0);
    setCount(COUNTDOWN_TIME);
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
    setCount(COUNTDOWN_TIME);
  }, []);

  // Count down in Standby
  useEffect(() => {
    if (!isGameStandby) return;
    const interval = setInterval(() => {
      if (count > 1) {
        setCount((c) => c - 1);
      } else {
        handleGameStart();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count, isGameStandby, handleGameStart]);

  // Time limit for Answer
  useEffect(() => {
    if (!isGameStart) return;
    const interval = setInterval(() => {
      if (timer > 1) {
        setTimer((c) => c - 1);
      } else {
        handleGameOver();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, isGameStart]);

  // Judge game over
  useEffect(() => {
    if (mistakeCount === MISTAKE_COUNT_LIMIT) {
      handleGameOver();
      return;
    }
  });

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

  // Control browser back
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", (e) => {
      if (isListOpen) {
        setIsListOpen(false);
        return;
      }
      if (isHelpOpen) {
        setIsHelpOpen(false);
        return;
      }
      if (isInfoOpen) {
        setIsInfoOpen(false);
        return;
      }
    });
  });

  // For result screen
  const totalTime = answers
    .map((value) => value.time)
    .reduce((sum, element) => {
      return sum + element;
    }, 0);

  const shareResult = () => {
    const text = [
      "#尻鉄 | 駅名しりとり",
      "",
      `出発駅: ${answers[0].answer}`,
      `到着駅: ${answers.slice(-1)[0].answer}`,
      `記録　: ${answers.length - 1}駅 `,
      `タイム: ${totalTime}秒`,
      "",
      `${GAME_URL}`,
    ];
    navigator.clipboard.writeText(text.join("\n"));
    setIsCopied(true);
  };

  return (
    <div className="flex flex-col items-center h-screen caret-transparent px-6 overflow-y-scroll">
      {/* Alerts */}
      <div className="flex justify-center">
        {isInvalidLetterAlertOpen && (
          <Alert message="無効な文字が含まれています" />
        )}
        {isNoExistenceAlertOpen && (
          <Alert message="その駅は存在しません (お手つき+1)" />
        )}
        {isNoMatchAlertOpen && (
          <Alert
            message={`「${getSameGroup(
              getLastLetter(answers[answers.length - 1].answer)
            )}」から始まる駅名を入力してください (お手つき+1)`}
          />
        )}

        {isEmptyAlertOpen && <Alert message="駅名を入力してください" />}
      </div>

      {/* Before the game starts */}
      {!(isGameStart || isGameOver || isGameStandby) && (
        <>
          {/* Overlay */}
          {isHelpOpen && (
            <div></div>
            // <Help
            //   onClose={() => {
            //     setIsHelpOpen(false);
            //   }}
            // />
          )}
          {isInfoOpen && (
            <div></div>
            // <Info
            //   onClose={() => {
            //     setIsInfoOpen(false);
            //   }}
            // />
          )}
          <div className="flex flex-col items-center py-12">
            <p className="mt-28 text-[1.62rem]">しりとりで知る鉄道駅</p>
            <Image width={260} height={260} src={titleLogo} alt="しりてつ" />
            <div className="h-8"></div>
            <Button
              value="スタート"
              keybind="Space"
              onClick={handleGameStart}
            />
            <div className="mt-12 w-64 flex flex-row justify-center space-x-4">
              {/* <button
                onClick={() => {
                  setIsHelpOpen(true);
                }}
              >
                <Image width={30} height={30} src={help} alt="help" />
              </button>
              <button
                onClick={() => {
                  setIsInfoOpen(true);
                }}
              >
                <Image width={30} height={30} src={info} alt="info" />
              </button> */}
            </div>
          </div>
        </>
      )}

      {/* Standby mode */}
      {!isGameStart && isGameStandby && (
        <div>
          <p className="text-center mt-64 text-6xl">{count}</p>
          <p className="text-center mt-12 mb-0 text-md">出発駅</p>
          <p className="font-bold text-3xl">{answers[0].answer}</p>
        </div>
      )}

      {/* The game is ongoing */}
      {isGameStart && !isGameOver && (
        <div className="relative w-full max-w-xl h-full overflow-hidden pb-10">
          <div className="relative top-4 -left-4">
            <div className="top-12 -left-72 w-96 h-96 z-10 absolute border-4 border-black rounded-full"></div>
            <div className="top-20 -left-64 w-80 h-80 z-20 absolute border-4 border-black rounded-full"></div>
            <div className="flex justify-center items-center font-bold text-lg tracking-[-3px] pr-[3px] top-32 left-[33px] w-8 h-8 rounded-full border-4 border-black absolute">
              <p>{answers.length - 1}</p>
            </div>
            <div className="flex justify-center items-center font-bold text-lg tracking-[-3px] pr-[3px]  top-56 left-[62px] w-8 h-8 rounded-full border-4 border-black absolute">
              <p>{answers.length}</p>
            </div>
            <div className="flex justify-center items-center font-bold text-lg tracking-[-3px] pr-[3px] top-80 left-[33px] w-8 h-8 rounded-full border-4 border-black opacity-50 absolute"></div>
            <p className="top-32 left-[88px] font-bold text-xl absolute">
              {answers[answers.length - 1].answer}
            </p>
          </div>
          <div className="absolute top-4 left-0 w-16 opacity-50">
            <Image alt="Logo" src={logo} />
          </div>
          <p
            className={`absolute top-6 right-0 text-4xl ${
              timer < 4 ? "text-red-600" : ""
            }`}
          >
            {timer}
          </p>
          <div className="top-[228px] w-1/2 pl-24 absolute">
            <input
              className="caret-gray-300 absolute text-xl font-bold border-2 border-gray-300 h-14 w-full pl-2 rounded-l-lg rounded-r-none focus:outline-none"
              type="text"
              ref={inputEl}
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
              onKeyDown={handleEnter}
            />
            <button
              className="absolute -right-[9.6rem] w-20 pl-7 text-gray-400 text-xl font-bold border-2 px-2 border-gray-300 border-l-0 h-14 rounded-r-lg"
              onClick={handleAnswer}
            >
              {"\u{23CE}"}
            </button>
          </div>
          <p className="relative text-center text-sm top-[333px]">
            お手つき <br />
            <span className="text-2xl">{mistakeCount}</span>
            <span className="text-2xl mx-0.5">/ 3</span>
          </p>
          <div className="relative top-[32rem]">
            <Button
              keybind="Escape"
              value="ギブアップ"
              onClick={handleGameOver}
            />
          </div>
        </div>
      )}

      {/* Game is over */}
      {isGameOver && (
        <>
          {isListOpen && (
            <AnsweredList
              answers={answers}
              onClose={() => setIsListOpen(false)}
            />
          )}
          {isShareAlertOpen && (
            <Alert message="クリップボードにコピーしました" />
          )}
          <div className="flex flex-col items-center w-full">
            <h2 className="text-4xl mt-16 mb-12">ゲームオーバー</h2>
            <div className="relative w-72 h-80 pl-6 py-6 z-0">
              <div className="absolute top-0 left-0 mx-auto w-72 z-0">
                <Image src={frame} alt="frame" />
              </div>
              <span className="text-xl">記録</span>
              <p className="text-center">
                <span className="text-6xl pl-1">{answers.length - 1}</span>
                <span className="text-xl"> 駅 </span>
              </p>
              <span className="text-xl">タイム</span>
              <p className="text-center">
                <span className="text-6xl pl-1">{totalTime}</span>
                <span className="text-xl"> 秒 </span>
              </p>
            </div>
            <button
              className="mb-8 underline"
              onClick={() => {
                setIsListOpen(true);
              }}
            >
              停車駅一覧
            </button>
            <Button value="リスタート" keybind="Space" onClick={restartGame} />
            <Button value="トップへ戻る" keybind="Escape" onClick={resetGame} />
            <button
              className="flex items-center justify-between w-[6.2rem] mt-8 mb-6 border-2 border-black py-2 px-3 font-bold"
              onClick={() => {
                shareResult();
                setIsShareAlertOpen(true);
                setTimeout(() => {
                  setIsShareAlertOpen(false);
                }, ALERT_TIME);
              }}
            >
              SHARE
              <Image
                height={15}
                width={15}
                src={isCopied ? copied : share}
                alt="SHARE"
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
