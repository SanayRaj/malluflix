import { createClient } from "@supabase/supabase-js";

interface Database {
  public: {
    Tables: {
      movies: {
        Row: {
          id: number;
          title: string;
        }; // The data expected to be returned from a "select" statement
      };
    };
  };
}

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: false,
    },
  }
);
