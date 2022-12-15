import type { CellData } from '../types';
import Cell from './Cell';

interface RowProps {
  data?: CellData[];
}

export default function Row({ data }: RowProps) {
  return (
    <div className="row">
      <Cell {...data?.[0]} />
      <Cell {...data?.[1]} />
      <Cell {...data?.[2]} />
      <Cell {...data?.[3]} />
      <Cell {...data?.[4]} />
    </div>
  );
}
