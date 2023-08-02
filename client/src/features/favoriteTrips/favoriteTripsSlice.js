import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const loadFavorites = createAsyncThunk(
  'favoriteTrips/loadFavorites',
  async () => {
      const data = await fetch("http://localhost:4000/trips")
      const json = await data.json()
      const favorites = json.filter(trip => trip.isFavorite)
      return favorites
  }
)

const favoriteInAPI = (id) => {
  fetch(`http://localhost:4000/trips/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isFavorite: true
    })
  })
}

const unFavoriteATripInAPI = (id) => {
  fetch(`http://localhost:4000/trips/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isFavorite: false
    })
  })
}

const options = {
  name: "favoriteTrips",
  initialState: {
    favoriteTrips: [],
    isLoading: false,
    hasError: false
  },
  reducers: {
    addTrip: (state, action) => {
      state.favoriteTrips.push(action.payload)
      favoriteInAPI(action.payload.id)
    },
    removeTrip: (state, action) => {
      state.favoriteTrips = state.favoriteTrips.filter(trip => trip.id !== action.payload.id)
      unFavoriteATripInAPI(action.payload.id)
    },
  },
  extraReducers: {
    [loadFavorites.pending]: (state, action) => {
        state.isLoading = true;
        state.hasError = false;
      },
    [loadFavorites.fulfilled]: (state, action) => {
      state.favoriteTrips = action.payload
      state.isLoading = false
      state.hasError = false
    },
    [loadFavorites.rejected]: (state, action) => {
        state.isLoading = false;
        state.hasError = true;
      }
  }
}


export const selectFavoriteTrips = (state) => state.favoriteTrips.favoriteTrips;
const favoriteTripsSlice = createSlice(options);
export const {
  addTrip,
  removeTrip
} = favoriteTripsSlice.actions
export default favoriteTripsSlice.reducer