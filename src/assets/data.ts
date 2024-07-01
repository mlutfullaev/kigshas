import { ITableItem } from '@/assets/types.ts'

export const mockTable: ITableItem = {
  id: 0,
  time: 1718784435215,
  clearance: '398 В-12',
  tonPercent: 93,
  shas: 347,
  weight: 7,
  stickingPercent: 5
}
  
export const tableSizeOptions  = [
  { value: 10, label: 10 },
  { value: 25, label: 25 },
  { value: 50, label: 50 },
  { value: 100, label: 100 },
]