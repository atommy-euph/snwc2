import { STATIONS } from "../constant/station";
import { GROUPS } from "../constant/groups";

export const getFirstStation = () => {
  let stations = [];
  let firstStation;
  for (let key in STATIONS) {
    stations = stations.concat(STATIONS[key]);
  }
  while (true) {
    firstStation = stations[Math.floor(Math.random() * stations.length)];
    if (getCandidates(firstStation, [firstStation]).length > 0) {
      break;
    }
  }
  return firstStation;
};

export const isIncludedInStations = (answer) => {
  return STATIONS[answer.length].includes(answer);
};

export const startsWithValidLetter = (answer, answers) => {
  return isSameGroup(answers[answers.length - 1].slice(-1), answer.slice(0, 1));
};

export const isAnswered = (answer, answers) => {
  return answers.includes(answer);
};

export const getCandidates = (answer, answers) => {
  const candidates = [];
  const lastLetter = answer.slice(-1);
  for (let key in STATIONS) {
    STATIONS[key].forEach((value) => {
      if (lastLetter === value.slice(0, 1) && !answers.includes(value)) {
        candidates.push(value);
      }
    });
  }
  return candidates;
};

export const endsWithValidLetter = (answer, answers) => {
  const candidates = getCandidates(answer, answers);
  console.log(candidates);
  return candidates.length !== 0 ? true : false;
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
