import { STATIONS } from "../constant/station";

export const isIncludedInData = (answer) => {
  return STATIONS[answer.length].includes(answer);
};

export const isAnswered = (answer, answers) => {
  return answers.includes(answer);
};

export const endsWithValidInitialLetter = (answer) => {
  const initialLetters = Array([]);
  for (let key in STATIONS) {
    STATIONS[key].forEach((value) => {
      const initialLetter = value.slice(0, 1);
      if (!initialLetters.includes(initialLetter)) {
        initialLetters.push(initialLetter);
      }
    });
  }
  return initialLetters.includes(answer.slice(-1));
};
