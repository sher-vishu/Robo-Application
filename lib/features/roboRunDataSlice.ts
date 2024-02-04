import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Robot } from '@/types/run.type'
import Papa from 'papaparse';

const getLocalAllPlayer = () => {
  try {
    // Check if localStorage is available
    if ('localStorage' in window && window.localStorage !== null) {
      const localAllPlayers = localStorage.getItem('localAllPlayers');
      return localAllPlayers ? JSON.parse(localAllPlayers) : [];
    } else {
      console.error('localStorage is not available');
      return [];
    }
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return [];
  }
};


export const initialState: {
  allData: Robot[],
  filteredData: Robot[],
  year: string,
  month: string,
  day: string,
  time: string,
  runID: number,
  minWeight: number,
  maxWeight: number,
  minTemp: number,
  maxTemp: number,
  minHumid: number,
  maxHumid: number,
  latitude: any[],
  longitude: any[],
} = {
  allData: [],
  filteredData: [],
  year: '',
  month: '',
  day: '',
  time: '',
  runID: 1,
  minWeight: 0,
  maxWeight: 100,
  minTemp: -10,
  maxTemp: 20,
  minHumid: 5,
  maxHumid: 95,
  latitude: [],
  longitude: [],
};

export const runDataSlice = createSlice({
  name: "runData",
  initialState,
  reducers: {
    setAllData: (state, action) => {
      console.log(action)
      state.allData = action.payload
      state.filteredData = action.payload
    },
    filteredDataFun: (state) => {
        const runData = state.allData.filter((run: any) => {
            if ((state.minTemp !== -10 || state.maxTemp !== 20)) {
              if (run.AverageTemperature < state.minTemp || run.AverageTemperature > state.maxTemp) {
                return false
              }
            }
            if ((state.minHumid !== 5 || state.maxHumid !== 95)) {
              if (run.AverageHumidity < state.minHumid || run.AverageHumidity > state.maxHumid) {
                return false
              }
            }
            if ((state.minWeight !== 0 || state.maxWeight !== 100)) {
              if (run.AverageWeight < state.minWeight || run.AverageWeight > state.maxWeight) {
                return false
              }
            }
            return true;
          });
        console.log('inside state data:', runData, state.maxWeight, state.minWeight);
        state.filteredData = runData;
    },
    setYear:(state, action) => {
      state.year = action.payload;
    },
    setMonth:(state, action) => {
      state.month = action.payload;
    },
    setDay:(state, action) => {
      state.day = action.payload;
    },
    setTime:(state, action) => {
      state.time = action.payload;
    },
    setMinTemp:(state, action) => {
      state.minTemp = action.payload;
    },
    setMaxTemp:(state, action) => {
      state.maxTemp = action.payload;
    },
    setMinHumid:(state, action) => {
      state.minHumid = action.payload;
    },
    setMaxHumid:(state, action) => {
      state.maxHumid = action.payload;
    },
    setMinWeight:(state, action) => {
      state.minWeight = action.payload;
    },
    setMaxWeight:(state, action) => {
      state.maxWeight = action.payload;
    },
    setFilteredData:(state, action) => {
      state.filteredData = action.payload;
      console.log(state.filteredData)
    },    
  },
});

export const convertUnixTimestampToDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); 
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const { 
setAllData,
setYear,
setMonth,
setDay,
setTime,
setMinTemp,
setMaxTemp,
setMinHumid,
setMaxHumid,
setMinWeight,
setMaxWeight,
filteredDataFun,
setFilteredData
} = runDataSlice.actions;

export default runDataSlice.reducer;