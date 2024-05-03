import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import counterSlice from '../redux/counterSlice'

export default configureStore({
  reducer: {
    counter: counterSlice,
  },
})