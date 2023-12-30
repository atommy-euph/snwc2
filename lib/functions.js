import { STATION_DATA } from "../constant/station_names_hiragana.js";
import { GROUPS } from "../constant/groups";
import { MINIMUM_INITIAL_NUMBER_OF_CANDIDATES } from "../constant/config.js";
import { NUMBER_OF_NEXT_CANDIDATES } from "../constant/config_speed.js";

const stations = Object.keys(STATION_DATA);

// Get First Station Name for shiritori
export const getFirstStation = () => {
  let firstStation;
  while (true) {
    firstStation = stations[Math.floor(Math.random() * stations.length)];
    if (
      getCandidates(firstStation, [firstStation]).length >=
        MINIMUM_INITIAL_NUMBER_OF_CANDIDATES &&
      firstStation.length <= 10
    ) {
      break;
    }
  }
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

// get random range
export const getRandomRange = (min, max, answer, answers) => {
  let a = min + Math.floor(Math.random() * (max - min + 1));
  let b = min + Math.floor(Math.random() * (max - min + 1));
  if (a > b) [a, b] = [b, a];
  let possibleCandidates = getCandidates(answer, answers)
    .filter((value) => {
      return a <= value.length && value.length <= b;
    })
    .filter((value) => {
      return getLastLetter(value) !== "ん";
    });

  console.log("outofwhile", possibleCandidates);

  let i = 0;
  while (possibleCandidates.length < NUMBER_OF_NEXT_CANDIDATES) {
    a = min + Math.floor(Math.random() * (max - min + 1));
    b = min + Math.floor(Math.random() * (max - min + 1));
    if (a > b) [a, b] = [b, a];
    possibleCandidates = getCandidates(answer, answers)
      .filter((value) => {
        return a <= value.length && value.length <= b;
      })
      .filter((value) => {
        return getLastLetter(value) !== "ん";
      });
    i++;
    console.log(`${i} inside while`, possibleCandidates);
    if (i > 30) {
      const possibleCandidatesLengths = getCandidates(answer, answers)
        .filter((value) => {
          return getLastLetter(value) !== "ん";
        })
        .map((value) => value.length);
      const max = Math.max(...possibleCandidatesLengths);
      const min = Math.min(...possibleCandidatesLengths);
      return [min, max];
    }
  }
  return [a, b];
};

console.log("in functinon.js");

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
