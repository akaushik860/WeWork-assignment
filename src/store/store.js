import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from '../features/counter/counterSlice'
import JobSlice from "../redux/JobSlice";

export default configureStore({
  reducer: {
    JobData: JobSlice,
  },
});
