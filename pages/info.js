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
        <li>v2.0.0 - 追加モードの準備</li>
        <li>v2.1.0 - スピードモードを追加</li>
        <li>v2.1.1 - スピードモードを微易化</li>
        <li>v2.1.2 - 駅名データの更新 (2023/12/28)</li>
        <li>v2.2.0 - 個人ランキング機能の追加</li>
        <li>v2.2.1 - ランキングに出発駅と終着駅を記録</li>
        <li>
          v2.2.2 - スピードのモードのバグ(文字数の範囲にInfinityが出る)を修正
        </li>
        <li>v2.2.3 - スピードモードの難易度を調整</li>
      </ul>
      <h2>機能追加予定</h2>
      <ul>
        <li>ログイン機能</li>
        <li>総合ランキング表示機能</li>
        <li>ハードモード</li>
      </ul>
      <h2>プライバシーポリシー</h2>
      <p>当サイトでは、以下の方法でユーザーのデータを扱います。</p>

      <h3>Google Analytics の使用について</h3>
      <ul>
        <li>
          当サイトでは、サイトの利用状況を分析するために Google Analytics
          を使用しています。
        </li>
        <li>
          Google Analytics は、訪問者のサイト利用に関する情報を収集するために
          Cookie を使用します。
        </li>
        <li>
          収集されるデータは匿名であり、個人を特定するものではありません。
        </li>
        <li>Googleのプライバシーポリシーに従って情報が処理されます。</li>
      </ul>

      <h3>Local Storage の使用について</h3>
      <ul>
        <li>
          当サイトのゲームでは、プレイヤーのゲームプレイ記録を保存するためにブラウザの
          Local Storage を使用しています。
        </li>
        <li>
          Local Storage
          に保存される情報は、プレイヤーのゲーム進行状況や設定などで、外部サーバーには送信されません。
        </li>
        <li>
          プレイヤーはブラウザの設定を通じて Local Storage
          の使用を制御できますが、その場合ゲームの一部機能が正常に動作しない可能性があります。
        </li>
      </ul>
      {/* <h2>クレジット</h2> */}
    </Page>
  );
}
