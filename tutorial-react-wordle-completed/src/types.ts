export type Status = 'correct' | 'partial' | 'incorrect';

export interface CellData {
  letter: string;
  status?: Status;
}
