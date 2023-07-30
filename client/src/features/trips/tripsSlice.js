import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// thunks
export const loadTrips = createAsyncThunk(
    'trips/loadTrips',
    async () => {
        const data = await fetch("trips")
        const json = await data.json()
        return json
    }
)

const options = {
    name: 'trips',
    initialState: {
        trips: [],
        isLoading: false,
        hasError: false
    },
    reducers : {},
    extraReducers: {
        [loadTrips.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
          },
        [loadTrips.fulfilled]: (state, action) => {
          state.trips = action.payload
          state.isLoading = false
          state.hasError = false
        },
        [loadTrips.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
          }
      }
}


// selectors
export const tripsSlice = createSlice(options)
export const selectTrips = state => state.trips.trips

export default tripsSlice.reducer

