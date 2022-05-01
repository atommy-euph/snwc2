import Overlay from "./Overlay";

const Help = ({ onClose }) => {
  return (
    <Overlay title="Help" onClose={onClose}>
      <h2 className="text-lg font-bold">ルール</h2>
      <ul>
        <li>「ん」で終わってはいけない</li>
        <li>２度同じ駅を入れてはいけない</li>
        <li>濁点、半濁点、小文字は同一視できる</li>
        <li>最後の伸ばし棒は無視できる</li>
        <li>ひらがなと半角英字(大文字)と半角数字のみ使用可</li>
        <li>判定はWikipediaの駅名一覧に準じる</li>
      </ul>
    </Overlay>
  );
};

export default Help;
