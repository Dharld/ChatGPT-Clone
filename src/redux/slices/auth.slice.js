import { createSlice } from "@reduxjs/toolkit";
import { signup, signin } from "./auth.actions";

const STORAGE_URL = import.meta.env.VITE_SUPABASE_STORAGE;

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

console.log(user);

const storeInLocalStorage = (user, refreshToke, accessToken) => {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("refreshToken", refreshToke);
  localStorage.setItem("accessToken", accessToken);
};

const initialState = {
  user,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      const { refresh_token: refreshToken, access_token: accessToken } =
        action.payload.session;
      console.log(action.payload);
      const email = action.payload.user.email;
      const user = {
        email,
        id: action.payload.user.id,
        username: action.payload.user.user_metadata.username,
        profileSrc: `${STORAGE_URL}/avatars/${email}.png`,
      };
      storeInLocalStorage(user, refreshToken, accessToken);
      state.user = user;
      state.isLoading = false;
      state.error = null;
    });
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.isLoading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      }
    );
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
