import type { CellData, Status } from './types';
import words from './words.json';

export function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

export function isWord(row: CellData[]) {
  const word = row.map(({ letter }) => letter).join('');
  return words.includes(word);
}

export function update(key: string, word: string, rows: CellData[][]) {
  const current = rows.length - 1;
  let old = rows.slice(0, current);
  let row = [...rows[current]];

  if (/^[a-z]$/.test(key)) {
    if (row.length === 5) return rows;
    row.push({ letter: key });
  }

  if (key === 'Backspace') {
    row.pop();
  }

  if (key === 'Enter') {
    if (row.length !== 5 || !isWord(row)) return rows;
    row = checkWord(word, rows[current]);
    if (rows.length < 6) {
      return [...old, row, []];
    }
  }

  return [...old, row];
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
