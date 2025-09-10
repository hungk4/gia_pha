import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  albums: [] as string[],
};



export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {},
});

