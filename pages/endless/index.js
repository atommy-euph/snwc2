import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Alert from "../../components/Alert";
import Button from "../../components/Button.jsx";
import AnsweredList from "../../components/AnsweredList";
import Ranking from "../../components/Ranking";

import logo from "../../public/icons/logo_type.svg";
import frame from "../../public/icons/frame.svg";
import help from "../../public/icons/help.svg";
import share from "../../public/icons/share.svg";
import copied from "../../public/icons/copied.svg";
import records from "../../public/icons/records.svg";

import {
  isValidLetters,
  isIncludedInStations,
  isAnswered,
  endsWithValidLetter,
  startsWithValidLetter,
  getSameGroup,
  getFirstStation,
  getLastLetter,
} from "../../lib/functions.js";

import { ALERT_TIME, COUNTDOWN_TIME, GAME_URL } from "../../constant/config.js";

import {
  MISTAKE_COUNT_LIMIT,
  TIME_LIMIT_ENDLESS,
  LOCAL_STORAGE_KEY_ENDLESS,
} from "../../constant/config_endless.js";

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
  const [timer, setTimer] = useState(TIME_LIMIT_ENDLESS);

  // For result screen
  const [isListOpen, setIsListOpen] = useState(false);
  const [isRankingOpen, setIsRankingOpen] = useState(false);
  const [isShareAlertOpen, setIsShareAlertOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Focus input tag
  const inputEl = useRef(null);

  // Router
  const router = useRouter();

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
      setAnswers(
        answers.concat({ answer: answer, time: TIME_LIMIT_ENDLESS - timer })
      );
      handleGameOver();
      return;
    }

    setAnswers(
      answers.concat({ answer: answer, time: TIME_LIMIT_ENDLESS - timer })
    );
    setAnswer("");
    setMistakeCount(0);
    setTimer(TIME_LIMIT_ENDLESS);
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
    saveRecordToLocalStorage();
  };
  const restartGame = useCallback(() => {
    setAnswers([{ answer: getFirstStation(), time: 0 }]);
    setAnswer("");
    setIsGameStart(false);
    setIsGameOver(false);
    setTimer(TIME_LIMIT_ENDLESS);
    handleGameStart();
  }, [handleGameStart]);
  const resetGame = useCallback(() => {
    setAnswers([{ answer: getFirstStation(), time: 0 }]);
    setAnswer("");
    setIsGameStart(false);
    setIsGameOver(false);
    setTimer(TIME_LIMIT_ENDLESS);
    setCount(COUNTDOWN_TIME);
  }, []);
  const backToTop = () => {
    router.push("/");
  };

  const saveRecordToLocalStorage = () => {
    const record = {
      date: new Date(),
      count: answers.length - 1,
      time: totalTime,
    };
    const records = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_ENDLESS));
    if (records) {
      localStorage.setItem(
        LOCAL_STORAGE_KEY_ENDLESS,
        JSON.stringify(records.concat(record))
      );
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY_ENDLESS, JSON.stringify([record]));
    }
  };

  // Count down in Standby
  useEffect(() => {
    if (!isGameStandby) return;
    const countID = setInterval(() => {
      if (count > 1) {
        setCount((c) => c - 1);
      } else {
        handleGameStart();
      }
    }, 1000);
    return () => clearInterval(countID);
  }, [count, isGameStandby, handleGameStart]);

  // Time limit for Answer
  useEffect(() => {
    if (!isGameStart || isGameOver) return;
    const timerID = setInterval(() => {
      if (timer > 1) {
        setTimer((c) => c - 1);
      } else {
        clearInterval(timerID);
        handleGameOver();
      }
    }, 1000);
    return () => clearInterval(timerID);
  }, [timer, isGameStart, isGameOver]);

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

  // For result screen
  const totalTime = answers
    .map((value) => value.time)
    .reduce((sum, element) => {
      return sum + element;
    }, 0);

  const shareResult = () => {
    if (typeof navigator !== "undefined") {
      const text = [
        "#尻鉄 | エンドレス",
        "",
        `出発駅: ${answers[0].answer}`,
        `到着駅: ${answers.slice(-1)[0].answer}`,
        `記録　: ${answers.length - 1}駅`,
        `タイム: ${totalTime}秒`,
        "",
        `${GAME_URL}`,
      ];
      navigator.clipboard.writeText(text.join("\n"));
      setIsCopied(true);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen caret-transparent px-6 overflow-y-scroll">
      <Head>
        <title>エンドレス | 尻鉄</title>
      </Head>
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
        <div className="flex flex-col justify-center items-center h-screen">
          <h2 className="border-y-2 border-black py-3 mb-10 w-64 text-center text-3xl">
            エンドレス
          </h2>
          <Button value="スタート" keybind="Space" onClick={handleGameStart} />
          <div className="h-12"></div>
          <Link href="/endless/help">
            <a>
              <Image width={30} height={30} src={help} alt="help" />
            </a>
          </Link>
        </div>
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
          <p className="relative w-[4rem] text-center mx-auto top-[0.75rem]">
            <span className="text-sm">お手つき</span>
            <br />
            <span className="text-2xl flex flex-row justify-around items-center">
              {mistakeCount}
              <span className="text-sm">/</span>
              {MISTAKE_COUNT_LIMIT}
            </span>
          </p>
          <div className="relative top-[25rem]">
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
          {isRankingOpen && (
            <Ranking mode={"endless"} onClose={() => setIsRankingOpen(false)} />
          )}
          {isShareAlertOpen && (
            <Alert message="クリップボードにコピーしました" />
          )}
          <div className="flex flex-col items-center w-full pb-16">
            <h2 className="text-4xl mt-10">ゲームオーバー</h2>
            <h2 className="border-y-2 border-black py-2 my-6 w-64 text-center text-2xl">
              エンドレス
            </h2>
            <div className="relative w-64 h-64 z-0 py-8 px-6 mb-10">
              <div className="absolute top-0 left-0 mx-auto w- h-72 z-0">
                <Image width={256} height={256} src={frame} alt="frame" />
              </div>
              <span className="text-md">記録</span>
              <p className="text-center">
                <span className="text-5xl pl-1">{answers.length - 1}</span>
                <span className="text-xl">駅 </span>
              </p>
              <span className="text-md">タイム</span>
              <p className="text-center">
                <span className="text-5xl pl-1">{totalTime}</span>
                <span className="text-xl">秒 </span>
              </p>
            </div>
            <div className="flex items-center justify-center w-full space-x-2">
              <button
                className="flex items-center justify-between w-[9rem] mt- mb-6 border-2 border-black py-2 px-3 font-bold"
                onClick={() => {
                  shareResult();
                  setIsShareAlertOpen(true);
                  setTimeout(() => {
                    setIsShareAlertOpen(false);
                  }, ALERT_TIME);
                }}
              >
                結果をシェア
                <Image
                  height={15}
                  width={15}
                  src={isCopied ? copied : share}
                  alt="SHARE"
                />
              </button>
              <button
                className="flex items-center justify-between w-[8.2rem] mt- mb-6 border-2 border-black py-2 px-3 font-bold"
                onClick={() => {
                  setIsRankingOpen(true);
                }}
              >
                ランキング
                <Image height={17} width={17} src={records} alt="RECORD" />
              </button>
            </div>
            <button
              className="mb-5 underline"
              onClick={() => {
                setIsListOpen(true);
              }}
            >
              停車駅一覧
            </button>
            <Button value="リスタート" keybind="Space" onClick={restartGame} />
            <Button value="トップへ戻る" keybind="Escape" onClick={backToTop} />
          </div>
        </>
      )}
    </div>
  );
}
