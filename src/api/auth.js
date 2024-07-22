import { supabase } from "./connect.js";
import { addAvatar } from "../utils/avatars.js";

const signup = async (email, password, username) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });
    await addAvatar(supabase, email);

    if (error) {
      console.error(error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const signin = async (email, password) => {
  try {
    const { data, err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (err) {
      console.error(err);
      throw err;
    }
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { signup, signin };
