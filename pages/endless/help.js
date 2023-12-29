import Page from "../../components/Page";

import {
  TIME_LIMIT_ENDLESS,
  MISTAKE_COUNT_LIMIT,
} from "../../constant/config_endless";

export default function Help() {
  return (
    <Page title="ヘルプ (エンドレス)">
      <h2 className="text-lg font-bold">遊び方</h2>
      <ol>
        <li>スタートを押します</li>
        <li>出発駅が表示されるので、駅名でしりとりをしてください</li>
        <li>入力を確定したあと、もう一度 Enter を押すと次に進めます</li>
        <li>
          「存在しない駅名」と「前の駅名の最後の文字で始まらない駅名」を入れるとお手つきとなります
        </li>
        <li>タイムリミットは 1駅ごとに{TIME_LIMIT_ENDLESS}秒です</li>
        <li>あなたの駅名知識の限界に挑戦してください</li>
        <li>
          終了後、停車駅一覧から駅の情報 (Wikipedia) を見ることができます。
        </li>
      </ol>
      <h2 className="text-lg font-bold">ゲーム終了条件</h2>
      <ul>
        <li>次に回答可能な駅が無くなった場合</li>
        <li>２度同じ駅を入力した場合</li>
        <li>制限時間をオーバーした場合</li>
        <li>同ターンに{MISTAKE_COUNT_LIMIT}回お手つきをした場合</li>
      </ul>
      <h2 className="text-lg font-bold">ルール</h2>
      <ul>
        <li>
          濁点、半濁点、小文字は同じ文字として扱えます。(例:「あわじ」の次に「しんしろ」を回答可能)
        </li>
        <li>
          最後の文字が伸ばし棒「ー」の場合は、その一文字前から始まる駅名を回答してください。
        </li>
        <li>
          回答には、ひらがな (「ぅ」「を」を除く)、半角英字 (J, R, Y, R, P,
          G)、半角数字
          (0を除く)、伸ばし棒「ー」が使用できます。それ以外の文字を含む回答は無効です。
        </li>
        <li>
          アルファベットや数字など、表記と読み方が異なる場合は表記を優先します。(例:「JRアワジ」)
        </li>
        <li>
          駅名に含まれる中黒、括弧は除いて回答してください。(例:「栂・美木多」→「とがみきた」)
        </li>
        <li>
          回答に使用できる駅名及びその読み方は、
          <a href="https://ja.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E3%81%AE%E9%89%84%E9%81%93%E9%A7%85%E4%B8%80%E8%A6%A7">
            Wikipedia「日本の鉄道駅一覧」
          </a>
          に2023年10月4日の時点で掲載されているものに準じます。
        </li>
      </ul>
    </Page>
  );
}
