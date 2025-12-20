import { sendLog } from "../utils/logger";
import { supabase } from "../supabaseClient";

export async function login(email, password) {
  sendLog("info", "User mencoba login");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    sendLog("error", `Login gagal: ${error.message}`);
    throw error;
  }

  sendLog("info", "Login berhasil");
  return data;
}
