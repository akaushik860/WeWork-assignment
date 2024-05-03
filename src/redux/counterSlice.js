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
    updateList: (state,action) => {
      console.log("exp filter",action)
      state.jobList = action.payload
    },
    incrementByAmount: (state, action) => {
      state.jobList = [...state.jobList, ...action.payload.jobs];
      state.totalCount = action.payload.totalCount
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, incrementByAmount,updateList } = counterSlice.actions

export default counterSlice.reducer