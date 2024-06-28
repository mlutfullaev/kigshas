export interface ITableItem {
  id: number
  time: number
  clearance: string
  shas?: number
  tonPercent?: number
  weight?: number
  stickingPercent?: number
}

export type SelectType = {
  value: number;
  label: string;
}

type ValuePiece = Date | null;

export type DatePickerValue = ValuePiece | [ValuePiece, ValuePiece];