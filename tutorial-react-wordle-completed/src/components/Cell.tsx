import type { Status } from '../types';

interface CellProps {
  letter?: string;
  status?: Status;
}

export default function Cell({ letter, status }: CellProps) {
  let backgroundColor;

  switch (status) {
    case 'correct':
      backgroundColor = 'green';
      break;
    case 'partial':
      backgroundColor = 'orange';
      break;
    case 'incorrect':
      backgroundColor = 'gray';
      break;
  }

  return (
    <div className="cell" style={{ backgroundColor }}>
      {letter?.toUpperCase()}
    </div>
  );
}
