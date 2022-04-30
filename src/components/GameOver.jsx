import React from "react";

const GameOver = ({ answers, restartGame }) => {
  return (
    <div className="caret-transparent">
      <p className="mt-4 text-red-500">Game Over</p>
      <p>回答数: {answers.length - 1}</p>
      <button className="mt-4 border-2" onClick={restartGame}>
        リスタート [Space]
      </button>
    </div>
  );
};

export default GameOver;
