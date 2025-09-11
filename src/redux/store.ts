import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import libraryReducer from "./library/librarySlice";
import familyTreeReducer from "./familyTree/familyTreeSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    library: libraryReducer,
    familyTree: familyTreeReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
