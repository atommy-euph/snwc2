import { STATIONS } from "../constant/stations";
import { GROUPS } from "../constant/groups";
import { MINIMUM_INITIAL_NUMBER_OF_CANDIDATES } from "../constant/config";

export const getFirstStation = () => {
  let stations = [];
  let firstStation;
  for (let key in STATIONS) {
    stations = stations.concat(STATIONS[key]);
  }
  while (true) {
    firstStation = stations[Math.floor(Math.random() * stations.length)];

    if (
      getCandidates(firstStation, [firstStation]).length >=
      MINIMUM_INITIAL_NUMBER_OF_CANDIDATES
    ) {
      break;
    }
  }
  return firstStation;
};

export const isValidLetters = (answer) => {
  const validLetters = GROUPS.flat();
  for (let i = 0; i < answer.length; i++) {
    if (!validLetters.includes(answer.slice(i, i + 1))) {
      return false;
    }
  }
  return true;
};

export const isIncludedInStations = (answer) => {
  return STATIONS[answer.length].includes(answer);
};

export const startsWithValidLetter = (answer, answers) => {
  return isSameGroup(
    getLastLetter(answers[answers.length - 1].answer),
    answer.slice(0, 1)
  );
};

export const isAnswered = (answer, answers) => {
  return answers.map((value) => value.answer).includes(answer);
};

export const getCandidates = (answer, answers) => {
  const candidates = [];
  for (let key in STATIONS) {
    STATIONS[key].forEach((value) => {
      if (
        isSameGroup(getLastLetter(answer), value.slice(0, 1)) &&
        !answers.includes(value)
      ) {
        candidates.push(value);
      }
    });
  }
  return candidates;
};

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

export const endsWithValidLetter = (answer, answers) => {
  const candidates = getCandidates(answer, answers);
  return candidates.length !== 0 ? true : false;
};

export const getLastLetter = (answer) => {
  return answer.slice(-1) === "ー" ? answer.slice(-2, -1) : answer.slice(-1);
};

export const getSameGroup = (a) => {
  for (let i = 0; i < GROUPS.length; i++) {
    if (GROUPS[i].includes(a)) {
      return GROUPS[i];
    }
  }
  return false;
};

const isSameGroup = (a, b) => {
  for (let i = 0; i < GROUPS.length; i++) {
    if (GROUPS[i].includes(a) && GROUPS[i].includes(b)) {
      return true;
    }
  }
  return false;
};
