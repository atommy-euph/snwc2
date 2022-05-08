import Image from "next/image";

import Page from "../components/Page";

import logo from "../public/icons/logo_type.svg";
import bmcButton from "../public/icons/bmc-button.png";
import atommy from "../public/icons/atommy.svg";
import railword from "../public/icons/railword.png";

export default function Info() {
  return (
    <Page title="About this game">
      <h1 className="flex flex-row font-bold items-center">
        <Image width={52} height={40} src={logo} alt="尻鉄" />
        <span className="inline-block pl-1 pt-3">について</span>
      </h1>

      <h2>作者</h2>
      <Image width={150} height={60} src={atommy} alt="Atommy" />
      <ul className="mt-2">
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
      <ul className="ml-0">
        <li className="flex items-center">
          <Image width={22} height={22} src={railword} alt="テツドル" />
          <a className="inline-block ml-1" href="https://railword.com">
            テツドル - 駅名版Wordle
          </a>
        </li>
      </ul>
      <h2>寄付</h2>
      <p>
        「Buy me a coffee」というサービスを利用しています。
        作品を気に入っていただけましたら、ぜひコーヒーをおごってください！
      </p>
      <a className="w-2 h-2" href="https://buymeacoffee.com/atommy">
        <Image width={182} height={51} src={bmcButton} alt="Buy me a coffee" />
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
    </Page>
  );
}
