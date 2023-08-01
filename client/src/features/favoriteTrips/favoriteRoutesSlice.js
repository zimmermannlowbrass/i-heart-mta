import { createSlice } from '@reduxjs/toolkit';

const favs = ['1', '2', 'C']
const options = {
  name: "favoriteTrips",
  initialState: [],
  reducers: {
    loadFavs: () => {
        return favs 
    },
    addRoute: (state, action) => {
      state.push(action.payload)
    },
    removeRoute: (state, action) => {
      return state.filter(route => route.id !== action.payload.id)
    },
  },
}


export const selectFavoriteTrips = (state) => state.favoriteTrips;
const favoriteTripsSlice = createSlice(options);
export const {
  loadFavs
} = favoriteTripsSlice.actions
export default favoriteTripsSlice.reducer