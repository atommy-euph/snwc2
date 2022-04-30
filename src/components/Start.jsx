import React from "react";

const Start = ({ handleGameStart }) => {
  return (
    <div>
      <div>
        <h2 className="text-lg font-bold mt-4 justify-center">ルール</h2>
        <ul>
          <li>「ん」で終わってはいけない</li>
          <li>２度同じ駅を入れてはいけない</li>
          <li>濁点、半濁点、小文字は同一視できる</li>
          <li>伸ばし棒は無視できる</li>
          <li>ひらがなと半角英字(大文字)と半角数字のみ使用可</li>
          <li>判定はWikipediaの駅名一覧に準じる</li>
        </ul>
      </div>
      <button className="mt-10 border-2" onClick={handleGameStart}>
        スタート[スペース]
      </button>
    </div>
  );
};

export default Start;
