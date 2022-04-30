import React from "react";

const GameOver = ({ answers, restartGame, resetGame }) => {
  return (
    <div className="caret-transparent">
      <p className="mt-4 text-red-500">Game Over</p>
      <p>回答数: {answers.length - 1}</p>
      <button className="mt-4 border-2" onClick={restartGame}>
        リスタート [Space]
      </button>
      <button className="mt-4 border-2" onClick={resetGame}>
        トップへ戻る [Esc]
      </button>
    </div>
  );
};

export default GameOver;
