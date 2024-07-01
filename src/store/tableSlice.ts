import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { tableSizeOptions } from '@/assets/data.ts'

interface TableState {
  size: number
}

const initialState: TableState = {
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