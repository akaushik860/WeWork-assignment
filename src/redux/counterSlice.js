import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    jobList: [],
    totalCount: 0
  },
  reducers: {
    increment: (state) => {
      // state.totalCount = await res.totalCount
      // state.value = ["wdsd","Dsdsd","Dsdsd"]
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.jobList = [...state.jobList, ...action.payload.jobs];
      state.totalCount = action.payload.totalCount
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer