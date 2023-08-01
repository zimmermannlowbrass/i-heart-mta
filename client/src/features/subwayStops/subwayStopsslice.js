import { selectSearchRoute } from '../searchRoute/searchRouteSlice.js'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


export const loadSubwayStops = createAsyncThunk(
  'subwayStops/loadSubwayStops',
  async () => {
      const data = await fetch("http://localhost:4000/subwaystops ")
      const json = await data.json()
      return json
  }
)

export const subwayStopSlice = createSlice({
  name: 'subwayStops',
  initialState: {
    subwaystops: [],
    isLoading: false,
    hasError: false
  },
  reducers: {
    filterSubwayStops: (state, action) => {
      state.subwaystops = state.subwaystops.filter(subwaystop => subwaystop.route === action.payload)
    }
  },
  extraReducers: {
    [loadSubwayStops.pending]: (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      },
    [loadSubwayStops.fulfilled]: (state, action) => {
      state.subwaystops = action.payload
      state.isLoading = false
      state.hasError = false
    },
    [loadSubwayStops.rejected]: (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      }
  }
})

export const {
  filterSubwayStops
} = subwayStopSlice.actions


export const selectAllSubwayStops = state => state.subwayStops.subwaystops

export const selectFilteredSubwayStops = (state) => {
    const allSubwayStops = selectAllSubwayStops(state)
    const searchRoute = selectSearchRoute(state)
    if (!searchRoute) return allSubwayStops
    return allSubwayStops.filter(subwaystop => subwaystop.route === searchRoute)
  }



export default subwayStopSlice.reducer