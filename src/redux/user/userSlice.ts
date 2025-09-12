import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

export interface UserState {
  currentUser: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser") || "null"),
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  loading: false,
  error: null,
};

// Thunk: login
export const login = createAsyncThunk(
  "user/login",
  async (
    { username, password }: { username: string; password: string },
    thunkAPI
  ) => {
    try {
      // Gửi request login đến /auth/login
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Đăng nhập không thành công");
      }

      const loginData = await res.json();
      console.log("Login data:", loginData);

      // Gọi API /auth/me để lấy thông tin chi tiết user
      const userRes = await fetch("https://dummyjson.com/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginData.accessToken}`, // Pass JWT via Authorization header
        },
      });

      if (!userRes.ok) {
        throw new Error("Không lấy được thông tin user");
      }

      const userData = await userRes.json();
      console.log("User data:", userData);

      return {
        ...userData,
        accessToken: loginData.accessToken,
        refreshToken: loginData.refreshToken,
      };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.loading = false;
      state.error = null;

      // Xóa khỏi localStorage
      localStorage.removeItem("currentUser");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.currentUser = {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          gender: action.payload.gender,
          image: action.payload.image,
        };
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;

        // Lưu vào localStorage
        localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
        localStorage.setItem("accessToken", state.accessToken!);
        localStorage.setItem("refreshToken", state.refreshToken!);

        toast.success("Đăng nhập thành công!");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
// Action creators are generated for each case reducer function
export const { logout } = userSlice.actions;

export default userSlice.reducer;
