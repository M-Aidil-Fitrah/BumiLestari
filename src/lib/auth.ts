import { supabase } from './supabase';

export const authService = {
  // Sign Up
  async signUp(data: {
    fullName: string;
    email: string;
    password: string;
    phone: string;
  }) {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          phone: data.phone,
        },
      },
    });

    if (authError) throw authError;

    // Profile otomatis dibuat oleh database trigger!
    // Tidak perlu insert manual lagi
    return authData;
  },

  // Sign In
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Sign Out
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get Current User
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },
   async updatePassword(newPassword: string) {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;
    return data;
  },

  // Get Profile
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data;
  },

  // Update Profile
  async updateProfile(userId: string, updates: {
    full_name?: string;
    phone?: string;
    avatar_url?: string;
  }) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};