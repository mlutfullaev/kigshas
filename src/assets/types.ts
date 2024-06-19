export interface TableItem {
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