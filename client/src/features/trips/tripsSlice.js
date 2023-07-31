import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const deleteTripAPI = (id) => {
    fetch(`trips/${id}`, {
        method : 'DELETE'
    })
}

// thunk
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
    reducers : {
        deleteTrip: (state, action) => {
            state.trips = state.trips.filter(trip => trip.id !== action.payload)
            deleteTripAPI(action.payload)
        }
    },
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

export const {deleteTrip} = tripsSlice.actions

export default tripsSlice.reducer

