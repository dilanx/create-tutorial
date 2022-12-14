import { LETTERS } from '../common';
import { CellData } from '../types';
import Cell from './Cell';

interface RowProps {
  data: CellData[];
}

export default function Row({ data }: RowProps) {
  const cellComponents: JSX.Element[] = [];
  for (let i = 0; i < LETTERS; i++) {
    cellComponents.push(<Cell key={`cell-${i}`} cell={data?.[i]} />);
  }

  return <div className="row">{cellComponents}</div>;
}
