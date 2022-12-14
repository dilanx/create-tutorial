import { CellData, Status } from './types';
import words from './words.json';

export const ROWS = 6;
export const LETTERS = 5;

export function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export function isWord(row: CellData[]) {
  const word = row.map(({ letter }) => letter).join('');
  return words.includes(word);
}

export function checkWord(word: string, row: CellData[]) {
  const letters = word.split('');
  return row.map(({ letter }, i) => {
    let status: Status;
    if (letter === letters[i]) {
      status = 'correct';
    } else if (letters.includes(letter)) {
      status = 'partial';
    } else {
      status = 'incorrect';
    }

    return {
      letter,
      status,
    };
  });
}
