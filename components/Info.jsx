import Overlay from "./Overlay";
import logo from "../icons/logo_type.svg";
import bmcButton from "../icons/bmc-button.png";
import atommy from "../icons/atommy.svg";
import railword from "../icons/railword.png";

const Info = ({ onClose }) => {
  return (
    <Overlay title="About this game" onClose={onClose}>
      <h1 className="flex flex-row font-bold items-center">
        <img className="w-14 inline mr-1" src={logo} alt="尻鉄" />
        <span className="inline-block pt-3">について</span>
      </h1>

      <h2>作者</h2>
      <div className="flex flex-row items-center mb-4">
        <img className="w-44 inline mr-2" src={atommy} alt="Atommy" />
      </div>
      <ul>
        <li>
          Website: <a href="https://atommy.me">atommy.me</a>
        </li>
        <li>
          Mail: <a href="mailto:info@atommy.me">info@atommy.me</a>
        </li>
        <li>
          Twitter: <a href="https://twitter.com/atommy_euph">@atommy_euph</a>
        </li>
      </ul>
      <h2>RAILWORDのゲーム</h2>
      <ul>
        <li>
          <a href="https://railword.com">
            <img
              className="w-6 inline mr-2 mb-1"
              src={railword}
              alt="テツドル"
            />
            テツドル - 駅名版Wordle
          </a>
        </li>
      </ul>
      <h2>寄付</h2>
      <p>
        「Buy me a coffee」というサービスを利用しています。
        作品を気に入っていただけましたら、ぜひコーヒーをおごってください！
      </p>
      <a href="https://buymeacoffee.com/atommy">
        <img className="w-44" src={bmcButton} alt="Buy me a coffee" />
      </a>
      <h2>推奨ブラウザ</h2>
      <ul>
        <li>Google Chorme</li>
        <li>Safari</li>
        <li>Microsoft Edge</li>
        <li>Firefox</li>
      </ul>
      <h2>バージョン情報</h2>
      {/* 互換性のないAPIの変更.機能性を追加.バグ修正 */}
      <ul>
        <li>v1.0.0 - リリース</li>
        <li>v1.1.0 - お手つきルールの追加</li>
      </ul>
      <h2>機能追加予定</h2>
      <ul>
        <li>ログイン機能</li>
        <li>ランキング表示機能</li>
        <li>ハードモード</li>
      </ul>
      {/* <h2>プライバシーポリシー</h2> */}
      {/* <h2>クレジット</h2> */}
    </Overlay>
  );
};

export default Info;
