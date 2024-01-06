import { STATION_DATA } from "../constant/station_names_hiragana.js";
import { GROUPS } from "../constant/groups";
import { MINIMUM_INITIAL_NUMBER_OF_CANDIDATES } from "../constant/config.js";

const stations = Object.keys(STATION_DATA);

// Get First Station Name for shiritori
export const getFirstStation = () => {
  const candidatesOfFirstStation = stations.filter(
    (value) => getLastLetter(value) !== "ん"
  );
  const firstStation =
    candidatesOfFirstStation[
      Math.floor(Math.random() * candidatesOfFirstStation.length)
    ];
  return firstStation;
};

// Check if letters of answer are all included in data
export const isValidLetters = (answer) => {
  const validLetters = GROUPS.flat();
  for (let i = 0; i < answer.length; i++) {
    if (!validLetters.includes(answer.slice(i, i + 1))) {
      return false;
    }
  }
  return true;
};

// Check if existance of the station
export const isIncludedInStations = (answer) => {
  return stations.includes(answer);
};

// Check if the answer starts with letter which is the last letter of the previous answer
export const startsWithValidLetter = (answer, answers) => {
  return isSameGroup(
    getLastLetter(answers[answers.length - 1].answer),
    answer.slice(0, 1)
  );
};

// Check if the answer was already used
export const isAnswered = (answer, answers, min = 1, max = 31) => {
  return answers.map((value) => value.answer).includes(answer);
};

export const isInLengthRange = (answer, range) => {
  if (range[0] <= answer.length && answer.length <= range[1]) return true;
  else return false;
};

// get the list of possible candidates for next answer
export const getCandidates = (answer, answers) => {
  const stationsOfAnswers = answers.map((answer) => answer.answer);
  const candidates = stations
    .filter((value) => isSameGroup(getLastLetter(answer), value.slice(0, 1)))
    .filter((value) => !stationsOfAnswers.includes(value));
  return candidates;
};

// get [num] random values from [array]
export const randomSelect = (array, num) => {
  let newArray = [];
  let rand;
  while (newArray.length < num && array.length > 0) {
    rand = Math.floor(Math.random() * array.length);
    newArray.push(array[rand]);
    array.splice(rand, 1);
  }

  return newArray;
};

// Check if it is possible to continue the game
export const endsWithValidLetter = (answer, answers) => {
  const candidates = getCandidates(answer, answers);
  return candidates.length !== 0 ? true : false;
};

// get last letter of the answer
export const getLastLetter = (answer) => {
  return answer.slice(-1) === "ー" ? answer.slice(-2, -1) : answer.slice(-1);
};

export const getRandomRange = (answer, answers, alpha) => {
  const candidates = getCandidates(answer, answers).filter(
    (c) => getLastLetter(c) !== "ん"
  );

  if (candidates.length === 0) {
    candidates = getCandidates(answer, answers);
  }

  const minimumThreshold = Math.floor(candidates.length ** alpha);

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
  const center = Math.floor(Math.random() * (max - min + 1)) + min;
  let i = 0;
  let isReachedLeftEnd = 0; // if >0, reached
  let isReachedRightEnd = 0; // if >0, reached
  let nextCandidatesCount = counts[center];
  let lowerLimit = center;
  let upperLimit = center;
  let index = center;

  while (nextCandidatesCount < minimumThreshold) {
    index += (-1) ** i * (i + 1);

    if (counts[index]) nextCandidatesCount += counts[index];

    if (i % 2 === 0) {
      if (upperLimit >= max) upperLimit = max;
      else upperLimit++;
    } else {
      if (lowerLimit <= min) lowerLimit = min;
      else lowerLimit--;
    }
    i++;

    if (index < min && isReachedLeftEnd !== 1) {
      isReachedLeftEnd = 1;
      continue;
    }
    if (max < index && isReachedRightEnd !== 1) {
      isReachedRightEnd = 1;
      continue;
    }
    if (0 < isReachedLeftEnd && 0 < isReachedRightEnd) {
      break;
    }
  }

  return [lowerLimit, upperLimit];
};
// get list of same group including [a]
export const getSameGroup = (a) => {
  for (let i = 0; i < GROUPS.length; i++) {
    if (GROUPS[i].includes(a)) {
      return GROUPS[i];
    }
  }
  return false;
};

// Check if [a] and [b] are included in the same group
const isSameGroup = (a, b) => {
  for (let i = 0; i < GROUPS.length; i++) {
    if (GROUPS[i].includes(a) && GROUPS[i].includes(b)) {
      return true;
    }
  }
  return false;
};

export const getDateString = () => {
  const date = new Date();
  return date.toISOString().slice(0, 10).replaceAll("-", "/");
};
