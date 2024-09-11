import { createSlice } from "@reduxjs/toolkit";
import { placesList } from "../data/placesList";

const initialState = {
  places: placesList,
};

const placesSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    markAsVisited: (state, action) => {
      const place = state.places.find((place) => place.id === action.payload);
      if (place) place.visited = true;
    },
    unmarkAsVisited: (state, action) => {
      const place = state.places.find((place) => place.id === action.payload);
      if (place) place.visited = false;
    },
  },
});

export const { markAsVisited, unmarkAsVisited } = placesSlice.actions;
export default placesSlice.reducer;
