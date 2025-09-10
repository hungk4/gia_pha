import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../services/axios";

interface Album {
  id: number;
  title: string;
  image: string;
}

export interface LibraryState {
  albums: Album[];
  loading: boolean;
  error: string | null;
}

const initialState: LibraryState = {
  albums: [],
  loading: false,
  error: null,
};

// Sử dụng axios instance để fetch dữ liệu
export const fetchAlbums = createAsyncThunk(
  "library/fetchAlbums",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/products");

      const albums = response.data.products.map((product: any) => ({
        id: product.id,
        title: product.title,
        image: product.images[0],
      }));

      return albums; // [{id:1, title:"..."}, {id:2, title:"..."}, ...]
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message); // error sẽ được truyền vào action.payload trong rejected case
    }
  }
);

export const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.loading = false;
        state.albums = action.payload;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { } = librarySlice.actions;

export default librarySlice.reducer;
