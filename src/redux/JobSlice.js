import { createSlice } from '@reduxjs/toolkit'

export const JobSlice = createSlice({
  name: 'counter',
  initialState: {
    jobList: [],
    filterData: [],
    totalCount: 0
  },
  reducers: {
    updateList: (state,action) => {
      state.filterData = action.payload
    },
    addNewJob: (state, action) => {
      state.jobList = [...state.jobList, ...action.payload.jobs];
      state.filterData = [...state.filterData,...action.payload.jobs];
      state.totalCount = action.payload.totalCount
    },
  },
})

// Action creators are generated for each case reducer function
export const {addNewJob,updateList } = JobSlice.actions

export default JobSlice.reducer