import { CellData } from '../types';

interface CellProps {
  cell: CellData;
}

export default function Cell({ cell }: CellProps) {
  let backgroundColor;

  switch (cell?.status) {
    case 'correct':
      backgroundColor = 'green';
      break;
    case 'partial':
      backgroundColor = 'gold';
      break;
    case 'incorrect':
      backgroundColor = 'gray';
      break;
  }

  return (
    <div className="cell" style={{ backgroundColor }}>
      {cell?.letter?.toUpperCase()}
    </div>
  );
}
