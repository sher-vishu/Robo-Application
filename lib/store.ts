import { configureStore } from "@reduxjs/toolkit";
import runDataSlice from "./features/roboRunDataSlice";

 const makeStore = () => {
  return configureStore({
    reducer: { 
      runData: runDataSlice,
     },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default makeStore