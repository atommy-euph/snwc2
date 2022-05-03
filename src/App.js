import { useEffect, useState, useRef, useCallback } from "react";

import Alert from "./components/Alert";
import Button from "./components/Button.jsx";
import Overlay from "./components/Overlay";
import Help from "./components/Help";
import Info from "./components/Info";

import logo from "./icons/logo_type.svg";
import frame from "./icons/frame.svg";
import share from "./icons/share.svg";
import copied from "./icons/copied.svg";
import help from "./icons/help.svg";
import info from "./icons/info.svg";
import titleLogo from "./icons/logo.svg";

import {
  isValidLetters,
  isIncludedInStations,
  isAnswered,
  endsWithValidLetter,
  startsWithValidLetter,
  getSameGroup,
  getFirstStation,
  getLastLetter,
  getCandidates,
  randomSelect,
} from "./lib/functions";

import { ALERT_TIME, TIME_LIMIT, COUNTDOWN_TIME } from "./constant/config.js";
import { STATION_DATA } from "./constant/station_data.js";

function App() {
  // For controling screens
  const [isGameStandby, setIsGameStandby] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Game data
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState(() => [
    { answer: getFirstStation(), time: 0 },
  ]);

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
      setAnswers(answers.concat({ answer: answer, time: TIME_LIMIT - timer }));
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
    if (count === COUNTDOWN_TIME) setIsGameStandby(true);
    if (count === 1) {
      setIsGameStandby(false);
      setIsGameStart(true);
    }
  }, [count]);
  const handleGameOver = () => {
    setTimer(0);
    setCount(COUNTDOWN_TIME);
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
  const candidatesForLastAnswer = randomSelect(
    getCandidates(answers.slice(-1)[0].answer, answers),
    4
  );

  const shareResult = () => {
    const text = [
      "#尻鉄 | 駅名しりとり",
      "",
      `出発駅: ${answers[0].answer}`,
      `到着駅: ${answers.slice(-1)[0].answer}`,
      `記録　: ${answers.length - 1}駅 `,
      `タイム: ${totalTime}秒`,
      "",
      `${URL}`,
    ];
    navigator.clipboard.writeText(text.join("\n"));
    setIsCopied(true);
  };

  return (
    <div className="flex flex-col items-center h-screen caret-transparent px-6 overflow-y-scroll">
      {/* Alerts */}
      <div className="flex justify-center">
        <Alert
          message="駅名に使われない文字が含まれています"
          isOpen={isInvalidLetterAlertOpen}
        />
        <Alert message="その駅は存在しません" isOpen={isNoExistenceAlertOpen} />
        <Alert
          message={`「${getSameGroup(
            getLastLetter(answers[answers.length - 1].answer)
          )}」から始まる駅名を入力してください`}
          isOpen={isNoMatchAlertOpen}
        />
        <Alert message="駅名を入力してください" isOpen={isEmptyAlertOpen} />
      </div>

      {/* Before the game starts */}
      {!(isGameStart || isGameOver || isGameStandby) && (
        <>
          {/* Overlay */}
          {isHelpOpen && (
            <Help
              onClose={() => {
                setIsHelpOpen(false);
              }}
            />
          )}
          {isInfoOpen && (
            <Info
              onClose={() => {
                setIsInfoOpen(false);
              }}
            />
          )}
          <div className="flex flex-col items-center py-12">
            <p className="mt-28 text-[1.62rem]">しりとりで知る鉄道駅</p>
            <img className="w-64 mb-8" src={titleLogo} alt="しりてつ" />
            <Button
              value="スタート"
              keybind="Space"
              onClick={handleGameStart}
            />
            <div className="mt-12 w-64 flex flex-row justify-center space-x-4">
              <button
                onClick={() => {
                  setIsHelpOpen(true);
                }}
              >
                <img className="w-8" src={help} alt="help" />
              </button>
              <button
                onClick={() => {
                  setIsInfoOpen(true);
                }}
              >
                <img className="w-8" src={info} alt="info" />
              </button>
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
              {answers.length - 1}
            </div>
            <div className="flex justify-center items-center font-bold text-lg tracking-[-3px] pr-[3px]  top-56 left-[62px] w-8 h-8 rounded-full border-4 border-black absolute">
              {answers.length}
            </div>
            <div className="flex justify-center items-center font-bold text-lg tracking-[-3px] pr-[3px] top-80 left-[33px] w-8 h-8 rounded-full border-4 border-black opacity-50 absolute"></div>
            <p className="top-32 left-[88px] font-bold text-xl absolute">
              {answers[answers.length - 1].answer}
            </p>
          </div>
          <img
            className="absolute top-4 left-0 w-16 opacity-50"
            src={logo}
            alt="timer"
          />
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
          <div className="relative top-[35rem]">
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
            <Overlay title="通過駅一覧" onClose={() => setIsListOpen(false)}>
              <div className="mt-8 h-[21rem] border-y-2 py-2 overflow-y-scroll hidden-scrollbar">
                {answers
                  .map((value) => value.answer)
                  .map((value, i) => (
                    <div
                      key={i}
                      className="flex flex-row font-bold my-0.5 px-1"
                    >
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
                      <a
                        className="italic text-sm"
                        href={STATION_DATA[value][0].url}
                      >
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
          )}
          <Alert
            message="クリップボードにコピーしました"
            isOpen={isShareAlertOpen}
          />
          <div className="flex flex-col items-center w-full">
            <h2 className="text-4xl mt-16 mb-12">ゲームオーバー</h2>
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
              通過駅一覧
            </button>
            <Button value="リスタート" keybind="Space" onClick={restartGame} />
            <Button value="トップへ戻る" keybind="Escape" onClick={resetGame} />
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
              <img
                className="inline w-3 pb-1 ml-2"
                src={isCopied ? copied : share}
                alt=""
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export default App;
