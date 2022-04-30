import React from "react";

const Start = ({ handleGameStart, isGameStart }) => {
  return (
    <div>
      {/* <div>
        <h2>ルール</h2>
        <ul>
          <li>ルールを追加</li>
        </ul>
      </div> */}
      <button className="mt-10 border-2" onClick={handleGameStart}>
        スタート
      </button>
    </div>
  );
};

export default Start;
