import React from "react";

const GameOver = ({ answers, restartGame }) => {
  return (
    <>
      <div>
        <p className="text-red">Game Over</p>
        <p>あなたの回答数: {answers.length - 1}</p>
      </div>
      <button className="border-2" onClick={restartGame}>
        リスタート
      </button>
    </>
  );
};

export default GameOver;
