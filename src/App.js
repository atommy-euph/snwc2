import { useState } from "react";
import "./App.css";
import {
  isIncludedInStations,
  isAnswered,
  endsWithValidLetter,
  startsWithValidLetter,
  getSameGroup,
  getFirstStation,
} from "./lib/functions";

function App() {
  const [isGameStart, setIsGameStart] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([getFirstStation()]);

  const handleAnswer = () => {
    if (!answer) {
      setAnswer("");
      alert("駅名を入力してください");
      return;
    }
    if (!isIncludedInStations(answer)) {
      setAnswer("");
      alert("その駅は存在しません");
      return;
    }
    if (!startsWithValidLetter(answer, answers)) {
      setAnswer("");
      alert(
        `「${getSameGroup(
          answers[answers.length - 1].slice(-1)
        )}」から始まる駅名を入力してください`
      );
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
    console.log(answers);
  };

  const restartGame = () => {
    setAnswers([getFirstStation()]);
    setAnswer("");
    setIsGameStart(true);
    setIsGameOver(false);
  };

  return (
    <div className="App">
      {/* display if the game doesn't start */}
      {!(isGameStart || isGameOver) && (
        <>
          <button
            className={`border-2 ${isGameStart ? "hidden" : ""}`}
            onClick={() => {
              setIsGameStart(true);
            }}
          >
            スタート
          </button>
        </>
      )}
      {/* display if the game starts */}
      {isGameStart && (
        <>
          <div className="mt-10">
            <p className="text-6xl">{answers[answers.length - 1].slice(-1)}</p>
            <p>から始まる駅名を入力</p>
          </div>
          <div className="mt-10">
            <input
              className="border-2"
              type="text"
              value={answer}
              onChange={(e) => {
                setAnswer(e.target.value);
              }}
            />
            <button className="border-2 ml-2" onClick={handleAnswer}>
              回答
            </button>
          </div>
          <div>前の回答: {answers[answers.length - 1]}</div>
          <div className="mt-10 bg-slate-100">
            <p className="font-bold mb-2">Previous Answer</p>
            {answers[answers.length - 1]}
            {/* <ul>
              {answers.map((value) => (
                <li key={value} className="text-black">
                  {value}
                </li>
              ))}
            </ul> */}
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
