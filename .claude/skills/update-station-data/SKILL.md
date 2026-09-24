---
name: update-station-data
description: 尻鉄（snwc2）の駅名データ constant/station_names_hiragana.js を新しいファイルに差し替え、info ページの最終更新日を更新して PR を出すまでの手順。ユーザーが新しい station_names_hiragana.js をアップロード・指定して「駅名データを更新」と言ったときに使う。
---

# 駅名データの更新

ユーザーから渡された新しい `station_names_hiragana.js` で `constant/station_names_hiragana.js` を置き換える。

## 運用ルール

- **駅名データの更新だけではバージョンを上げない。** `pages/info.js` の「バージョン情報」には何も足さない。
- ページに変えるのは「駅名データの最終更新日」の日付だけ。バージョン運用の説明はページに載せない（コード中のコメントのみ）。
- Netlify（プロジェクト `railwordchain` / https://shiritetsu.railword.com）は `master` を公開する。本番反映は `master` への PR をマージしたとき。

## 手順

1. **検証と差分確認**（置き換える前に）

   ```bash
   node .claude/skills/update-station-data/scripts/check_station_data.mjs <新しいファイル>
   ```

   - 次のどれかに当たると失敗する: ファイルが `export const STATION_DATA =` で始まっていない、キーに `constant/groups.js` の `GROUPS` にない文字がある、値が `{url, title}` の空でない配列になっていない。失敗したら置き換えずに、ユーザーに内容を伝える。
   - 駅数と、追加・削除・変更された駅を控えておく（PR 本文と報告に使う）。
   - 「変更」が多いときは数件を見比べて、表記の違い（括弧の全角化、URL のエンコード、並び順）なのか中身の違いなのかを確かめる。

2. **置き換え**

   ```bash
   cp <新しいファイル> constant/station_names_hiragana.js
   ```

3. **`pages/info.js` の更新**
   - 「駅名データの最終更新日」の `<li>` を新しい日付（`YYYY/MM/DD`）にする。データの作成日をユーザーが言っていればその日付を使う。わからなければ今日の日付を入れ、そのことを報告する。
   - 「※ 今回の更新で…」のように前回の更新だけに当てはまる注記が残っていたら、そのままにせずユーザーに消すか確認する。新しい注記はユーザーから頼まれたときだけ足す。

4. **ビルド確認**

   ```bash
   npm ci   # node_modules がなければ
   npx next build
   ```

   「Compiled successfully」が出れば良い。その後のページデータ収集で Firebase の `auth/invalid-api-key` が出るのは、環境変数がない環境では想定どおりなので失敗扱いにしない（そのぶん画面の表示は未確認だと報告する）。

5. **コミットと push**
   - メッセージは `update station names data (YYYYMMDD)`（これまでの形式に合わせる）。
   - 変更するのは `constant/station_names_hiragana.js` と `pages/info.js` だけ。

6. **PR**（ユーザーに頼まれたら）
   - base は `master`。タイトルは `駅名データの更新 (YYYY/MM/DD)`。
   - 本文に、駅数の増減、追加・削除した駅の例、変更件数とその中身（表記の違いかどうか）、最終更新日、ビルド確認の結果を書く。
   - マージ前に Netlify のプレビューで info ページとゲームを確認するよう伝える。
