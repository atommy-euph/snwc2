var data = require("./station_names_hiragana_test.js");
const stations = Object.keys(data);

const GROUPS = [
  ["あ", "ぁ"],
  ["い", "ぃ"],
  ["う", "ゔ"],
  ["え", "ぇ"],
  ["お", "ぉ"],
  ["か", "が"],
  ["き", "ぎ"],
  ["く", "ぐ"],
  ["け", "げ"],
  ["こ", "ご"],
  ["さ", "ざ"],
  ["し", "じ"],
  ["す", "ず"],
  ["せ", "ぜ"],
  ["そ", "ぞ"],
  ["た", "だ"],
  ["ち", "ぢ"],
  ["つ", "づ", "っ"],
  ["て", "で"],
  ["と", "ど"],
  ["な"],
  ["に"],
  ["ぬ"],
  ["ね"],
  ["の"],
  ["は", "ば", "ぱ"],
  ["ひ", "び", "ぴ"],
  ["ふ", "ぶ", "ぷ"],
  ["へ", "べ", "ぺ"],
  ["ほ", "ぼ", "ぽ"],
  ["ま"],
  ["み"],
  ["む"],
  ["め"],
  ["も"],
  ["や", "ゃ"],
  ["ゆ", "ゅ"],
  ["よ", "ょ"],
  ["ら"],
  ["り"],
  ["る"],
  ["れ"],
  ["ろ"],
  ["わ"],
  ["ん"],
  ["1"],
  ["2"],
  ["3"],
  ["4"],
  ["5"],
  ["6"],
  ["7"],
  ["8"],
  ["9"],
  ["G"],
  ["A"],
  ["J"],
  ["P"],
  ["R"],
  ["Y"],
  ["ー"],
];

const answers = ["とだ", "たまち", "ちば"];
const answer = "はままつ";

const getLastLetter = (answer) => {
  return answer.slice(-1) === "ー" ? answer.slice(-2, -1) : answer.slice(-1);
};

const isSameGroup = (a, b) => {
  for (let i = 0; i < GROUPS.length; i++) {
    if (GROUPS[i].includes(a) && GROUPS[i].includes(b)) {
      return true;
    }
  }
  return false;
};
const getCandidates = (answer, answers) => {
  const candidates = [];
  stations.forEach((value) => {
    if (
      isSameGroup(getLastLetter(answer), value.slice(0, 1)) &&
      !answers.map((answer) => answer.answer).includes(value)
    ) {
      candidates.push(value);
    }
  });
  return candidates;
};

function countStringLengths(strings) {
  const lengthCounts = {};

  // 各文字列の長さを数える
  strings.forEach((str) => {
    const length = str.length;
    lengthCounts[length] = (lengthCounts[length] || 0) + 1;
  });

  // 結果をコンソールに表示する
  for (const [length, count] of Object.entries(lengthCounts)) {
    console.log(`Length ${length}: ${count} stations`);
  }
}

const getRandomRange = (answer, answers, minimumThreshold) => {
  const candidates = getCandidates(answer, answers).filter(
    (c) => getLastLetter(c) !== "ん"
  );

  // 各文字列の長さを数える
  const counts = {};

  // 各文字列に対して、その長さのカウントを1増やす
  candidates.forEach((c) => {
    const length = c.length;
    counts[length] = (counts[length] || 0) + 1;
  });
  // 最小値と最大値を見つける
  const lengths = Object.keys(counts).map(Number);
  const min = Math.min(...lengths);
  const max = Math.max(...lengths);

  // 最小値と最大値の間で存在しない文字数に対して0をセットする
  for (let i = min; i <= max; i++) {
    if (!counts[i]) {
      counts[i] = 0;
    }
  }
  console.log(counts);
  center = Math.floor(Math.random() * (max - min + 1)) + min;
  let i = 0;
  let isReachedLeftEnd = 0; // if >0, reached
  let isReachedRightEnd = 0; // if >0, reached
  let nextCandidatesCount = counts[center];
  let lowerLimit = center;
  let upperLimit = center;
  let index = center;
  console.log("center", center);
  while (nextCandidatesCount < minimumThreshold) {
    index += (-1) ** i * (i + 1);
    console.log("index", index);

    if (counts[index]) nextCandidatesCount += counts[index];

    if (i % 2 === 0) {
      if (upperLimit > max) upperLimit = max;
      else upperLimit++;
    } else {
      if (lowerLimit < min) lowerLimit = min;
      else lowerLimit--;
    }
    i++;

    console.log(nextCandidatesCount);
    if (index < min && isReachedLeftEnd !== 1) {
      isReachedLeftEnd = 1;
      console.log("reached leftEnd");
      continue;
    } else if (max < index && !isReachedRightEnd !== 1) {
      isReachedRightEnd = 1;
      console.log("reached RightEnd");
      continue;
    }
    if (0 < isReachedLeftEnd && 0 < isReachedRightEnd) {
      console.log("reached both ends");
      break;
    }
  }

  return [lowerLimit, upperLimit];
};

rr = getRandomRange(answer, answers, 1000);
console.log(rr);
