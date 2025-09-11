import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchFamilyTreeBfs } from "../../helper/searchFamilyTreeBFS";

export interface Person {
  name: string;
  gender: "male" | "female";
  year: string; // năm sinh
  couple: Person[];
  children: Person[];
}

export interface FamilyTreeState {
  root: Person;
  searchResults: Person[];
}

const initialState: FamilyTreeState = {
  root: {
    name: "A",
    gender: "male",
    year: "1970",
    couple: [
      {
        name: "B",
        gender: "female",
        year: "1972",
        couple: [],
        children: [],
      },
    ],
    children: [
      {
        name: "B",
        gender: "female",
        year: "1995",
        couple: [
          {
            name: "B1",
            gender: "male",
            year: "1994",
            couple: [],
            children: [],
          },
        ],
        children: [
          {
            name: "D",
            gender: "male",
            year: "2015",
            couple: [
              {
                name: "D1",
                gender: "female",
                year: "2016",
                couple: [],
                children: [],
              },
            ],
            children: [],
          },
          {
            name: "E",
            gender: "female",
            year: "2017",
            couple: [],
            children: [],
          },
          {
            name: "M",
            gender: "male",
            year: "2019",
            couple: [],
            children: [],
          },
        ],
      },
      {
        name: "C",
        gender: "female",
        year: "1998",
        couple: [
          {
            name: "C1",
            gender: "male",
            year: "1997",
            couple: [],
            children: [],
          },
        ],
        children: [
          {
            name: "F",
            gender: "female",
            year: "2020",
            couple: [],
            children: [],
          },
        ],
      },
    ],
  },
  searchResults: [],
};

export const familyTreeSlice = createSlice({
  name: "tree",
  initialState, // dùng luôn initialState đã khai báo
  reducers: {
    searchMember: (state, action: PayloadAction<string>) => {
      const targetName = action.payload.trim();
      if (!targetName) {
        state.searchResults = [];
        return;
      }
      const result = searchFamilyTreeBfs(initialState, targetName);
      state.searchResults = result;
    },
    clearSearch: (state) => {
      state.searchResults = [];
    },
  },
});

export const { searchMember, clearSearch } = familyTreeSlice.actions;

export default familyTreeSlice.reducer;
