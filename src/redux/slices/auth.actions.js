import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signup as signupWithSupabase,
  signin as signinWithSupabase,
} from "../../api/auth";

const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, username }) => {
    const user = await signupWithSupabase(email, password, username);
    return user;
  }
);

const signin = createAsyncThunk("auth/signin", async ({ email, password }) => {
  const user = await signinWithSupabase(email, password);
  return user;
});
export { signup, signin };
