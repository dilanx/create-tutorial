import { useEffect, useState } from 'react';
import { checkWord, getRandomWord, isWord, ROWS } from '../common';
import { CellData } from '../types';
import Row from './Row';

function update(key: string, word: string, rows: CellData[][]) {
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
    if (rows.length < ROWS) {
      return [...old, row, []];
    }
  }

  return [...old, row];
}

export default function Board() {
  const [word] = useState<string>(getRandomWord());
  const [rows, setRows] = useState<CellData[][]>([[]]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      setRows((prev) => update(e.key, word, prev));
    };

    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const rowComponents: JSX.Element[] = [];

  for (let i = 0; i < ROWS; i++) {
    rowComponents.push(<Row key={`row-${i}`} data={rows[i]} />);
  }

  return <div className="board">{rowComponents}</div>;
}
