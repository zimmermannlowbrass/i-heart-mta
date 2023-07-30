import { createSlice } from '@reduxjs/toolkit';

const favs = ['1', '2', 'C']
const options = {
  name: "favoriteRoutes",
  initialState: [],
  reducers: {
    loadFavs: (state, action) => {
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


export const selectFavoriteRoutes = (state) => state.favoriteRoutes;
const favoriteRoutesSlice = createSlice(options);
export default favoriteRoutesSlice.reducer