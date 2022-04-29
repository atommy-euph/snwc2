import { useState } from "react";
import "./App.css";
import { STATIONS } from "./constant/station";

function App() {
  const [isGameStart, setIsGameStart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState(["ヨドヤバシ"]);

  const handleAnswer = () => {
    setAnswers(answers.concat(answer));
    setAnswer("");
    console.log(answers);
  };

  const lastAnswer = answers[answers.length - 1];

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
            <p className="text-6xl">{lastAnswer.slice(-1)}</p>
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
          <div>前の回答: {lastAnswer}</div>
          <div className="mt-10 bg-slate-100">
            <p className="font-bold mb-2">Previous Answers</p>
            <ul>
              {answers.map((value) => (
                <li key={value} className="text-black">
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
export default App;
