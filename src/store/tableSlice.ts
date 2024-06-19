import { ITableItem } from '@/assets/types.ts'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { mockTable, tableSizeOptions } from '@/assets/data.ts'

interface TableState {
  table: ITableItem[],
  size: number
}

const initialState: TableState = {
  table: mockTable,
  size: tableSizeOptions[0].value
}

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    changeTableSize(state, action: PayloadAction<number>) {
      state.size = action.payload
    }
  }
})

export const { changeTableSize } = tableSlice.actions

export default tableSlice.reducer