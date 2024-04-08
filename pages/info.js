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
      <p>本ゲームは個人開発により運営しています。ゲームの維持と改善のため、寄付を募集しています。ご支援いただける場合は、以下のリンクからお願いいたします。</p>
      <p>皆さんの温かいご支援に心より感謝いたします。</p>
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
        <li>
          v3.0.0 - ログイン・総合ランキング機能を実装・駅名データの更新
          (2024/1/3)・バグの修正
        </li>
        <li>
          v3.0.1 - 総合ランキングを10位まで表示
        </li>
      </ul>
      <h2>駅名データの最終更新日</h2>
      <ul>
        <li>2024/04/06</li>
      </ul>
      <h2 id="privacy-policy">プライバシーポリシー</h2>
      <h3>データの主な利用目的</h3>
      <p>当サイトでは、収集したデータを以下の目的で利用します。</p>
      <ul>
        <li>本サイトのログイン認証のため</li>
        <li>本サイトの利用状況の把握</li>
        <li>本サイトにおけるランキング表示のため</li>
      </ul>

      <p>当サイトでは、ユーザーのデータを以下に記載するように扱います。</p>

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
        <li>
          <a href="https://support.google.com/analytics/answer/6004245?hl=ja#zippy=%2Cgoogle-%E3%81%AE%E3%83%97%E3%83%A9%E3%82%A4%E3%83%90%E3%82%B7%E3%83%BC-%E3%83%9D%E3%83%AA%E3%82%B7%E3%83%BC">
            Googleのプライバシーポリシー
          </a>
          に従って情報が処理されます。
        </li>
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
      <h3>ログイン機能について</h3>
      <ul>
        <li>
          本サイトでは、Google が提供する
          Webアプリケーションバックエンドサービス Firebase
          を用いてアカウントを管理しています。
        </li>
        <li>
          ご入力いただいた個人情報は、Firebase を通じて管理されます。詳しくは、
          <a href="https://firebase.google.com/support/privacy?hl=ja">
            Firebase のプライバシーとセキュリティ
          </a>
          をご覧ください
        </li>
        <li>
          本サイトにより収集された情報は、上記「データの主な利用目的」のためにのみ利用し、個人を特定する目的では使用しません。
        </li>
      </ul>
      {/* <h2>クレジット</h2> */}
    </Page >
  );
}
