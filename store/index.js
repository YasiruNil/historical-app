import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "./placeSlice";

export const store = configureStore({
  reducer: {
    places: placesReducer,
  },
});