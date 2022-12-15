import { useEffect, useState } from 'react';
import { getRandomWord, update } from '../common';
import type { CellData } from '../types';
import Row from './Row';

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

  return (
    <div className="board">
      <Row data={rows[0]} />
      <Row data={rows[1]} />
      <Row data={rows[2]} />
      <Row data={rows[3]} />
      <Row data={rows[4]} />
      <Row data={rows[5]} />
    </div>
  );
}
